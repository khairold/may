'use client';

import { useStore } from '@/store/useStore';
import { mockData } from '@/lib/mock-data';

export default function MockPhone() {
  const { currentScreen, setScreen, billing, usage, services, formFields } = useStore();

  const screens = {
    home: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Selamat datang, {mockData.user.name}!</h2>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-sm text-red-600">Bil Anda</div>
          <div className="text-2xl font-bold text-red-700">RM{billing.amount}</div>
          <div className="text-xs text-red-600">Tarikh akhir: {billing.dueDate}</div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-600">Penggunaan Data</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-blue-700">{usage.used}GB</span>
            <span className="text-sm text-blue-600">/ {usage.limit}GB</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${(usage.used / usage.limit) * 100}%` }}
            />
          </div>
          <div className="text-xs text-blue-600 mt-1">{usage.daysLeft} hari lagi</div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="text-sm text-purple-600">Pelan Anda</div>
          <div className="text-lg font-bold text-purple-700">{services.plan}</div>
          <div className="text-sm text-purple-600">{services.speed} - RM{services.price}/bulan</div>
        </div>
      </div>
    ),

    billing: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Bil & Pembayaran</h2>

        <div className="bg-white border rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Jumlah Bil</span>
            <span className="font-bold">RM{billing.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tarikh Akhir</span>
            <span className="font-bold">{billing.dueDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span className="text-red-600 font-bold">Belum Bayar</span>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
          Bayar Sekarang
        </button>
      </div>
    ),

    usage: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Penggunaan Data</h2>

        <div className="bg-white border rounded-lg p-4">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-blue-600">{usage.used}GB</div>
            <div className="text-gray-600">daripada {usage.limit}GB</div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all"
              style={{ width: `${(usage.used / usage.limit) * 100}%` }}
            />
          </div>

          <div className="mt-4 text-center text-gray-600">
            {usage.daysLeft} hari lagi sehingga reset
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-sm font-semibold text-yellow-800">💡 Tips Jimat Data</div>
          <ul className="text-sm text-yellow-700 mt-2 space-y-1">
            <li>• Gunakan WiFi bila boleh</li>
            <li>• Tutup auto-play video</li>
            <li>• Download offline untuk muzik</li>
          </ul>
        </div>
      </div>
    ),

    wifi: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Tetapan WiFi</h2>

        <div className="bg-white border rounded-lg p-4 space-y-3">
          <div>
            <label className="text-sm text-gray-600">Nama WiFi (SSID)</label>
            <div className="font-semibold">UniFi_Home_{mockData.user.name}</div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Kata Laluan</label>
            <div className="flex items-center gap-2">
              <input
                type="password"
                value="••••••••"
                readOnly
                className="flex-1 border rounded px-3 py-2"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Tukar
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Peranti Tersambung</label>
            <div className="font-semibold">7 peranti</div>
          </div>
        </div>
      </div>
    ),

    plans: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Pelan & Upgrade</h2>

        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-green-600 font-semibold">Pelan Semasa</div>
            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded">AKTIF</div>
          </div>
          <div className="text-xl font-bold">{services.plan}</div>
          <div className="text-gray-600">{services.speed}</div>
          <div className="text-lg font-bold mt-2">RM{services.price}/bulan</div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-600 font-semibold">Upgrade Tersedia</div>
          <div className="text-xl font-bold mt-1">Unifi 300Mbps</div>
          <div className="text-gray-600">300Mbps</div>
          <div className="text-lg font-bold mt-2">RM159/bulan</div>
          <button className="w-full bg-blue-600 text-white py-2 rounded mt-3">
            Upgrade Sekarang
          </button>
        </div>
      </div>
    ),

    support: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Sokongan</h2>

        <div className="bg-white border rounded-lg p-4 space-y-3">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Jenis Masalah</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={formFields.issueType || ''}
              onChange={(e) => useStore.getState().setField('issueType', e.target.value)}
            >
              <option value="">Pilih masalah</option>
              <option value="slow">Internet Perlahan</option>
              <option value="disconnect">Sambungan Terputus</option>
              <option value="billing">Masalah Bil</option>
              <option value="other">Lain-lain</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Keterangan</label>
            <textarea
              className="w-full border rounded px-3 py-2 h-24"
              placeholder="Terangkan masalah anda..."
              value={formFields.description || ''}
              onChange={(e) => useStore.getState().setField('description', e.target.value)}
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded font-semibold">
            Hantar Aduan
          </button>
        </div>

        <div className="bg-gray-50 border rounded-lg p-4">
          <div className="text-sm font-semibold mb-2">Hubungi Kami</div>
          <div className="text-sm space-y-1">
            <div>📞 Hotline: 100 (percuma)</div>
            <div>💬 WhatsApp: 011-2345 6789</div>
            <div>📧 Email: support@unifi.com.my</div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Phone Frame */}
      <div className="bg-gray-900 rounded-3xl p-3 shadow-2xl">
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Status Bar */}
          <div className="bg-gray-100 px-4 py-2 flex justify-between items-center text-xs">
            <span>9:41</span>
            <span>📶 🔋</span>
          </div>

          {/* Screen Content */}
          <div className="p-4 h-[500px] overflow-y-auto">
            {screens[currentScreen]}
          </div>

          {/* Navigation Bar */}
          <div className="bg-white border-t px-2 py-3">
            <div className="grid grid-cols-5 gap-1">
              {[
                { id: 'home', icon: '🏠', label: 'Home' },
                { id: 'billing', icon: '💳', label: 'Bil' },
                { id: 'usage', icon: '📊', label: 'Data' },
                { id: 'wifi', icon: '📡', label: 'WiFi' },
                { id: 'support', icon: '💬', label: 'Help' }
              ].map(nav => (
                <button
                  key={nav.id}
                  onClick={() => setScreen(nav.id as any)}
                  className={`flex flex-col items-center py-2 rounded transition-colors ${
                    currentScreen === nav.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{nav.icon}</span>
                  <span className="text-[10px] mt-1">{nav.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
