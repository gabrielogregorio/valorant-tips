import { ChangeEvent } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { Image } from '@/libs/image';

interface ImageUploadPreviewProps {
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  onImageReset?: () => void;
  currentImage?: string;
  hasInitialImage?: boolean;
  label?: string;
}

export const ImageUploadPreview = ({
  onImageSelect,
  onImageRemove,
  onImageReset,
  currentImage,
  hasInitialImage,
  label = 'Escolher Imagem',
}: ImageUploadPreviewProps) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
        {currentImage ? (
          <>
            <Image src={currentImage} alt="Preview" className="object-cover w-full h-full" width={400} height={400} />
            <button
              type="button"
              onClick={onImageRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors z-10"
              aria-label="Remover">
              <X size={16} />
            </button>
            {hasInitialImage && onImageReset && (
              <button
                type="button"
                onClick={onImageReset}
                className="absolute top-2 right-10 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors z-10"
                title="Resetar para imagem original"
                aria-label="Resetar">
                <RotateCcw size={16} />
              </button>
            )}
          </>
        ) : (
          <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center group hover:bg-gray-100 transition-colors">
            <span className="text-gray-500 text-center px-4 group-hover:text-gray-700 transition-colors">{label}</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        )}
      </div>
    </div>
  );
};
