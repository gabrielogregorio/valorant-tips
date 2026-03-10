import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storage } from './storage';

describe('storage utility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  describe('get', () => {
    it('should return value from localStorage if it exists and is valid JSON', () => {
      const key = 'test-key';
      const value = { name: 'Test' };
      window.localStorage.setItem(key, JSON.stringify(value));

      const result = storage.get(key, { name: 'Fallback' });
      expect(result).toEqual(value);
    });

    it('should return fallback if key does not exist', () => {
      const result = storage.get('non-existent', 'fallback');
      expect(result).toBe('fallback');
    });

    it('should return fallback if JSON parsing fails', () => {
      const key = 'invalid-json';
      window.localStorage.setItem(key, 'invalid{json');

      const result = storage.get(key, 'fallback');
      expect(result).toBe('fallback');
    });

    it('should return fallback if storage.getItem throws', () => {
      vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
        throw new Error('Storage error');
      });

      const result = storage.get('any-key', 'fallback');
      expect(result).toBe('fallback');
    });
  });

  describe('set', () => {
    it('should save JSON string to localStorage', () => {
      const key = 'test-key';
      const value = { id: 1 };

      storage.set(key, value);

      const storedItem = window.localStorage.getItem(key);
      expect(storedItem).toBe(JSON.stringify(value));
    });

    it('should handle errors gracefully if setItem fails', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
        throw new Error('Quota exceeded');
      });

      storage.set('key', 'value');

      expect(consoleSpy).toHaveBeenCalledWith('[storage] Falha ao salvar "key"');
    });
  });

  describe('remove', () => {
    it('should remove item from localStorage', () => {
      const key = 'test-key';
      window.localStorage.setItem(key, 'value');

      storage.remove(key);

      expect(window.localStorage.getItem(key)).toBeNull();
    });
  });
});
