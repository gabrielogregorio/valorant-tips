import { ReactNode } from 'react';
import { mergeClasses } from '../../libs/mergeClasses';

type TagProps = {
  disabled?: boolean;
  children?: ReactNode;
  active?: boolean;
};
export const Tag = ({ disabled = false, children, active = false }: TagProps) => (
  <button
    type="button"
    disabled={disabled}
    className={mergeClasses(
      `py-xs px-sm border rounded-sm hover:border-primary disabled:border-content-fg-disabled disabled:bg-content-bg-disabled disabled:line-through`,
      active ? 'border-primary bg-primary text-content-fg-contrast' : 'text-content-fg border-content-fg',
    )}>
    {children}
  </button>
);
