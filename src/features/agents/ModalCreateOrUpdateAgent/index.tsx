import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ImageUploadPreview } from '@/molecules/ImageUploadPreview/ImageLoad';
import { Button } from '@/molecules/Button';
import { TextFieldForm } from '@/molecules/TextFieldForm';
import { AgentType } from '@/shared/hooks/useFetchAgents';
import { useImageUpload } from '@/shared/hooks/useImageUpload';

interface AgentModalProps {
  agent?: AgentType | null;
  onClose: () => void;
  onSuccess?: (savedMap: AgentType) => void;
}

const agentSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(3, 'Nome deve ter ao menos 3 caracteres')
    .max(50, 'Nome muito longo'),
});

type MapFormValues = z.infer<typeof agentSchema>;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

async function createAgent(data: MapFormValues, imageFile: File): Promise<AgentType> {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('image', imageFile);

  const res = await fetch(`${BASE_URL}/agents`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? 'Erro ao criar agente');
  }

  return res.json();
}

async function updateAgent(id: string, data: MapFormValues, imageFile?: File): Promise<AgentType> {
  const formData = new FormData();
  formData.append('name', data.name);

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const res = await fetch(`${BASE_URL}/agents/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? 'Erro ao atualizar agente');
  }

  return res.json();
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export const ModalCreateOrUpdateAgent = ({ agent, onClose, onSuccess }: AgentModalProps) => {
  const isEditing = !!agent?.id;

  const { imageFile, imagePreview, handleImageSelect, handleImageRemove } = useImageUpload({
    initialImage: agent?.imageUrl,
  });

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const hasImage = !!imageFile || !!imagePreview;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MapFormValues>({
    resolver: zodResolver(agentSchema),
    defaultValues: { name: agent?.name ?? '' },
    mode: 'onChange',
  });

  const isLoading = submitStatus === 'loading';
  const canSubmit = isValid && hasImage && !isLoading;

  const onSubmit = async (data: MapFormValues) => {
    if (!imageFile && !imagePreview) {
      setSubmitStatus('error');
      return;
    }

    setSubmitStatus('loading');
    setErrorMessage(null);

    try {
      let saved: AgentType;

      if (isEditing) {
        saved = await updateAgent(agent!.id, data, imageFile ?? undefined);
      } else {
        if (!imageFile) throw new Error('Imagem obrigatória');
        saved = await createAgent(data, imageFile);
      }

      setSubmitStatus('success');
      onSuccess?.(saved);
      setTimeout(onClose, 800);
    } catch (err: unknown) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Erro inesperado');
    }
  };

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm animate-in fade-in-0" />

      <Dialog.Content
        className="fixed z-50 w-full max-w-content-desktop bg-white shadow-2xl rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95"
        onInteractOutside={(e) => isLoading && e.preventDefault()}>
        <div className="flex items-center justify-between p-6 pb-0">
          <Dialog.Title className="text-2xl font-bold">{isEditing ? 'Editar Agente' : 'Criar Agente'}</Dialog.Title>
          <Dialog.Close asChild>
            <button
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
              aria-label="Fechar modal">
              <X size={20} />
            </button>
          </Dialog.Close>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5" noValidate>
          <div className="space-y-1">
            <ImageUploadPreview
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
              currentImage={imagePreview}
              label="Escolher imagem do agente"
            />
            {!hasImage && submitStatus === 'error' && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={14} /> Imagem é obrigatória
              </p>
            )}
          </div>

          <div className="space-y-1">
            <TextFieldForm control={control} id="name" name="name" label="Nome do Agente" disabled={isLoading} />
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.name.message}
              </p>
            )}
          </div>

          {submitStatus === 'error' && errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle size={16} className="shrink-0" />
              {errorMessage}
            </div>
          )}

          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              <CheckCircle2 size={16} className="shrink-0" />
              {isEditing ? 'Agenet atualizado com sucesso!' : 'Agente criado com sucesso!'}
            </div>
          )}

          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>

            <Button type="submit" disabled={!canSubmit} className="min-w-30">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Salvando...
                </span>
              ) : submitStatus === 'success' ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Salvo!
                </span>
              ) : isEditing ? (
                'Salvar alterações'
              ) : (
                'Criar Agente'
              )}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
