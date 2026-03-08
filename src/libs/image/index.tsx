import { ImageLoader } from 'next/dist/client/image-component';
import { PlaceholderValue, StaticImport } from 'next/dist/shared/lib/get-img-props';
import ImageComponent from 'next/image';
import { NEXT_PUBLIC_MODE_RUN } from '@/shared/envs';

interface ImageProps {
  src: string | StaticImport;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  loader?: ImageLoader;
  quality?: number | `${number}`;
  priority?: boolean;
  loading?: 'eager' | 'lazy' | undefined;
  placeholder?: PlaceholderValue;
  blurDataURL?: string;
  draggable?: boolean;
  ariaLabel?: string;
  className?: string;
  unoptimized?: boolean;
}

export const Image = ({ src, ariaLabel, ...props }: ImageProps) => {
  return (
    <ImageComponent
      aria-label={ariaLabel}
      unoptimized={NEXT_PUBLIC_MODE_RUN === 'DEVELOP'}
      src={src}
      {...props}
    />
  );
};
