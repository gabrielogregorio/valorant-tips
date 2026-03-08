import { Text } from '../../Atoms/Text';
import { tailwindMerge } from '../../../libs/mergeClasses';

type Props = {
  text?: string;
  className?: string;
};

export const LoadingMessage = ({ text = undefined, className = '' }: Props) => (
  <div
    role="alert"
    className={tailwindMerge(
      'text-content-fg-contrast py-lg px-xl rounded-sm flex gap-md bg-secondary-soft w-full',
      className,
    )}>
    <Text>{text}</Text>
  </div>
);
