import { fetcherServer } from '@/libs/fetcher';
import { PostsServiceType } from '@/shared/hooks/useFetchPosts';

export const postsService = {
  getPostsByMapAndAgent: async (map: string, agent: string, options?: RequestInit) => {
    return fetcherServer<{ posts: PostsServiceType[] }>(`/posts/${map}/${agent}`, options);
  },
};
