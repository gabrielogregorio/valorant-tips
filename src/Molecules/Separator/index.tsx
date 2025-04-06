import { mergeClasses } from '../../libs/mergeClasses';

interface Props {
  className?: string;
}

export const Separator = ({ className = '' }: Props) => (
  <hr data-testid="separator" className={mergeClasses('border-border-soft', className)} />
);
