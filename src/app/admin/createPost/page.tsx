'use client';

import { AdminPageContainer } from '@/atoms/AdminPageContainer';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import { CreateOrEditPost } from '@Features/posts/CreateOrEditPost';

export default function AdminCreatePostPage() {
  return (
    <AdminPageContainer innerClassName=" max-w-[600px]">
      <TitleAndSubtitle title="Criar um novo post" />
      <CreateOrEditPost />
    </AdminPageContainer>
  );
}
