'use client';

// Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Page ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
useEffect(() => {
// Log completo e estruturado no console
console.group('🔴 [Error Boundary] Erro capturado');
console.error('Mensagem:', error.message);
console.error('Nome:', error.name);
if (error.digest) console.error('Digest (Next.js):', error.digest);
console.error('Stack completo:', error.stack);
console.error('Objeto completo:', error);
console.groupEnd();
}, [error]);

return (

<div>
<h2>Ops, algo deu errado!</h2>

      <button
        type="button"
        onClick={reset}
      >
        Tentar novamente
      </button>
    </div>

);
};
