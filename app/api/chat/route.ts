import { anthropic } from '@ai-sdk/anthropic';
import { streamText, stepCountIs } from 'ai';
import { tools, buildSystemPrompt } from '@/lib/tools';
import { mockData } from '@/lib/mock-data';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: buildSystemPrompt({ user: mockData.user, billing: mockData.billing, usage: mockData.usage, services: mockData.services, currentScreen: 'home' }),
      messages,
      tools,
      stopWhen: stepCountIs(6),
      onStepFinish({ finishReason, toolCalls }) {
        console.log('Step finished:', finishReason, toolCalls);
      }
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Tool execution happens on client side
export async function executeToolCall(toolName: string, args: any) {
  console.log(`Executing tool: ${toolName}`, args);

  switch (toolName) {
    case 'get_billing':
      return mockData.billing;

    case 'get_usage':
      return mockData.usage;

    case 'get_services':
      return mockData.services;

    case 'navigate':
    case 'fill_field':
    case 'show_promotion':
      // These are handled by the client
      return { success: true };

    default:
      return { error: 'Unknown tool' };
  }
}
