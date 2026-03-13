import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/molecules/Button';
import { Portal } from 'radix-ui';
import { api } from '@/libs/api';
import { TextFieldFormExternal } from '@/libs/react-hook-form/TextFieldForm';
import { TextAreaFormExternal } from '@/libs/react-hook-form/TextAreaForm';

interface ModalSuggestPostProps {
  postId: string;
  onClose: () => void;
  open: boolean;
}

const suggestionSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('Formato de e-mail inválido'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .min(10, 'A descrição deve ter ao menos 10 caracteres')
    .max(500, 'Descrição muito longa'),
});

type SuggestionFormValues = z.infer<typeof suggestionSchema>;

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export const ModalSuggestPost = ({ postId, onClose, open }: ModalSuggestPostProps) => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SuggestionFormValues>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: { email: '', description: '' },
    mode: 'onChange',
  });

  const isLoading = submitStatus === 'loading';
  const canSubmit = isValid && !isLoading;

  const handleClose = () => {
    reset();
    setSubmitStatus('idle');
    setErrorMessage(null);
    onClose();
  };

  const onSubmit = async (data: SuggestionFormValues) => {
    setSubmitStatus('loading');
    setErrorMessage(null);

    try {
      await api.post('/suggestions', {
        postId,
        email: data.email,
        description: data.description,
      });

      setSubmitStatus('success');
      setTimeout(handleClose, 2000);
    } catch (err: unknown) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Erro inesperado ao enviar sugestão');
    }
  };

  return (
    <Portal.Root>
      <Dialog.Root open={open} onOpenChange={(open) => !open && handleClose()}>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm animate-in fade-in-0" />

        <Dialog.Content
          className="fixed z-50 w-full max-w-content-desktop bg-content-bg shadow-2xl rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95"
          onInteractOutside={(e) => isLoading && e.preventDefault()}>
          <div className="flex items-center justify-between p-6 pb-0">
            <Dialog.Title className="text-2xl font-bold text-content-fg">Sugerir Melhoria</Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-content-fg"
                disabled={isLoading}
                aria-label="Fechar modal">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5" noValidate>
            <TextFieldFormExternal
              control={control}
              id="email"
              name="email"
              label="Seu E-mail"
              type="email"
              placeholder="exemplo@email.com"
              disabled={isLoading}
              errorMessage={errors.email && errors.email.message}
            />

            <TextAreaFormExternal
              label="Sugestão"
              name="description"
              control={control}
              id="description"
              disabled={isLoading}
              errorMessage={errors.description && errors.description.message}
              placeholder="Descreva a melhoria ou alteração sugerida..."
              className="w-full px-3 py-2 border rounded resize-none h-32 text-content-fg bg-transparent border-content-fg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
            />

            {submitStatus === 'error' && errorMessage && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                {errorMessage}
              </div>
            )}

            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                <CheckCircle2 size={16} className="shrink-0" />
                Sugestão enviada com sucesso! Obrigado pela colaboração.
              </div>
            )}

            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="secondary" onClick={handleClose} disabled={isLoading}>
                Cancelar
              </Button>

              <Button type="submit" disabled={!canSubmit} className="min-w-30">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Enviando...
                  </span>
                ) : submitStatus === 'success' ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    Enviado!
                  </span>
                ) : (
                  'Enviar Sugestão'
                )}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </Portal.Root>
  );
};
