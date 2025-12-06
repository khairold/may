'use client';

import { useStore } from '@/store/useStore';
import { mockData } from '@/lib/mock-data';
import { useEffect } from 'react';

export default function PromoModal() {
  const { promoModal, setPromoModal } = useStore();

  const promo = mockData.promotions.find(p => p.id === promoModal);

  useEffect(() => {
    // Close modal on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPromoModal(null);
      }
    };

    if (promoModal) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [promoModal, setPromoModal]);

  if (!promo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={() => setPromoModal(null)}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
          <div className="text-4xl mb-2">🎁</div>
          <h2 className="text-2xl font-bold">{promo.title}</h2>
          <p className="text-blue-100 mt-1">{promo.desc}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">{promo.details}</p>
          </div>

          {promo.id === 'upgrade' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pelan Semasa:</span>
                <span className="font-semibold">Unifi 100Mbps - RM129</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pelan Baru:</span>
                <span className="font-semibold text-blue-600">Unifi 300Mbps - RM159</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Perbezaan:</span>
                  <span className="font-bold text-green-600">+RM30/bulan</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="text-sm font-semibold text-green-800 mb-1">Kelebihan:</div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✓ Kelajuan 3x ganda</li>
                  <li>✓ Streaming 4K lancar</li>
                  <li>✓ Gaming tanpa lag</li>
                  <li>✓ Tiada caj pemasangan</li>
                </ul>
              </div>
            </div>
          )}

          {promo.id === 'weekend' && (
            <div className="space-y-3">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <div className="text-sm font-semibold text-purple-800 mb-1">Butiran:</div>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>✓ Aktif setiap Sabtu & Ahad</li>
                  <li>✓ Kelajuan 2x ganda (200Mbps)</li>
                  <li>✓ Tiada had data tambahan</li>
                  <li>✓ Tiada pendaftaran diperlukan</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">100Mbps → 200Mbps</div>
                <div className="text-sm text-blue-700 mt-1">Setiap hujung minggu</div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2 pt-2">
            {promo.id === 'upgrade' && (
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                Upgrade Sekarang
              </button>
            )}
            {promo.id === 'weekend' && (
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                Ketahui Lebih Lanjut
              </button>
            )}
            <button
              onClick={() => setPromoModal(null)}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
