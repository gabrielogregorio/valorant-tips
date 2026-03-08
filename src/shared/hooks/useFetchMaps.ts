import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/libs/fetcher';

export type MapsType = {
  id: string;
  name: string;
  imageUrl: string;
};

export const useFetchMaps = () => {
  const { data, error, isLoading, refetch } = useQuery<MapsType[]>({
    queryKey: ['maps'],
    queryFn: () => fetcher('/maps'),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    staleTime: 0,
    retry: 3,
  });

  return { maps: data, error, isLoading, reload: refetch };
};
