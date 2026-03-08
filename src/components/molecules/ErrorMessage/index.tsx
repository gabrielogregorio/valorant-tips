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
      'text-feedback-error-hard py-lg px-xl rounded-sm flex gap-md bg-feedback-error-soft w-full animate-fadeIn300',
      className,
    )}>
    <Icons.AlertOutline />
    <Text>{text}</Text>
  </div>
);
