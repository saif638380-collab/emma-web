import React, { useState } from 'react';
import { Camera } from 'lucide-react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  aspectRatio?: 'auto' | '1:1' | '4:3' | '3:4' | '16:9' | '3:2' | '2:3';
  className?: string;
  containerClassName?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fill = false,
  priority = false,
  aspectRatio = 'auto',
  className = '',
  containerClassName = '',
  onClick,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case '1:1': return 'aspect-square';
      case '4:3': return 'aspect-[4/3]';
      case '3:4': return 'aspect-[3/4]';
      case '16:9': return 'aspect-[16/9]';
      case '3:2': return 'aspect-[3/2]';
      case '2:3': return 'aspect-[2/3]';
      default: return '';
    }
  };

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-400 p-6 ${getAspectClass()} ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <Camera className="w-8 h-8 stroke-[1.2] mb-2 opacity-50 text-stone-500" />
        <span className="text-xs text-center text-stone-500 max-w-xs line-clamp-2">
          {alt || 'Visual frame unavailable'}
        </span>
      </div>
    );
  }

  const containerClasses = fill
    ? `relative w-full h-full overflow-hidden ${containerClassName}`
    : `relative overflow-hidden ${getAspectClass()} ${containerClassName}`;

  const imageClasses = `
    transition-opacity duration-500 ease-out
    ${isLoaded ? 'opacity-100' : 'opacity-0'}
    ${fill ? 'absolute inset-0 w-full h-full object-cover' : 'w-full h-full object-cover'}
    ${className}
  `.trim();

  return (
    <div className={containerClasses} onClick={onClick}>
      {/* Subtle skeleton shimmer during load */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200/60 dark:bg-stone-800/60 animate-pulse pointer-events-none" />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={imageClasses}
        {...props}
      />
    </div>
  );
};
