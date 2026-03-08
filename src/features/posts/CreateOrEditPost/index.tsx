'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, AlertCircle, CheckCircle2, RefreshCcw } from 'lucide-react';
import { TextFieldForm } from '@/molecules/TextFieldForm';
import { ImageUploadPreview } from '@/molecules/ImageUploadPreview/ImageLoad';
import { SelectableCard } from '@/molecules/SelectableCard';
import { Button } from '@/molecules/Button';
import { useFetchAgents } from '@/shared/hooks/useFetchAgents';
import { useFetchMaps } from '@/shared/hooks/useFetchMaps';
import { ClientCookies } from '@/libs/clientCookies';
import { authCookieName } from '@/shared/constants/cookies';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

interface Step {
  id: string;
  description: string;
  imageFile?: File | null;
  imagePreview?: string;
}

interface PostResponse {
  id: string;
  title: string;
  description: string;
  agentIds: string[];
  mapIds: string[];
  steps: {
    id: string;
    description: string;
    imageUrl?: string;
  }[];
}

const postSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .min(3, 'Título deve ter ao menos 3 caracteres')
    .max(120, 'Título muito longo'),

  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .min(5, 'Descrição muito curta')
    .max(500, 'Descrição muito longa'),
});

type PostFormValues = z.infer<typeof postSchema>;

