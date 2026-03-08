import { Text } from '@/atoms/Text';
import { tailwindMerge } from '@/libs/mergeClasses';

type Props = {
  text?: string;
  className?: string;
};

export const SuccessMessage = ({ text = undefined, className = '' }: Props) => (
  <div
    role="alert"
    className={tailwindMerge(
      'text-feedback-success-hard py-lg px-xl rounded-sm flex gap-md bg-feedback-success-soft w-full',
      className,
    )}>
    <Text>{text}</Text>
  </div>
);
