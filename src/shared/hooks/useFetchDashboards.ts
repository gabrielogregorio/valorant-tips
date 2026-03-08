import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/libs/fetcher';

export type IDashboardServiceType = {
  value: number;
  key: string;
};

export const useFetchDashboards = () => {
  const { data, error, isLoading, refetch } = useQuery<IDashboardServiceType[]>({
    queryKey: ['dashboards'],
    queryFn: () => fetcher('/dashboards'),
    refetchInterval: 20000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
  });

  return { dashboards: data, error, isLoading, reload: refetch };
};
