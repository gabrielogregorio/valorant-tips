'use client';

import { AdminPageContainer } from '@/atoms/AdminPageContainer';
import { ManageData } from '@/organisms/ManagerData';

export default function AdminDataPage() {
  return (
    <AdminPageContainer innerClassName=" max-w-[800px]">
      <ManageData />
    </AdminPageContainer>
  );
}
