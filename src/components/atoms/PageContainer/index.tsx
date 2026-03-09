import { ReactNode } from 'react';
import { tailwindMerge } from '@/libs/mergeClasses';

export const PageContainer = ({
  children,
  className = '',
  innerClassName = '',
}: {
  children?: ReactNode;
  className?: string;
  innerClassName?: string;
}) => {
  return (
    <div className={tailwindMerge('mt-5xl flex items-start justify-center animate-fadeIn300 flex-1', className)}>
      <div
        className={tailwindMerge(
          'flex flex-col max-w-content-desktop w-full px-3xl py-3xl gap-3xl bg-content-bg border border-neutral-800 shadow-md rounded-sm',
          innerClassName,
        )}>
        {children}
      </div>
    </div>
  );
};
