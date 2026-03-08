'use client';
import Image from 'next/image';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type ProfileMenuProps = {
  name: string;
  avatarUrl?: string;
  onEditProfile: () => void;
  onLogout: () => void;
};

export const ProfileMenu = ({ name, avatarUrl, onEditProfile, onLogout }: ProfileMenuProps) => {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Menu do perfil"
          className="flex items-center gap-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-content-fg-contrast rounded-full">
          {/* Avatar */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-accent-radiant border-2 border-content-fg-contrast flex items-center justify-center shrink-0">
            {avatarUrl ? (
              <Image src={avatarUrl} alt={name} fill className="object-cover" />
            ) : (
              <span className="text-content-fg-contrast font-bold text-sm select-none">{initials}</span>
            )}
          </div>

          {/* Nome + chevron */}
          <span className="hidden desktop:flex items-center gap-xs text-content-fg-contrast font-semibold text-sm whitespace-nowrap">
            {name}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          align="end"
          className="z-50 min-w-[180px] rounded-xl bg-white shadow-lg border border-gray-100 p-xs animate-in fade-in-0 zoom-in-95">
          {/* Cabeçalho do dropdown */}
          <div className="px-sm py-xs border-b border-gray-100 mb-xs">
            <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
          </div>

          <DropdownMenu.Item
            onSelect={onEditProfile}
            className="flex items-center gap-sm px-sm py-xs rounded-lg text-sm text-gray-700 cursor-pointer outline-none hover:bg-gray-50 focus:bg-gray-50 transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Alterar dados
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-xs h-px bg-gray-100" />

          <DropdownMenu.Item
            onSelect={onLogout}
            className="flex items-center gap-sm px-sm py-xs rounded-lg text-sm text-red-600 cursor-pointer outline-none hover:bg-red-50 focus:bg-red-50 transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sair
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
