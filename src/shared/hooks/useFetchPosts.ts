import { useQuery } from '@tanstack/react-query';
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
  const url = buildUrl({ agent, map });
  const { data, error, isLoading, refetch } = useQuery<{ data: PostsServiceType[] }>({
    queryKey: ['posts', agent, map],
    queryFn: () => fetcher(url),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 3,
  });

  return { posts: data?.data, error, isLoading, reload: refetch };
};

export const useFetchPosts = () => {
  const { data, error, isLoading, refetch } = useQuery<{ data: PostsServiceType[] }>({
    queryKey: ['posts'],
    queryFn: () => fetcher('/posts'),
    refetchInterval: 20000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
  });

  return { posts: data?.data, error, isLoading, reload: refetch };
};