export const CreateOrEditPost = () => {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();
  const isEditing = !!id;

  const fetchAgents = useFetchAgents();
  const fetchMaps = useFetchMaps();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
  });

  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedMaps, setSelectedMaps] = useState<string[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(isEditing);

  const isLoading = submitStatus === 'loading';

  const canSubmit =
    isValid &&
    selectedAgents.length > 0 &&
    selectedMaps.length > 0 &&
    steps.every((s) => s.description.trim().length > 0) &&
    !isLoading;

  useEffect(() => {
    if (!isEditing) {
      setSteps([{ id: crypto.randomUUID(), description: '' }]);
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await fetch(`${BASE_URL}/posts/${id}`);
        if (!res.ok) throw new Error('Erro ao buscar post');

        const data: PostResponse = await res.json();

        setValue('title', data.title);
        setValue('description', data.description);
        setSelectedAgents(data.agentIds);
        setSelectedMaps(data.mapIds);

        setSteps(
          data.steps.map((step) => ({
            id: step.id,
            description: step.description,
            imagePreview: step.imageUrl,
            imageFile: null,
          })),
        );
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchPost();
  }, [id, isEditing, setValue]);

  /* ================= STEP HANDLERS ================= */

  const updateStep = (id: string, updates: Partial<Step>) => {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const addStep = () => {
    setSteps((prev) => [...prev, { id: crypto.randomUUID(), description: '' }]);
  };

  const removeStep = (id: string) => {
    if (steps.length === 1) return;
    setSteps((prev) => prev.filter((s) => s.id !== id));
  };

  /* ================= SUBMIT ================= */

  const onSubmit = async (data: PostFormValues) => {
    setSubmitStatus('loading');
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('agentIds', JSON.stringify(selectedAgents));
      formData.append('mapIds', JSON.stringify(selectedMaps));

      const formattedSteps = steps.map((step, index) => ({
        id: step.id,
        description: step.description,
        imageField: step.imageFile ? `stepImage_${index}` : null,
      }));

      formData.append('steps', JSON.stringify(formattedSteps));

      steps.forEach((step, index) => {
        if (step.imageFile) {
          formData.append(`stepImage_${index}`, step.imageFile);
        }
      });

      const res = await fetch(isEditing ? `${BASE_URL}/posts/${id}` : `${BASE_URL}/posts`, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          Authorization: `${ClientCookies.getCookie(authCookieName)}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message ?? 'Erro ao salvar post');
      }

      setSubmitStatus('success');

      setTimeout(() => {
        router.push('/admin/posts');
      }, 1200);
    } catch (err: unknown) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Erro inesperado');
    }
  };

  /* ================= CLEANUP ================= */

  useEffect(() => {
    return () => {
      steps.forEach((step) => {
        if (step.imagePreview?.startsWith('blob:')) {
          URL.revokeObjectURL(step.imagePreview);
        }
      });
    };
  }, [steps]);

  /* ================= LOADING SCREEN ================= */

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin" />
      </div>
    );
  }

  /* ================= RENDER ================= */

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-content-desktop mx-auto" noValidate>
      <div>
        <h1 className="text-3xl font-bold text-content-fg">{isEditing ? 'Editar Post' : 'Criar Post'}</h1>
      </div>

      {/* TITLE */}
      <div className="space-y-1">
        <TextFieldForm control={control} id="title" name="title" label="Título" disabled={isLoading} />
        {errors.title && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle size={14} /> {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <TextFieldForm control={control} id="description" name="description" label="Descrição" disabled={isLoading} />
        {errors.description && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle size={14} /> {errors.description.message}
          </p>
        )}
      </div>

      {/* AGENTS */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-content-fg">Agentes</h2>
        <div className="grid grid-cols-4 gap-4">
          {fetchAgents.agents?.map((agent) => (
            <SelectableCard
              key={agent.id}
              id={agent.id}
              image={agent.imageUrl}
              name={agent.name}
              isSelected={selectedAgents.includes(agent.id)}
              onClick={() =>
                setSelectedAgents((prev) =>
                  prev.includes(agent.id) ? prev.filter((a) => a !== agent.id) : [...prev, agent.id],
                )
              }
            />
          ))}
          <button className='text-content-fg' type="button" onClick={() => fetchAgents.reload}>
            <RefreshCcw />
          </button>
        </div>
      </section>

      {/* MAPS */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-content-fg">Mapas</h2>
        <div className="grid grid-cols-4 gap-4">
          {fetchMaps.maps?.map((map) => (
            <SelectableCard
              key={map.id}
              id={map.id}
              image={map.imageUrl}
              name={map.name}
              isSelected={selectedMaps.includes(map.id)}
              onClick={() =>
                setSelectedMaps((prev) =>
                  prev.includes(map.id) ? prev.filter((m) => m !== map.id) : [...prev, map.id],
                )
              }
            />
          ))}
          <button className='text-content-fg' type="button" onClick={() => fetchMaps.reload}>
            <RefreshCcw />
          </button>
        </div>
      </section>

      {/* STEPS */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-content-fg">Passos</h2>

        {steps.map((step, index) => (
          <div key={step.id} className="p-4 border rounded-lg bg-gray-50 space-y-4">
            <ImageUploadPreview
              currentImage={step.imagePreview}
              onImageSelect={(file) =>
                updateStep(step.id, {
                  imageFile: file,
                  imagePreview: URL.createObjectURL(file),
                })
              }
              onImageRemove={() =>
                updateStep(step.id, {
                  imageFile: null,
                  imagePreview: undefined,
                })
              }
              label={`Imagem do passo ${index + 1}`}
            />

            <textarea
              className="w-full border rounded-md p-2"
              value={step.description}
              onChange={(e) =>
                updateStep(step.id, {
                  description: e.target.value,
                })
              }
              disabled={isLoading}
            />

            <Button type="button" variant="secondary" onClick={() => removeStep(step.id)} disabled={isLoading}>
              Remover passo
            </Button>
          </div>
        ))}

        <Button type="button" variant="secondary" onClick={addStep} disabled={isLoading}>
          + Adicionar Passo
        </Button>
      </section>

      {/* STATUS */}
      {submitStatus === 'error' && errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle size={16} />
          {errorMessage}
        </div>
      )}

      {submitStatus === 'success' && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          <CheckCircle2 size={16} />
          {isEditing ? 'Post atualizado com sucesso!' : 'Post criado com sucesso!'}
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={!canSubmit} className="min-w-40">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Salvando...
            </span>
          ) : isEditing ? (
            'Salvar alterações'
          ) : (
            'Criar Post'
          )}
        </Button>
      </div>
    </form>
  );
};
