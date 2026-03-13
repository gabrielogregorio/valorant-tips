'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/molecules/Button';
import { Image } from '@/libs/image';
import { TextFieldFormExternal } from '@/libs/react-hook-form/TextFieldForm';

interface UpdateProfileFormData {
  name: string;
  username: string;
}

interface UpdateProfileProps {
  onUpdateProfile: (data: UpdateProfileFormData & { profileImage?: File }) => Promise<void>;
  initialData?: UpdateProfileFormData & { profileImage?: string };
}

export const UpdateProfile = ({ onUpdateProfile, initialData }: UpdateProfileProps) => {
  const { control, handleSubmit } = useForm<UpdateProfileFormData>({
    defaultValues: initialData,
  });
  const [profileImage, setProfileImage] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>(initialData?.profileImage);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UpdateProfileFormData) => {
    setLoading(true);
    try {
      await onUpdateProfile({ ...data, profileImage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          {preview && <Image src={preview} alt="Perfil" className="object-cover" />}
        </div>
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="profile-image-input" />
        <label htmlFor="profile-image-input">
          <Button variant="secondary">Escolher Imagem</Button>
        </label>
      </div>

      <TextFieldFormExternal control={control} name="name" label="Nome" id="name" />

      <TextFieldFormExternal control={control} name="username" label="Usuário" id="username" />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Salvando...' : 'Salvar Alterações'}
      </Button>
    </form>
  );
};
