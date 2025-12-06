# Maya AI Assistant Demo

A context-aware AI assistant for MyUnifi telco app, powered by Claude Sonnet 4.

## Features

- **Context-Aware**: Maya knows your current screen, billing status, data usage, and service plan
- **Multi-Tool**: Navigate screens, get data, fill forms, and show promotions
- **Bilingual**: Responds in Malay (default) or English
- **Real-time**: Streams responses and executes tools in real-time
- **Beautiful UI**: Mobile phone mockup with fully functional screens

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **AI SDK**: Vercel AI SDK + @ai-sdk/anthropic
- **Model**: Claude Sonnet 4 (claude-sonnet-4-20250514)
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript + Zod

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Add your Anthropic API key:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

Get your API key from [Anthropic Console](https://console.anthropic.com/).

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Scenarios

Try these example queries:

1. **Billing Question**: "Kenapa bil tinggi?"
   - Tools: `get_billing` → `navigate(billing)` → explain

2. **WiFi Settings**: "Tukar password wifi"
   - Tools: `navigate(wifi)`

3. **Data Usage**: "Berapa data tinggal?"
   - Tools: `get_usage` → respond

4. **Promotions**: "Ada promo?"
   - Tools: `show_promotion`

5. **Support**: "Report internet slow"
   - Tools: `navigate(support)` → `fill_field` × 2

6. **Plan Info**: "Apa pelan saya?"
   - Tools: `get_services` → respond

## Available Tools

Maya has access to 6 tools:

1. **navigate**: Navigate to different screens (home, billing, usage, wifi, plans, support)
2. **get_billing**: Get current billing information
3. **get_usage**: Get data usage statistics
4. **get_services**: Get service plan details
5. **fill_field**: Fill form fields (e.g., in support tickets)
6. **show_promotion**: Display promotion modals

## Project Structure

```
/app
  page.tsx              # Main layout with phone + chat
  layout.tsx            # Root layout
  globals.css           # Global styles
  /api/chat/route.ts    # Chat API endpoint

/components
  MockPhone.tsx         # Phone mockup with screens
  ChatPanel.tsx         # Chat interface with AI
  PromoModal.tsx        # Promotion modal popup

/store
  useStore.ts           # Zustand state management

/lib
  mock-data.ts          # Mock user/billing/usage data
  tools.ts              # Tool definitions + system prompt
```

## How It Works

1. **User sends message** → ChatPanel uses Vercel AI SDK's `useChat`
2. **Message sent to API** → `/api/chat/route.ts` with context
3. **Claude processes** → Uses `streamText` with tools
4. **Tools called** → Client executes tools via `onToolCall`
5. **State updated** → Zustand store updates phone UI
6. **Response streamed** → User sees real-time response

## Customization

### Add New Screen

1. Add screen type to `lib/mock-data.ts`:
```typescript
export type ScreenType = 'home' | 'billing' | ... | 'newscreen';
```

2. Add screen content to `components/MockPhone.tsx`:
```typescript
const screens = {
  // ...
  newscreen: <div>Your content</div>
};
```

3. Add nav button to navigation bar

### Add New Tool

1. Define tool in `lib/tools.ts`:
```typescript
export const tools = {
  // ...
  my_tool: tool({
    description: 'What this tool does',
    parameters: z.object({
      param: z.string()
    })
  })
};
```

2. Handle tool in `components/ChatPanel.tsx`:
```typescript
case 'my_tool':
  // Execute tool logic
  break;
```

### Change Language

Update `user.language` in `lib/mock-data.ts`:
```typescript
user: {
  language: 'en' // or 'ms'
}
```

## Build for Production

```bash
npm run build
npm start
```

## Deploy

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/maya-demo)

Don't forget to add `ANTHROPIC_API_KEY` to your Vercel environment variables!

## License

MIT

---

Built with ❤️ using Claude Sonnet 4
