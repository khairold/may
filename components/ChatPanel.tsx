'use client';

import { useChat } from '@ai-sdk/react';
import { useStore } from '@/store/useStore';
import { useEffect, useRef, useState } from 'react';
import { mockData } from '@/lib/mock-data';

export default function ChatPanel() {
  const store = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  // useChat defaults to /api/chat endpoint
  const { messages, sendMessage, status } = useChat();

  const isLoading = status === 'submitted' || status === 'streaming';

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => {
      sendMessage({ text: suggestion });
      setInput('');
    }, 100);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg border">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">Maya AI Assistant</h2>
        <p className="text-sm text-blue-100">Tanya apa sahaja tentang akaun MyUnifi anda</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <div className="text-6xl mb-4">🤖</div>
            <p className="text-lg font-semibold">Selamat datang ke Maya!</p>
            <p className="text-sm mt-2">Tanya saya tentang:</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="bg-gray-50 rounded-lg p-2">💳 Bil dan pembayaran</div>
              <div className="bg-gray-50 rounded-lg p-2">📊 Penggunaan data</div>
              <div className="bg-gray-50 rounded-lg p-2">📡 Tetapan WiFi</div>
              <div className="bg-gray-50 rounded-lg p-2">🎁 Promosi dan upgrade</div>
              <div className="bg-gray-50 rounded-lg p-2">💬 Sokongan teknikal</div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.parts.map((part, idx) => {
                if (part.type === 'text') {
                  return (
                    <div key={idx} className="whitespace-pre-wrap">{part.text}</div>
                  );
                }
                // Tool invocations are shown with a different part type
                return null;
              })}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50 rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanya Maya..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Hantar
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            'Kenapa bil tinggi?',
            'Berapa data tinggal?',
            'Ada promosi?',
            'Tukar password WiFi'
          ].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
