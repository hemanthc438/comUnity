import { PersistedClient, Persister } from '@tanstack/react-query-persist-client';
import { storage } from './storage';

const CACHE_KEY = 'REACT_QUERY_OFFLINE_CACHE';

export const mmkvPersister: Persister = {
  persistClient: async (client: PersistedClient) => {
    try {
      storage.set(CACHE_KEY, JSON.stringify(client));
    } catch {}
  },
  restoreClient: async () => {
    try {
      const cache = storage.getString(CACHE_KEY);
      if (!cache) return undefined;
      return JSON.parse(cache) as PersistedClient;
    } catch {
      storage.remove(CACHE_KEY);
      return undefined;
    }
  },
  removeClient: async () => {
    try {
      storage.remove(CACHE_KEY);
    } catch {}
  },
};
