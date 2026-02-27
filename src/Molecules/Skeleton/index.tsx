import { mergeClasses } from '../../libs/mergeClasses';

interface Props {
  className?: string;
}

export const Skeleton = ({ className = '' }: Props) => (
  <div className={mergeClasses('bg-content-bg-disabled animate-pulseIn300 w-55 h-46', className)} />
);
