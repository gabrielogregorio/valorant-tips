import { useQuery } from '@tanstack/react-query';
import { api } from '@/libs/api';

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

export const useFetchStablePosts = () => {
  const { data, error, isLoading, refetch } = useQuery<{ data: { data: PostsServiceType[] } }>({
    queryKey: ['posts'],
    queryFn: () => api.get<{ data: PostsServiceType[] }>('/posts'),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 3,
  });

  return { posts: data?.data.data, error, isLoading, reload: refetch };
};
