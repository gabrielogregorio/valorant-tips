import { ApiService } from '../services/ApiService';
import { formatI18n } from '@/libs/i18n';
import { useRequestCacheCustomSwr } from '@/libs/useRequestCache';

type SuggestionsType = {
  createdAt: string;
  description: string;
  email: string;
  id: string;
  postId: string;
  status: string;
  updatedAt: string;
};

export const useFetchSuggestions = () => {
  const { data, error, isLoading, mutate } = useRequestCacheCustomSwr('/suggestions', (url: string) =>
    ApiService.get<SuggestionsType[]>(url),
  );

  return {
    data,
    errorMessage: error ? formatI18n('msg.error.onFetchSuggestions') : '',
    isLoading,
    reload: mutate,
  };
};
