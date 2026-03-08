const isClient = typeof window !== 'undefined';

export const storage = {
  get<T>(key: string, fallback: T): T {
    if (!isClient) return fallback;

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : fallback;
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    if (!isClient) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn(`[storage] Falha ao salvar "${key}"`);
    }
  },

  remove(key: string): void {
    if (!isClient) return;

    window.localStorage.removeItem(key);
  },
};
