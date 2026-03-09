'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Text, TextAsEnum, TextVariantEnum } from '@/atoms/Text';
import { tailwindMerge } from '@/libs/mergeClasses';
import { RouteScreensEnum } from '@/shared/@types/routeScreenEnum';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const getVariantStyles = (active: boolean) => {
  if (active) {
    return { styles: 'font-bold', variant: TextVariantEnum.h2Highlight };
  }

  return { styles: '', variant: TextVariantEnum.text };
};

const NavItemDesktop = ({ active, text, href }: { active: boolean; text: string; href: string }) => {
  const variantStyles = useMemo(() => getVariantStyles(active), [active]);

  return (
    <Link
      href={href}
      className={tailwindMerge(`relative px-1 py-1 whitespace-nowrap text-content-fg-contrast hover:opacity-80 transition-opacity`, variantStyles.styles)}
      aria-current={active ? 'page' : undefined}>
      <Text className="text-content-fg-contrast text-base" variant={variantStyles.variant}>
        {text}
      </Text>
      {active && (
        <motion.div
          layoutId="desktop-nav-underline"
          className="absolute left-0 right-0 -bottom-1 h-0.5 bg-content-fg-contrast rounded-full"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
};

const NavItemMobile = ({ active, text, href, onClick }: { active: boolean; text: string; href: string, onClick?: () => void }) => {
  const variantStyles = useMemo(() => getVariantStyles(active), [active]);

  return (
    <Link
      href={href}
      className={tailwindMerge(
        `block w-full text-center py-4 px-6 whitespace-nowrap text-content-fg-contrast transition-colors active:bg-neutral-800/50`,
        active ? 'bg-neutral-800/30' : '',
        variantStyles.styles
      )}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}>
      <Text className="text-content-fg-contrast text-base" variant={variantStyles.variant}>
        {text}
      </Text>
    </Link>
  );
};

export const PublicHeader = () => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-content-bg shadow-md">
      <div className="flex items-center justify-between min-h-20 px-6 py-4 md:px-8 w-full max-w-content-desktop mx-auto transition-all duration-300 relative">
        <Link href={RouteScreensEnum.root} onClick={handleCloseMenu} className="hover:scale-[1.02] transition-transform duration-300">
          <Text
            variant={TextVariantEnum['h1']}
            as={TextAsEnum.span}
            className="w-full text-content-fg-contrast font-bold text-xl md:text-2xl tracking-tight">
            VALORANT TIPS
          </Text>
        </Link>

        <button
          className="md:hidden p-2 text-content-fg-contrast hover:opacity-80 transition-opacity cursor-pointer"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Fechar Menu Principal' : 'Abrir Menu Principal'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        <nav aria-label="Menu Principal" className="hidden md:flex gap-8 items-center">
          <NavItemDesktop active={path === RouteScreensEnum.root} href={RouteScreensEnum.root} text="INICIO" />
          <NavItemDesktop active={path === RouteScreensEnum.saved} href={RouteScreensEnum.saved} text="SALVOS" />
          <NavItemDesktop active={path === RouteScreensEnum.tested} href={RouteScreensEnum.tested} text="TESTADOS" />
        </nav>

        <div
          className={tailwindMerge(
            "absolute top-full left-0 right-0 pb-4 bg-content-bg shadow-xl border-t border-neutral-800 transition-all duration-300 origin-top flex flex-col md:hidden",
            isMenuOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible pointer-events-none"
          )}
        >
          <nav aria-label="Menu Mobile" className="flex flex-col w-full">
            <NavItemMobile active={path === RouteScreensEnum.root} href={RouteScreensEnum.root} text="INICIO" onClick={handleCloseMenu} />
            <NavItemMobile active={path === RouteScreensEnum.saved} href={RouteScreensEnum.saved} text="SALVOS" onClick={handleCloseMenu} />
            <NavItemMobile active={path === RouteScreensEnum.tested} href={RouteScreensEnum.tested} text="TESTADOS" onClick={handleCloseMenu} />
          </nav>
        </div>
      </div>
    </header>
  );
};
