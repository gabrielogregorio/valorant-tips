'use client';

import { CreateOrEditPost } from '@Features/posts/CreateOrEditPost';

export default function AdminCreatePostPage() {
  return (
    <div className="max-w-content-desktop mx-auto py-8">
      <CreateOrEditPost />
    </div>
  );
}
