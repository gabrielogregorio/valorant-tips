'use client';

import { useCallback, useState } from 'react';
import { getTestedIds, toggleTested } from '../../store/postInteractions';

export function useTestedPost() {
  const [testedIds, setTestedIds] = useState<string[]>(() => getTestedIds());

  const toggle = useCallback((id: string) => {
    toggleTested(id);
    setTestedIds(getTestedIds());
  }, []);

  return { testedIds, toggle };
}
