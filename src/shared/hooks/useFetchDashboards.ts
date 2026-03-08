import useSWR from 'swr';
import { fetcher } from '../../libs/fetcher';

export type IDashboardServiceType = {
  value: number;
  key: string;
};

export const useFetchDashboards = () => {
  const { data, error, isLoading, mutate } = useSWR<IDashboardServiceType[]>('/dashboards', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true, // se a interent desconectar
    refreshInterval: 20000, // 20s pooling
    keepPreviousData: true, // mantém dados até o fim da revalidação
    errorRetryCount: 3, // tentativas
    revalidateIfStale: true, // revalida na primeira montagem se não tiver cache
  });

  return { dashboards: data, error, isLoading, reload: mutate };
};
