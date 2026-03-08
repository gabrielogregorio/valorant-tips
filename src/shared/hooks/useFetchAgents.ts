import useSWR from 'swr';
import { fetcher } from '@/libs/fetcher';

export type AgentType = {
  id: string;
  name: string;
  imageUrl: string;
};

export const useFetchAgents = () => {
  const { data, error, isLoading, mutate } = useSWR<AgentType[]>('/agents', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true, // se a interent desconectar
    refreshInterval: 0, // sem pooling
    keepPreviousData: true, // mantém dados até o fim da revalidação
    errorRetryCount: 3, // tentativas
    revalidateIfStale: true, // revalida na primeira montagem se não tiver cache
  });

  return { agents: data, error, isLoading, reload: mutate };
};
