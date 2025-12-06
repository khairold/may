'use client';

import MockPhone from '@/components/MockPhone';
import ChatPanel from '@/components/ChatPanel';
import PromoModal from '@/components/PromoModal';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Maya AI Assistant Demo
              </h1>
              <p className="text-sm text-gray-600">Context-aware AI assistant for MyUnifi</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                ● Live Demo
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mock Phone */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Mock MyUnifi App</h2>
              <p className="text-sm text-gray-600">
                The AI can navigate screens, get data, and fill forms
              </p>
            </div>
            <div className="flex-1 flex items-start justify-center">
              <MockPhone />
            </div>
          </div>

          {/* Chat Panel */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Chat with Maya</h2>
              <p className="text-sm text-gray-600">
                Ask questions in Malay or English - Maya will use tools to help you
              </p>
            </div>
            <div className="flex-1 h-[600px]">
              <ChatPanel />
            </div>
          </div>
        </div>

        {/* Demo Scenarios */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Try These Demo Scenarios:</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="font-semibold text-blue-800 mb-1">💳 Billing Question</div>
              <div className="text-sm text-blue-700 italic">"Kenapa bil tinggi?"</div>
              <div className="text-xs text-blue-600 mt-2">
                → get_billing → navigate(billing) → explain
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="font-semibold text-purple-800 mb-1">📡 WiFi Settings</div>
              <div className="text-sm text-purple-700 italic">"Tukar password wifi"</div>
              <div className="text-xs text-purple-600 mt-2">
                → navigate(wifi)
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="font-semibold text-green-800 mb-1">📊 Data Usage</div>
              <div className="text-sm text-green-700 italic">"Berapa data tinggal?"</div>
              <div className="text-xs text-green-600 mt-2">
                → get_usage → respond
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="font-semibold text-yellow-800 mb-1">🎁 Promotions</div>
              <div className="text-sm text-yellow-700 italic">"Ada promo?"</div>
              <div className="text-xs text-yellow-600 mt-2">
                → show_promotion
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="font-semibold text-red-800 mb-1">💬 Support</div>
              <div className="text-sm text-red-700 italic">"Report internet slow"</div>
              <div className="text-xs text-red-600 mt-2">
                → navigate(support) → fill_field × 2
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="font-semibold text-indigo-800 mb-1">📱 Plan Info</div>
              <div className="text-sm text-indigo-700 italic">"Apa pelan saya?"</div>
              <div className="text-xs text-indigo-600 mt-2">
                → get_services → respond
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-semibold text-blue-400">Framework</div>
              <div>Next.js 14 (App Router)</div>
            </div>
            <div>
              <div className="font-semibold text-purple-400">AI SDK</div>
              <div>Vercel AI SDK + Anthropic</div>
            </div>
            <div>
              <div className="font-semibold text-green-400">Model</div>
              <div>Claude Sonnet 4</div>
            </div>
            <div>
              <div className="font-semibold text-yellow-400">State</div>
              <div>Zustand + Tailwind CSS</div>
            </div>
          </div>
        </div>
      </main>

      {/* Promo Modal */}
      <PromoModal />
    </div>
  );
}
