// src/components/Organisms/PrivateHeader/PrivateHeaderClient.tsx
'use client';
import { useRouter } from 'next/navigation';
import { PrivateHeader } from './index';
import { RouteScreensEnum } from '@/shared/@types/routeScreenEnum';

type Props = { user: { name: string; avatarUrl?: string } };

export const PrivateHeaderClient = ({ user }: Props) => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <PrivateHeader user={user} onEditProfile={() => router.push(RouteScreensEnum.profile)} onLogout={handleLogout} />
  );
};
