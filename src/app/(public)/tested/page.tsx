'use client';

import { PageContainer } from '@/atoms/PageContainer';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import { PostsServiceType, useFetchStablePosts } from '@/shared/hooks/useFetchPosts';
import { PostCard } from '@Features/posts/PostCard';

// TODO: Implementar tested
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
    <PageContainer>
      <TitleAndSubtitle key="" subtitle="" title="As melhores dicas Testadas de Valorant" />
      <div className="grid grid-cols-1 gap-6">
        {posts.posts.map((post: PostsServiceType) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </PageContainer>
  );
}
