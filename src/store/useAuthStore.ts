import { create } from 'zustand';
import { storage } from '../utils/storage';

interface AuthState {
  token: string | null;
  hasSeenOnboarding: boolean;
  login: (token: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: storage.getString('user.token') ?? null,
  hasSeenOnboarding: storage.getBoolean('app.hasSeenOnboarding') ?? false,

  login: (token) => {
    storage.set('user.token', token);
    set({ token });
  },

  logout: () => {
    storage.remove('user.token');
    set({ token: null });
  },

  completeOnboarding: () => {
    storage.set('app.hasSeenOnboarding', true);
    set({ hasSeenOnboarding: true });
  },
}));
