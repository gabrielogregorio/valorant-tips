import useSWR from 'swr';
import { fetcher } from '@/libs/fetcher';

export type PostsServiceType = {
  // não confiar apenas no back
  title: string;
  description: string;
  agents: {
    id: string;
    imageUrl: string;
    name: string;
  }[];
  authors: {
    id: string;
    username: string;
    imageUrl: string;
  }[];
  id: string;
  maps: {
    id: string;
    imageUrl: string;
    name: string;
  }[];
  steps: {
    id: string;
    description: string;
    imageUrl: string;
  }[];
};

const buildUrl = ({ agent, map }: { agent?: string; map?: string }) => {
  const pathUrl = new URLSearchParams();

  if (agent) {
    pathUrl.append('agent', agent);
  }

  if (map) {
    pathUrl.append('map', map);
  }

  const search = pathUrl.toString();

  return search ? `/posts?${search}` : '/posts';
};

export const useFetchStablePosts = ({ agent, map }: { agent?: string; map?: string }) => {
  // TODO: reavalizar nuxt
  const { data, error, isLoading, mutate } = useSWR<{ data: PostsServiceType[] }>(
    buildUrl({
      agent,
      map,
    }),

    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false, // se a interent desconectar
      refreshInterval: 0, // 20s pooling
      keepPreviousData: true, // mantém dados até o fim da revalidação
      errorRetryCount: 3, // tentativas
      revalidateIfStale: false, // revalida na primeira montagem se não tiver cache
    },
  );

  return { posts: data?.data, error, isLoading, reload: mutate };
};

export const useFetchPosts = () => {
  const { data, error, isLoading, mutate } = useSWR<{ data: PostsServiceType[] }>('/posts', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true, // se a interent desconectar
    refreshInterval: 20000, // 20s pooling
    keepPreviousData: true, // mantém dados até o fim da revalidação
    errorRetryCount: 3, // tentativas
    revalidateIfStale: true, // revalida na primeira montagem se não tiver cache
  });

  return { posts: data?.data, error, isLoading, reload: mutate };
};
