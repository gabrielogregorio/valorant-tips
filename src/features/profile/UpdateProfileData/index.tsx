'use client';

import { useEffect } from 'react';
import { TextFieldForm } from '@/molecules/TextFieldForm';
import { Button } from '@/molecules/Button';
import { ErrorMessage } from '@/molecules/ErrorMessage';
import { SuccessMessage } from '@/molecules/Success';
import { formatI18n } from '@/libs/i18n';
import { useProfileDataAccountFormController } from './useProfileDataAccountFormController';
import { UpdateProfileDataFormInterface } from './validationSchema';

import { useFetchUserLogged } from '@/shared/hooks/useFetchUserLogged';
import { ImageUploadPreview } from '@/molecules/ImageUploadPreview/ImageLoad';
import { useImageUpload } from '@/shared/hooks/useImageUpload';

export const UpdateProfileData = () => {
  const { control, onSubmit, isLoading, errorMessage, success, setValue, getValues } =
    useProfileDataAccountFormController();

  const userLogged = useFetchUserLogged();

  const { imagePreview, isUploading, handleImageSelect, handleImageRemove, setImagePreview } = useImageUpload({
    uploadApiRoute: '/uploadImage',
    onUploadSuccess: (url) => setValue('imageUrl', url, { shouldValidate: true, shouldDirty: true }),
    onRemoveComplete: () => setValue('imageUrl', '', { shouldValidate: true, shouldDirty: true }),
  });

  console.log(userLogged.data);
  useEffect(() => {
    if (userLogged.data) {
      const imageUrl = getValues('imageUrl');
      if (!imageUrl) {
        setValue('imageUrl', userLogged.data.imageUrl);
        setImagePreview(userLogged.data.imageUrl);
      }

      const username = getValues('username');
      if (!username) {
        setValue('username', userLogged.data.username);
      }

      const name = getValues('name');
      if (!name) {
        setValue('name', userLogged.data.name);
      }
    }
  }, [userLogged.data, getValues, setValue, setImagePreview]);

  return (
    <form
      className="animate-fadeIn300"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}>
      <div className="flex flex-col gap-xl">
        <ImageUploadPreview
          currentImage={imagePreview}
          label="Escolher foto de perfil"
          onImageSelect={handleImageSelect}
          onImageRemove={handleImageRemove}
        />

        <TextFieldForm<UpdateProfileDataFormInterface>
          control={control}
          id="name"
          name="name"
          label={formatI18n('label.name')}
          placeholder={formatI18n('placeholder.yourName')}
          helpText={formatI18n('helpText.typeYourName')}
        />

        <TextFieldForm<UpdateProfileDataFormInterface>
          control={control}
          id="username"
          name="username"
          label={formatI18n('label.username')}
          placeholder={formatI18n('placeholder.yourUser')}
          helpText={formatI18n('helpText.typeYourUsername')}
        />
      </div>

      <div className="flex flex-col gap-xl mt-4">
        {errorMessage ? <ErrorMessage text={errorMessage} /> : undefined}

        {success ? <SuccessMessage text={success} /> : undefined}

        <Button type="submit" variant={'primary'} disabled={isLoading || isUploading}>
          {isLoading || isUploading ? 'SALVANDO ALTERAÇÕES...' : 'SALVAR ALTERAÇÕES'}
        </Button>
      </div>
    </form>
  );
};

