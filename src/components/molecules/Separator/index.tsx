import { tailwindMerge } from '@/libs/mergeClasses';

interface Props {
  className?: string;
}

export const Separator = ({ className = '' }: Props) => (
  <hr data-testid="separator" className={tailwindMerge('border-border-soft', className)} />
);
