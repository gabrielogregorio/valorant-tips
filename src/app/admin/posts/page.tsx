'use client';

import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import { Loader2, AlertCircle } from 'lucide-react';
import { PostsServiceType, useFetchPosts } from '@/shared/hooks/useFetchPosts';
import { PostCard } from '@/features/posts/PostCard';
import { AdminPageContainer } from '@/atoms/AdminPageContainer';

const PostScreen = () => {
  const { posts, isLoading, reload, error } = useFetchPosts();

  if (isLoading) {
    return (
      <AdminPageContainer innerClassName=" max-w-[800px]">
        <div className="flex justify-center py-20">
          <Loader2 size={28} className="animate-spin" />
        </div>
      </AdminPageContainer>
    );
  }

  if (error) {
    return (
      <AdminPageContainer innerClassName=" max-w-[800px]">
        <div className="flex items-center gap-2 p-4 bg-feedback-error-soft text-feedback-error-soft rounded-sm">
          <AlertCircle size={18} />
          {(error as Error).message}
          <button type="button" onClick={() => reload()}>
            recarregar
          </button>
        </div>
      </AdminPageContainer>
    );
  }

  if (!isLoading && (posts?.length === 0 || !posts)) {
    return <AdminPageContainer innerClassName=" max-w-[800px]">
      <div className="text-center py-20 text-content-fg-subcontent">Nenhum post encontrado</div>
    </AdminPageContainer>
  }

  return (
    <AdminPageContainer innerClassName=" max-w-[800px]">
      <TitleAndSubtitle title="Posts" subtitle="Gerencie todos os posts da plataforma" />

      <div className="grid grid-cols-1 gap-6">
        {posts?.map?.((post: PostsServiceType) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </AdminPageContainer>
  );
};

export default PostScreen;
