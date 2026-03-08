'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation'; // <<< import
import { Text, TextAsEnum, TextVariantEnum } from '@/atoms/Text';
import { tailwindMerge } from '@/libs/mergeClasses';
import { RouteScreensEnum } from '@/shared/@types/routeScreenEnum';
import { ProfileMenu } from '@/molecules/ProfileMenu';

const getVariantStyles = (active: boolean) => {
  if (active) {
    return { styles: 'underline font-bold', variant: TextVariantEnum.h2Highlight };
  }

  return { styles: '', variant: TextVariantEnum.h2 };
};

const NavItem = ({ active = false, text, href }: { active?: boolean; text: string; href: string }) => {
  const variantStyles = useMemo(() => getVariantStyles(active), [active]);

  return (
    <Link
      href={href}
      className={tailwindMerge(`whitespace-nowrap text-content-fg-contrast`, variantStyles.styles)}
      aria-selected={active}>
      <Text className="text-content-fg-contrast" variant={variantStyles.variant}>
        {text}
      </Text>
    </Link>
  );
};

type PrivateHeaderProps = {
  user: {
    name: string;
    avatarUrl?: string;
  };
  onEditProfile: () => void;
  onLogout: () => void;
};

export const PrivateHeader = ({ user, onEditProfile, onLogout }: PrivateHeaderProps) => {
  const pathname = usePathname() || '/'; // rota actual

  const isActive = (href: string) => {
    // compara prefixo para lidar com sub‑rotas
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="bg-accent-radiant flex text-center desktop:text-left items-center justify-between flex-col desktop:flex-row min-h-[96px] gap-7xl desktop:gap-0 px-lg py-lg desktop:px-6xl desktop:py-6xl w-full">
      <Link href={RouteScreensEnum.root}>
        <Text variant={TextVariantEnum['6xl']} as={TextAsEnum.span} className="w-full text-content-fg-contrast">
          VALORANT TIPS
        </Text>
      </Link>
      <nav aria-label="Menu Principal" className="flex gap-3xl flex-col desktop:flex-row">
        <NavItem active={isActive(RouteScreensEnum.dashboard)} href={RouteScreensEnum.dashboard} text="DASHBOARD" />
        <NavItem active={isActive(RouteScreensEnum.posts)} href={RouteScreensEnum.posts} text="POSTS" />
        <NavItem active={isActive(RouteScreensEnum.data)} href={RouteScreensEnum.data} text="DADOS" />
        <NavItem active={isActive(RouteScreensEnum.createPost)} href={RouteScreensEnum.createPost} text="CRIAR POSTS" />
        <NavItem active={isActive(RouteScreensEnum.suggestions)} href={RouteScreensEnum.suggestions} text="SUGESTÕES" />
        <NavItem active={isActive(RouteScreensEnum.profile)} href={RouteScreensEnum.profile} text="PERFIL" />
        {/* ProfileMenu substitui o NavItem de PERFIL */}
        {/* <ProfileMenu
          name={user.name}
          avatarUrl={user.avatarUrl}
          onEditProfile={onEditProfile}
          onLogout={onLogout}
        /> */}
      </nav>
    </header>
  );
};
