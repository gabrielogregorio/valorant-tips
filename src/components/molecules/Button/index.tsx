import { ButtonHTMLAttributes, ReactNode } from 'react';
import { tailwindMerge } from '@/libs/mergeClasses';
import { Text, TextVariantEnum } from '@/atoms/Text';

export type ButtonVariantEnum = 'primary' | 'secondary' | 'text';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantEnum;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
}

const variantStyles: { [key in ButtonVariantEnum]: string } = {
  ['primary']:
    'bg-primary px-lg py-sm gap-xs rounded-sm min-h-6xl text-content-fg-contrast disabled:text-content-fg-disabled disabled:bg-content-bg-disabled enabled:active:scale-95 active:bg-primary-hard hover:bg-primary-hard transition-all duration-150',
  ['secondary']:
    'bg-secondary px-lg py-sm gap-xs rounded-sm min-h-6xl text-content-fg-contrast disabled:text-content-fg-disabled disabled:bg-content-bg-disabled enabled:active:scale-95 active:bg-secondary-hard hover:bg-secondary-hard transition-all duration-150',
  ['text']:
    'px-lg py-sm gap-xs rounded-sm min-h-6xl text-content-fg disabled:text-content-fg-disabled enabled:active:scale-95 transition-all duration-150',
};

export const Button = ({
  className = '',
  children,
  variant = 'primary',
  leftIcon,
  disabled,
  onClick,
  ariaLabel = '',
  rightIcon,
  type = 'button',
  ...rest
}: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={tailwindMerge(
      'touch-manipulation disable-pointer-events-for-children flex items-center justify-center select-none cursor-pointer disabled:cursor-not-allowed',
      variantStyles[variant],
      className,
    )}
    {...rest}>
    {leftIcon || undefined}
    {children ? <Text variant={TextVariantEnum.button}>{children}</Text> : undefined}
    {rightIcon || undefined}
  </button>
);
