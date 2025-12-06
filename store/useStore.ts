import { create } from 'zustand';
import { mockData, ScreenType } from '@/lib/mock-data';

interface AppStore {
  // Screen state
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;

  // User data
  user: {
    name: string;
    language: 'en' | 'ms';
  };

  // Billing data
  billing: {
    amount: number;
    dueDate: string;
  };

  // Usage data
  usage: {
    used: number;
    limit: number;
    daysLeft: number;
  };

  // Services data
  services: {
    plan: string;
    speed: string;
    price: number;
  };

  // Form fields
  formFields: Record<string, string>;
  setField: (id: string, value: string) => void;

  // Promo modal
  promoModal: string | null;
  setPromoModal: (id: string | null) => void;

  // Get context for AI
  getContext: () => Record<string, any>;
}

export const useStore = create<AppStore>((set, get) => ({
  // Initial state
  currentScreen: 'home',
  user: mockData.user,
  billing: mockData.billing,
  usage: mockData.usage,
  services: mockData.services,
  formFields: {},
  promoModal: null,

  // Actions
  setScreen: (screen) => set({ currentScreen: screen }),
  setField: (id, value) => set((state) => ({
    formFields: { ...state.formFields, [id]: value }
  })),
  setPromoModal: (id) => set({ promoModal: id }),

  // Get context for AI system prompt
  getContext: () => {
    const state = get();
    return {
      user: state.user,
      currentScreen: state.currentScreen,
      billing: state.billing,
      usage: state.usage,
      services: state.services
    };
  }
}));
