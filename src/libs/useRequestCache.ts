import { useQuery } from '@tanstack/react-query';

interface IResponseCustomQuery<T> {
  data: T | undefined | null;
  isLoading: boolean;
  mutate: () => void;
  error: unknown;
}

const TIME_IN_MS_TO_RETRY_INTERVAL = 2000;

export const useRequestCacheCustomSwr = <T>(
  url: string,
  fetcher: ((arg: string) => Promise<T> | null) | null,
): IResponseCustomQuery<T> => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      if (!fetcher) throw new Error('No fetcher');
      const response = await fetcher(url);
      // Handle the case where the fetcher might return { data: T } or just T
      return (response as any)?.data !== undefined ? (response as any).data : response;
    },
    enabled: !!url && !!fetcher,
    retryDelay: TIME_IN_MS_TO_RETRY_INTERVAL,
  });

  return {
    data: data as T,
    isLoading,
    mutate: () => {
      refetch();
    },
    error,
  };
};
