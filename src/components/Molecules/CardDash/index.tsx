import { tailwindMerge } from '@/libs/mergeClasses';
import { Text, TextVariantEnum } from '@/Atoms/Text';

interface CardDashProps {
  title: string;
  value: string | number;
  className?: string;
}

export const CardDash = ({ className = '', title, value }: CardDashProps) => (
  <div
    data-testid="card-dash"
    className={tailwindMerge(
      'text-content-fg-contrast bg-accent-radiant flex flex-col items-center py-sm px-sm gap-lg min-w-40 rounded-sm',
      className,
    )}>
    <Text variant={TextVariantEnum.subtext}>{title}</Text>
    <Text variant={TextVariantEnum['9xl']}>{value}</Text>
  </div>
);
