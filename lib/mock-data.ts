export const mockData = {
  user: {
    name: 'Ahmad',
    language: 'ms' as 'en' | 'ms'
  },
  billing: {
    amount: 189,
    dueDate: '2025-12-20'
  },
  usage: {
    used: 82,
    limit: 100,
    daysLeft: 12
  },
  services: {
    plan: 'Unifi 100Mbps',
    speed: '100Mbps',
    price: 129
  },
  promotions: [
    {
      id: 'upgrade',
      title: 'Upgrade ke 300Mbps',
      desc: '+RM30/bulan',
      details: 'Nikmati kelajuan 3x ganda dengan hanya tambahan RM30 sebulan. Tanpa kontrak tambahan!'
    },
    {
      id: 'weekend',
      title: 'Weekend Speed Boost',
      desc: 'Percuma!',
      details: 'Dapatkan kelajuan 2x ganda setiap hujung minggu. Tiada caj tambahan!'
    }
  ]
};

export type ScreenType = 'home' | 'billing' | 'usage' | 'wifi' | 'plans' | 'support';
