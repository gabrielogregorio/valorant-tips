'use client';

import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import { Loader2, AlertCircle } from 'lucide-react';
import { PostsServiceType, useFetchPosts } from '@/shared/hooks/useFetchPosts';
import { PostCard } from '@/features/posts/PostCard';

const PostScreen = () => {
  const { posts, isLoading, reload, error } = useFetchPosts();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={28} className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-4 bg-feedback-error-soft text-feedback-error-hard rounded-sm">
        <AlertCircle size={18} />
        {(error as Error).message}
        <button type="button" onClick={() => reload()}>
          recarregar
        </button>
      </div>
    );
  }

  if (!isLoading && (posts?.length === 0 || !posts)) {
    return <div className="text-center py-20 text-content-fg-subcontent">{JSON.stringify(posts)}</div>;
  }

  return (
    <div className="max-w-content-desktop mx-auto space-y-8">
      <TitleAndSubtitle title="Posts" subtitle="Gerencie todos os posts da plataforma" />

      <div className="grid grid-cols-1 gap-6">
        {posts?.map?.((post: PostsServiceType) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostScreen;
