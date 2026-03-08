import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/libs/fetcher';

export type AgentType = {
  id: string;
  name: string;
  imageUrl: string;
};

export const useFetchAgents = () => {
  const { data, error, isLoading, refetch } = useQuery<AgentType[]>({
    queryKey: ['agents'],
    queryFn: () => fetcher('/agents'),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    staleTime: 0,
    retry: 3,
  });

  return { agents: data, error, isLoading, reload: refetch };
};
