import { api } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';

export type IDashboardServiceType = {
  value: number;
  key: string;
};

export const useFetchDashboards = () => {
  const { data, error, isLoading, refetch } = useQuery<IDashboardServiceType[]>({
    queryKey: ['dashboards'],
    queryFn: async () => (await api.get<IDashboardServiceType[]>('/dashboards')).data,
    refetchInterval: 20000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
  });

  return { dashboards: data, error, isLoading, reload: refetch };
};
