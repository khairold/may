import { z } from 'zod';
import { tool } from 'ai';
import { mockData } from './mock-data';

export const tools = {
  navigate: tool({
    description: 'Navigate to a specific screen in the MyUnifi app',
    inputSchema: z.object({
      screen: z.enum(['home', 'billing', 'usage', 'wifi', 'plans', 'support'])
        .describe('The screen to navigate to')
    })
  }),

  get_billing: tool({
    description: 'Get current billing information including amount due and due date',
    inputSchema: z.object({})
  }),

  get_usage: tool({
    description: 'Get current data usage information including used data, limit, and days remaining',
    inputSchema: z.object({})
  }),

  get_services: tool({
    description: 'Get service plan details including plan name, speed, and price',
    inputSchema: z.object({})
  }),

  fill_field: tool({
    description: 'Fill a form field with a value',
    inputSchema: z.object({
      fieldId: z.string().describe('The ID of the field to fill'),
      value: z.string().describe('The value to fill in the field')
    })
  }),

  show_promotion: tool({
    description: 'Show a promotion modal to the user',
    inputSchema: z.object({
      promoId: z.string().describe('The ID of the promotion to show (upgrade or weekend)')
    })
  })
};

export function buildSystemPrompt(context: Record<string, any>): string {
  const lang = context.user?.language || 'ms';

  const prompts = {
    ms: `Anda adalah Maya, pembantu AI untuk MyUnifi. Anda membantu pengguna dengan pertanyaan tentang bil, penggunaan data, perkhidmatan, dan sokongan teknikal.

Konteks Pengguna Semasa:
- Nama: ${context.user?.name}
- Skrin: ${context.currentScreen}
- Bil: RM${context.billing?.amount} (tarikh akhir: ${context.billing?.dueDate})
- Penggunaan Data: ${context.usage?.used}GB daripada ${context.usage?.limit}GB (${context.usage?.daysLeft} hari lagi)
- Pelan: ${context.services?.plan} (${context.services?.speed}, RM${context.services?.price}/bulan)

Gunakan tools yang tersedia untuk:
- navigate: Pergi ke skrin lain (home, billing, usage, wifi, plans, support)
- get_billing: Dapatkan maklumat bil
- get_usage: Dapatkan maklumat penggunaan data
- get_services: Dapatkan maklumat pelan
- fill_field: Isi borang
- show_promotion: Tunjukkan promosi

Bersikap mesra, ringkas, dan membantu. Jawab dalam Bahasa Melayu.`,

    en: `You are Maya, the AI assistant for MyUnifi. You help users with questions about billing, data usage, services, and technical support.

Current User Context:
- Name: ${context.user?.name}
- Screen: ${context.currentScreen}
- Bill: RM${context.billing?.amount} (due: ${context.billing?.dueDate})
- Data Usage: ${context.usage?.used}GB of ${context.usage?.limit}GB (${context.usage?.daysLeft} days left)
- Plan: ${context.services?.plan} (${context.services?.speed}, RM${context.services?.price}/month)

Use available tools to:
- navigate: Go to different screens (home, billing, usage, wifi, plans, support)
- get_billing: Get billing information
- get_usage: Get data usage information
- get_services: Get plan details
- fill_field: Fill form fields
- show_promotion: Show promotions

Be friendly, concise, and helpful. Respond in English.`
  };

  return prompts[lang as keyof typeof prompts] || prompts.ms;
}
