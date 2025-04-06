'use client';

import { Text, TextVariantEnum } from '../../Atoms/Text';
import { Button } from '../../Molecules/Button';
import { ErrorMessage } from '../../Molecules/ErrorMessage';
import { LoadingMessage } from '../../Molecules/Loading';
import { useFetchSuggestions } from '../../shared/hooks/useFetchSuggestions';

export const Suggestions = () => {
  const { data, errorMessage, isLoading, reload } = useFetchSuggestions();

  if (errorMessage) {
    return (
      <div className="">
        <ErrorMessage text="Algo deu errado, tente novamente" />

        <Button onClick={() => reload()} className="mt-sm">
          TENTAR NOVAMENTE
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingMessage text="Comunicando com o servidor...." />;
  }

  return (
    <div>
      {data?.data?.map((suggestion) => (
        <div key={suggestion.id} className="border border-border rounded-xs py-xxs px-xs flex flex-col gap-md-">
          <Text variant={TextVariantEnum.text}>{suggestion.description}</Text>

          <Text variant={TextVariantEnum.text}>
            Post:
            <a href="" className="text-secondary underline">
              {suggestion.postId}
            </a>
          </Text>
          <Text variant={TextVariantEnum.text}>
            Email:
            <a href="" className="text-secondary underline">
              {suggestion.email}
            </a>
          </Text>
          <Text className="text-content-fg-subcontent" variant={TextVariantEnum.text}>
            Publicado a {suggestion.updatedAt} dias
          </Text>
        </div>
      ))}
    </div>
  );
};
