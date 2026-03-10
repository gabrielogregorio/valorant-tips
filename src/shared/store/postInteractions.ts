import { storage } from '@/libs/storage';

const KEYS = {
  saved: 'post_saved_ids',
  tested: 'post_tested_ids',
} as const;

function getSet(key: string): Set<string> {
  return new Set(storage.get<string[]>(key, []));
}

function saveSet(key: string, set: Set<string>): void {
  storage.set(key, Array.from(set));
}

export function getSavedIds(): string[] {
  return storage.get<string[]>(KEYS.saved, []);
}

export function isPostSaved(id: string): boolean {
  return getSet(KEYS.saved).has(id);
}

export function toggleSaved(id: string): boolean {
  const set = getSet(KEYS.saved);
  if (set.has(id)) {
    set.delete(id);
    saveSet(KEYS.saved, set);
    return false;
  } else {
    set.add(id);
    saveSet(KEYS.saved, set);
    return true;
  }
}

export function clearSaved(): void {
  storage.remove(KEYS.saved);
}

export function getTestedIds(): string[] {
  return storage.get<string[]>(KEYS.tested, []);
}

export function isPostTested(id: string): boolean {
  return getSet(KEYS.tested).has(id);
}

export function toggleTested(id: string): boolean {
  const set = getSet(KEYS.tested);
  if (set.has(id)) {
    set.delete(id);
    saveSet(KEYS.tested, set);
    return false;
  } else {
    set.add(id);
    saveSet(KEYS.tested, set);
    return true;
  }
}

export function clearTested(): void {
  storage.remove(KEYS.tested);
}

export type PostInteractionStatus = {
  saved: boolean;
  tested: boolean;
};

export function getPostStatus(id: string): PostInteractionStatus {
  return {
    saved: isPostSaved(id),
    tested: isPostTested(id),
  };
}
