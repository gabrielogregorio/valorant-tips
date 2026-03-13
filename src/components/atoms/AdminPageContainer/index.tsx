import { ReactNode } from 'react';
import { tailwindMerge } from '@/libs/mergeClasses';

export const AdminPageContainer = ({
  children,
  className = '',
  innerClassName = '',
}: {
  children?: ReactNode;
  className?: string;
  innerClassName?: string;
}) => {
  return (
    <div
      className={tailwindMerge(
        'flex flex-col items-center justify-start w-full animate-fadeIn300 py-8 px-4',
        className,
      )}>
      <div
        className={tailwindMerge(
          'flex flex-col w-full bg-content-bg/50 border border-neutral-800/80 shadow-md rounded-xl p-6 md:p-8 backdrop-blur-sm gap-6',
          innerClassName,
        )}>
        {children}
      </div>
    </div>
  );
};
