import { tailwindMerge } from '@/libs/mergeClasses';

interface Props {
  className?: string;
}

export const Skeleton = ({ className = '' }: Props) => (
  <div className={tailwindMerge('bg-content-bg-disabled animate-pulseIn300 w-55 h-46', className)} />
);
