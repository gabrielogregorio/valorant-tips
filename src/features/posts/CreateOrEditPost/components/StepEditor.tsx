import { useEffect } from 'react';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import { ImageUploadPreview } from '@/molecules/ImageUploadPreview/ImageLoad';
import { useImageUpload } from '@/shared/hooks/useImageUpload';

// TODO: Fazer o step system ser de arrasta e solta + por seleção e com animação de movimentação
interface Step {
  id: string;
  image?: string;
  description: string;
}

interface StepEditorProps {
  step: Step;
  index: number;
  onUpdate: (id: string, updates: Partial<Step>) => void;
  onRemove: (id: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMove: (direction: 'up' | 'down') => void;
}

export const StepEditor = ({ step, index, onUpdate, onRemove, canMoveUp, canMoveDown, onMove }: StepEditorProps) => {
  const { imagePreview, handleImageSelect, handleImageRemove } = useImageUpload();

  useEffect(() => {
    onUpdate(step.id, { image: imagePreview });
  }, [imagePreview, step.id, onUpdate]);

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2 items-center">
        <button
          type="button"
          onClick={() => onMove('up')}
          disabled={!canMoveUp}
          aria-label={`Subir Passo ${index + 1} para ${index}`}
          className="p-1 disabled:opacity-50 hover:bg-gray-100 rounded text-content-fg cursor-pointer">
          <ChevronUp size={20} />
        </button>
        <span className="text-sm font-medium text-center min-w-6 text-content-fg">{index + 1}</span>
        <button
          type="button"
          onClick={() => onMove('down')}
          aria-label={`Descer Passo ${index + 1} para ${index + 2}`}
          disabled={!canMoveDown}
          className="p-1 disabled:opacity-50 hover:bg-gray-100 rounded text-content-fg cursor-pointer">
          <ChevronDown size={20} />
        </button>
        <button type="button"
          aria-label={`Deletar passo ${index + 1}`}
          onClick={() => onRemove(step.id)} className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-1">
        <ImageUploadPreview
          onImageSelect={handleImageSelect}
          onImageRemove={handleImageRemove}
          currentImage={imagePreview}
          label="Escolher imagem do mapa"
        />
      </div>


      {/* TODO: criar componente com testes */}
      <textarea
        value={step.description}
        onChange={(e) => onUpdate(step.id, { description: e.target.value })}
        placeholder="Descrição do passo"
        className="w-full px-3 py-2 border rounded resize-none h-24 text-content-fg border-content-fg"
      />
    </div>
  );
};
