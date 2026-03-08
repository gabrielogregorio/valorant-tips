'use client';

import { ChangeEvent, SetStateAction } from 'react';
import { Text, TextVariantEnum } from '@/atoms/Text';
import { Button } from '@/molecules/Button';
import { Skeleton } from '@/molecules/Skeleton';
import { useHandleState } from '@/shared/hooks/useHandleState';
import { ApiService } from '@/shared/services/ApiService';
import { HelpText, HelpTextVariantEnum } from '@/molecules/helpText';
import { tailwindMerge } from '@/libs/mergeClasses';
import { Label } from '@/molecules/Label';

export interface LoadImagePropsInterface {
  label: string;
  helpText?: string;
  className?: string;
  errorMessage?: string;
  setErrorMessage?: (value: SetStateAction<string>) => void;
  value?: string;
  onChange?: (value: string) => void;
  id: string;
  name: string;
}

export const LoadImageBase = ({
  id,
  label,
  name,
  value,
  onChange = () => { },
  className = '',
  setErrorMessage = () => { },
  errorMessage,
  helpText,
}: LoadImagePropsInterface) => {
  const { setIsLoading, isLoading } = useHandleState();

  const loadImage = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) {
      return;
    }
    setIsLoading(true);
    setErrorMessage('');

    const formData = new FormData();

    formData.append('image', event.target.files[0]);

    ApiService.post<{ url: string }>('/uploadImage', formData)
      .then((res) => {
        const urlImg = `${res.data.url}`;
        onChange(urlImg);
        setIsLoading(false);
        return res;
      })
      .catch(() => {
        setErrorMessage('Erro ao realizar upload da imagem');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className={tailwindMerge('flex flex-col', className)}>
        <Skeleton className="w-60 h-60  rounded-sm" />

        <Text variant={TextVariantEnum.subtext} className="text-content-fg-subcontent">
          carregando imagem...
        </Text>
      </div>
    );
  }

  if (value) {
    return (
      <div className={tailwindMerge('flex flex-col', className)}>
        <div>
          <img unoptimized src={value} width={240} height={240} alt="" className="min-h-60 min-w-60 object-cover" />

          <Button className="w-full justify-start min-h-0 py-0 px-0" variant={'text'} onClick={() => onChange('')}>
            <Text variant={TextVariantEnum.subtext} className="text-primary">
              remover imagem
            </Text>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={tailwindMerge('flex flex-col', className)}>
      <div className="object-cover">
        <div className="w-61.25 h-62.25 bg-loadImage ">
          <Label htmlFor={name} className="hidden" id={id} text={label} />
          <input
            type="file"
            name={name}
            onChange={loadImage}
            className="block opacity-0 overflow-hidden w-full h-full "
          />
        </div>
        {errorMessage ? (
          <HelpText variant={HelpTextVariantEnum.Error} text={errorMessage} />
        ) : (
          <HelpText variant={HelpTextVariantEnum.Default} text={helpText} />
        )}
      </div>
    </div>
  );
};
