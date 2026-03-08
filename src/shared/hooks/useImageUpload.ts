import { useState, useCallback, useEffect } from 'react';
import { api } from '@/libs/api';

interface UseImageUploadOptions {
  initialImage?: string;
  uploadApiRoute?: string;
  onUploadSuccess?: (url: string) => void;
  onRemoveComplete?: () => void;
}

export const useImageUpload = ({
  initialImage,
  uploadApiRoute,
  onUploadSuccess,
  onRemoveComplete,
}: UseImageUploadOptions = {}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialImage) {
      setImagePreview(initialImage);
    }
  }, [initialImage]);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageSelect = useCallback(
    async (file: File) => {
      setImageFile(file);
      const localUrl = URL.createObjectURL(file);
      setImagePreview(localUrl);
      setError(null);

      if (uploadApiRoute) {
        setIsUploading(true);
        try {
          const formData = new FormData();
          formData.append('image', file);
          const res = await api.post<{ url: string }>(uploadApiRoute, formData);

          if (onUploadSuccess) {
            onUploadSuccess(res.data.url);
          }
        } catch (err) {
          console.error('Erro ao fazer upload', err);
          setError('Erro ao fazer upload da imagem');
        } finally {
          setIsUploading(false);
        }
      }
    },
    [uploadApiRoute, onUploadSuccess],
  );

  const handleImageRemove = useCallback(() => {
    setImageFile(null);
    setImagePreview(undefined);
    setError(null);
    if (onRemoveComplete) {
      onRemoveComplete();
    }
  }, [onRemoveComplete]);

  return {
    imageFile,
    imagePreview,
    isUploading,
    error,
    handleImageSelect,
    handleImageRemove,
    setImagePreview,
  };
};
