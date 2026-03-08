import { useState, ChangeEvent } from 'react';
import { X } from 'lucide-react';
import { Button } from '../Button';
import { Image } from '@/libs/image';

interface ImageUploadPreviewProps {
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  currentImage?: string;
  label?: string;
}

/// adicionar input com width e heigth
export const ImageUploadPreview = ({
  onImageSelect,
  onImageRemove,
  currentImage,
  label = 'Escolher Imagem',
}: ImageUploadPreviewProps) => {
  const [preview, setPreview] = useState<string | undefined>(currentImage);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    onImageRemove();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
        {preview ? (
          <>
            <Image src={preview} alt="Preview" className="object-cover rounded-lg" width={100} height={100} />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
              <X size={20} />
            </button>
          </>
        ) : (
          <label className="cursor-pointer">
            <span className="text-gray-500 text-center">{label}</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        )}
      </div>
      {preview && (
        <Button type="button" variant="secondary" onClick={handleRemove}>
          Remover Imagem
        </Button>
      )}
    </div>
  );
};
