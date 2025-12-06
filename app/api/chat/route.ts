import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { streamText, stepCountIs, convertToModelMessages } from 'ai';
import { tools, buildSystemPrompt } from '@/lib/tools';
import { mockData } from '@/lib/mock-data';

export const maxDuration = 30;

// Get the AI provider based on environment variable
// Defaults to 'anthropic' if not set
// Set AI_PROVIDER to 'google' or 'gemini' to use Google Generative AI
function getModel() {
  const provider = (process.env.AI_PROVIDER || 'anthropic').toLowerCase();
  
  if (provider === 'google' || provider === 'gemini') {
    // Use Gemini model - you can change the model ID here
    // Popular options: 'gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-1.5-pro', etc.
    return google(process.env.GOOGLE_MODEL || 'gemini-2.5-flash');
  } else {
    // Default to Anthropic
    return anthropic(process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514');
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: getModel(),
      system: buildSystemPrompt({ user: mockData.user, billing: mockData.billing, usage: mockData.usage, services: mockData.services, currentScreen: 'home' }),
      messages: convertToModelMessages(messages),
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
