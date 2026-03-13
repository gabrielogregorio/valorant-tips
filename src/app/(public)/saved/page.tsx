'use client';

import { PageContainer } from '@/atoms/PageContainer';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import { PostsServiceType, useFetchStablePosts } from '@/shared/hooks/useFetchPosts';
import { PostCard } from '@Features/posts/PostCard';

import { useSavedPost } from '@/shared/hooks/useSavedPost';

import { Skeleton } from '@/molecules/Skeleton';

export default function Page() {
  const { savedIds } = useSavedPost();
  const { posts, isLoading, error } = useFetchStablePosts({});

  if (isLoading) {
    return (
      <PageContainer>
        <TitleAndSubtitle key="" subtitle="" title="As melhores dicas Salvas de Valorant" />
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

  const filteredPosts = posts?.filter((post) => savedIds.includes(post.id)) || [];

  if (savedIds.length === 0 || filteredPosts.length === 0) {
    return (
      <PageContainer>
        <TitleAndSubtitle key="" subtitle="" title="As melhores dicas Salvas de Valorant" />
        <div className="flex flex-col items-center justify-center p-8 text-center text-content-fg-subcontent">
          Você ainda não salvou nenhuma dica. Favorite alguma estratégia para revê-la depois!
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <TitleAndSubtitle key="" subtitle="" title="As melhores dicas Salvas de Valorant" />
      <div className="grid grid-cols-1 gap-6">
        {filteredPosts.map((post: PostsServiceType) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </PageContainer>
  );
}
