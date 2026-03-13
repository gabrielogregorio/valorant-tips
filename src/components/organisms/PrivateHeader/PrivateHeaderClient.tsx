// src/components/Organisms/PrivateHeader/PrivateHeaderClient.tsx
'use client';
import { useRouter } from 'next/navigation';
import { PrivateHeader } from './index';
import { RouteScreensEnum } from '@/shared/@types/routeScreenEnum';
import { api } from '@/libs/api';

type Props = { user: { name: string; avatarUrl?: string } };

export const PrivateHeaderClient = ({ user }: Props) => {
  const router = useRouter();

  const handleLogout = async () => {
    await api.post('/api/auth/logout');
    router.push('/login');
  };

  return (
    <PrivateHeader user={user} onEditProfile={() => router.push(RouteScreensEnum.profile)} onLogout={handleLogout} />
  );
};
