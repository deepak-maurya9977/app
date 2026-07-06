import type { CSSProperties, ImgHTMLAttributes } from 'react';

export type OptimizedImageFamily =
  | 'marketplace-amazon'
  | 'marketplace-flipkart'
  | 'marketplace-meesho'
  | 'marketplace-jiomart'
  | 'creative'
  | 'operations'
  | 'marketing'
  | 'web'
  | 'hero'
  | 'gallery'
  | 'team'
  | 'icon';

export interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> {
  src: string;
  alt: string;
  aspectRatio?: number;
  priority?: boolean;
  family?: OptimizedImageFamily;
  accentColor?: string;
  sizes?: string;
}

const joinClassNames = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

export function OptimizedImage({
  src,
  alt,
  aspectRatio,
  priority = false,
  family,
  accentColor,
  sizes = '(max-width: 768px) 100vw, 768px',
  loading,
  className,
  style,
  ...props
}: OptimizedImageProps) {
  if (!alt) {
    throw new Error('OptimizedImage: alt text is required for accessibility and SEO.');
  }

  const imageLoading = priority ? 'eager' : loading ?? 'lazy';
  const wrapperStyle: CSSProperties & { [key: string]: string | number | undefined } = {
    aspectRatio: aspectRatio ?? undefined,
    '--optimised-image-accent': accentColor || undefined,
    ...style,
  };

  return (
    <div
      className={joinClassNames(
        'overflow-hidden',
        'rounded-xl',
        'bg-surface',
        family ? `image-family-${family}` : undefined,
        className,
      )}
      style={wrapperStyle}
      data-image-family={family}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading={imageLoading}
        decoding="async"
        sizes={sizes}
        style={accentColor ? { boxShadow: `0 0 0 1px ${accentColor}` } : undefined}
        {...props}
      />
    </div>
  );
}
