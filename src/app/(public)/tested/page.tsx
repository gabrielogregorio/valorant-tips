'use client';

import { PageContainer } from '@/atoms/PageContainer';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import { PostsServiceType, useFetchStablePosts } from '@/shared/hooks/useFetchPosts';
import { PostCard } from '@Features/posts/PostCard';
import { useTestedPost } from '@/shared/hooks/useTestedPost';
import { Skeleton } from '@/molecules/Skeleton';

export default function Page() {
  const { testedIds } = useTestedPost();
  const { posts, isLoading, error } = useFetchStablePosts({});

  if (isLoading) {
    return (
      <PageContainer>
        <TitleAndSubtitle key="" subtitle="" title="As melhores dicas Testadas de Valorant" />
        <div className="grid grid-cols-1 gap-6 w-full">
          <Skeleton className="w-full h-size-inputs rounded-xl" />
          <Skeleton className="w-full h-size-inputs rounded-xl" />
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  const filteredPosts = posts?.filter((post) => testedIds.includes(post.id)) || [];

  if (testedIds.length === 0 || filteredPosts.length === 0) {
    return (
      <PageContainer>
        <TitleAndSubtitle key="" subtitle="" title="As melhores dicas Testadas de Valorant" />
        <div className="flex flex-col items-center justify-center p-8 text-center text-content-fg-subcontent">
          Você ainda não testou nenhuma dica. Explore os mapas e agentes!
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <TitleAndSubtitle key="" subtitle="" title="As melhores dicas Testadas de Valorant" />
      <div className="grid grid-cols-1 gap-6">
        {filteredPosts.map((post: PostsServiceType) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </PageContainer>
  );
}
