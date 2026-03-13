import { api } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

interface IResponseCustomQuery<T> {
  data: T | undefined | null;
  isLoading: boolean;
  mutate: () => void;
  error: unknown;
}

const TIME_IN_MS_TO_RETRY_INTERVAL = 2000;

type UnwrapData<T> = T extends { data: infer D } ? D : T;

export const useRequestCacheCustomSwr = <T>(
  url: string,
  fetcher: ((arg: string) => Promise<T> | null) | null,
): IResponseCustomQuery<UnwrapData<T>> => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [url],
    queryFn: async (): Promise<UnwrapData<T>> => {
      if (!fetcher) throw new Error('No fetcher');
      const response = (await api.get(url)).data;

      if (response && typeof response === 'object' && 'data' in response) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (response as { data: any }).data as UnwrapData<T>;
      }
      return response as UnwrapData<T>;
    },
    enabled: !!url && !!fetcher,
    retryDelay: TIME_IN_MS_TO_RETRY_INTERVAL,
  });

  return {
    data: data as UnwrapData<T>,
    isLoading,
    mutate: () => {
      refetch();
    },
    error,
  };
};
