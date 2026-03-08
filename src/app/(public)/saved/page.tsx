'use client';

import { PostsServiceType, useFetchStablePosts } from '@/shared/hooks/useFetchPosts';
import { PostCard } from '@Features/posts/PostCard';

// TODO: Implementar busca de posts salvos
export default function Page() {
  const posts = useFetchStablePosts({}); // resolver agents e maps vs agent e map
  if (posts.isLoading) {
    return <div>is loading</div>;
  }

  console.log(posts.error);
  if (posts.error) {
    return <div>Error</div>;
  }

  if (!posts.posts?.length) {
    return <div>sem dados</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
        {posts.posts.map((post: PostsServiceType) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
