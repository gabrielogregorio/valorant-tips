'use client';

import { Button } from '@/molecules/Button';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-xl">
      <TitleAndSubtitle title="Opa! Algo deu errado" subtitle="Não conseguimos carregar os tutoriais no momento." />

      <div className="bg-feedback-error-soft text-feedback-error-hard p-4 rounded-sm max-w-md text-center">
        {error.message || 'Erro desconhecido ao carregar posts.'}
      </div>

      <Button onClick={() => reset()} variant="primary">
        Tentar novamente
      </Button>
    </div>
  );
}
