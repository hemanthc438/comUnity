import { create } from 'zustand';
import { storage } from '../utils/storage';

interface AuthState {
  token: string | null;
  email: string | null;
  hasSeenOnboarding: boolean;
  login: (token: string, email: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: storage.getString('user.token') ?? null,
  email: storage.getString('user.email') ?? null,
  hasSeenOnboarding: storage.getBoolean('app.hasSeenOnboarding') ?? false,

  login: (token, email) => {
    storage.set('user.token', token);
    storage.set('user.email', email);
    set({ token, email });
  },

  logout: () => {
    storage.remove('user.token');
    storage.remove('user.email');
    set({ token: null, email: null });
  },

  completeOnboarding: () => {
    storage.set('app.hasSeenOnboarding', true);
    set({ hasSeenOnboarding: true });
  },
}));
