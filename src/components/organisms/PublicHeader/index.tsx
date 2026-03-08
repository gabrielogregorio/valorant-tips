'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Text, TextAsEnum, TextVariantEnum } from '@/atoms/Text';
import { tailwindMerge } from '@/libs/mergeClasses';
import { RouteScreensEnum } from '@/shared/@types/routeScreenEnum';
import { usePathname } from 'next/navigation';
import Breadcrumb from '@/molecules/Breadcrumb';

const getVariantStyles = (active: boolean) => {
  if (active) {
    return { styles: 'underline font-bold', variant: TextVariantEnum.h2Highlight };
  }

  return { styles: '', variant: TextVariantEnum.h2 };
};

const NavItem = ({ active, text, href }: { active: boolean; text: string; href: string }) => {
  const variantStyles = useMemo(() => getVariantStyles(active), [active]);

  return (
    <Link
      href={href}
      className={tailwindMerge(`whitespace-nowrap text-content-fg-contrast`, variantStyles.styles)}
      aria-current={active ? 'page' : undefined}>
      <Text className="text-content-fg-contrast" variant={variantStyles.variant}>
        {text}
      </Text>
    </Link>
  );
};

const getBreadcrumbEntries = (path: string) => {
  if (path.startsWith(RouteScreensEnum.publicPosts)) {
    return [
      { label: 'Início', href: RouteScreensEnum.root },
      { label: 'Mapas' },
      { label: 'Agentes' },
      { label: 'Dicas' },
    ];
  }

  if (path.startsWith(RouteScreensEnum.publicMaps)) {
    return [{ label: 'Início', href: RouteScreensEnum.root }, { label: 'Mapas' }, { label: 'Agentes' }];
  }

  // this is last case
  if (path.startsWith(RouteScreensEnum.root)) {
    return [{ label: 'Início', href: RouteScreensEnum.root }, { label: 'Mapas' }];
  }

  return [];
};

export const PublicHeader = () => {
  const path = usePathname();
  const breadcrumbEntries = useMemo(() => getBreadcrumbEntries(path), [path]);
  return (
    <div>
      <header className="bg-content-bg flex text-center desktop:text-left items-center justify-between flex-col desktop:flex-row min-h-24 gap-7xl desktop:gap-0 px-lg py-lg desktop:px-6xl desktop:py-6xl w-full">
        <Link href={RouteScreensEnum.root}>
          <Text
            variant={TextVariantEnum['h1']}
            as={TextAsEnum.span}
            className="w-full text-content-fg-contrast font-bold">
            VALORANT TIPS
          </Text>
        </Link>
        <nav aria-label="Menu Principal" className="flex gap-3xl flex-col desktop:flex-row">
          <NavItem active={path === RouteScreensEnum.root} href={RouteScreensEnum.root} text="INICIO" />
          <NavItem active={path === RouteScreensEnum.saved} href={RouteScreensEnum.saved} text="SALVOS" />
          <NavItem active={path === RouteScreensEnum.tested} href={RouteScreensEnum.tested} text="TESTADOS" />
        </nav>
      </header>

      <Breadcrumb entries={breadcrumbEntries} />
    </div>
  );
};
