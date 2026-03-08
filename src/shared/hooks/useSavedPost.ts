'use client';

import { useCallback, useState } from 'react';
import { getSavedIds, toggleSaved } from '../../store/postInteractions';

export function useSavedPost() {
  const [savedIds, setSavedIds] = useState<string[]>(() => getSavedIds());

  const toggle = useCallback((id: string) => {
    toggleSaved(id);
    setSavedIds(getSavedIds());
  }, []);

  return { savedIds, toggle };
}
