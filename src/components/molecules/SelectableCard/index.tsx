import { Image } from '@/libs/image';
import { tailwindMerge } from '@/libs/mergeClasses';

interface SelectableCardProps {
  image: string;
  name: string;
  isSelected?: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const SelectableCard = ({ image, name, isSelected = false, onClick, size = 'md' }: SelectableCardProps) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={tailwindMerge(
        'relative rounded-lg overflow-hidden border-2 transition-all',
        sizeClasses[size],
        isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-300',
      )}>
      <Image src={image} alt={name} className="object-cover" width={100} height={100} />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
        {name}
      </div>
    </button>
  );
};
