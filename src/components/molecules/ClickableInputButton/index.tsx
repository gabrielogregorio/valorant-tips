import { Icons } from '@/atoms/Icons';
import { tailwindMerge } from '@/libs/mergeClasses';
import { Button } from '../Button';

type Props = {
  className?: string;
  icon: keyof typeof Icons;
  ariaLabel: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const ClickableInputButton = ({
  className = '',
  icon,
  ariaLabel,
  onClick = () => {},
  disabled = false,
}: Props) => {
  const Icon = Icons[icon];
  return (
    <Button
      variant={'text'}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      type="button"
      className={tailwindMerge(
        'p-1 text-content-fg-subcontent hover:text-content-fg transition-colors duration-150',
        className,
      )}
      leftIcon={<Icon />}
    />
  );
};
