import { Icons } from '@/atoms/Icons';
import { Text } from '@/atoms/Text';
import { tailwindMerge } from '@/libs/mergeClasses';

type Props = {
  text?: string;
  className?: string;
};

export const ErrorMessage = ({ text = undefined, className = '' }: Props) => (
  <div
    role="alert"
    className={tailwindMerge(
      'flex w-full items-center gap-3 rounded-xl border border-feedback-error-hard/30 bg-feedback-error-hard/10 px-4 py-3 animate-fadeIn300',
      className,
    )}>
    <Icons.AlertOutline className="h-5 w-5 shrink-0 text-feedback-error-soft" />
    <Text className="text-sm font-medium text-feedback-error-soft">{text}</Text>
  </div>
);
