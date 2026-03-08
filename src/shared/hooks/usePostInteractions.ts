/**
 * src/hooks/usePostInteractions.ts
 * Hook combinado: retorna estado salvo + testado de um post de uma vez.
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { getPostStatus, toggleSaved, toggleTested, type PostInteractionStatus } from '@/shared/store/postInteractions';

export function usePostInteractions(id: string) {
  const [status, setStatus] = useState<PostInteractionStatus>({
    saved: false,
    tested: false,
  });

  useEffect(() => {
    setStatus(getPostStatus(id));
  }, [id]);

  const toggleSavedState = useCallback(() => {
    const next = toggleSaved(id);
    setStatus((prev) => ({ ...prev, saved: next }));
    return next;
  }, [id]);

  const toggleTestedState = useCallback(() => {
    const next = toggleTested(id);
    setStatus((prev) => ({ ...prev, tested: next }));
    return next;
  }, [id]);

  return {
    saved: status.saved,
    tested: status.tested,
    toggleSaved: toggleSavedState,
    toggleTested: toggleTestedState,
  };
}
