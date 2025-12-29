import { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  skeletonClassName?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  fallback = '/placeholder.svg',
  skeletonClassName 
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!imgRef.current || !src) return;

    // Create intersection observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observerRef.current?.disconnect();
          }
        });
      },
      { 
        rootMargin: '100px', // Start loading 100px before visible
        threshold: 0.01 
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [src]);

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [imageSrc]);

  // Show skeleton while loading
  if (isLoading && !imageSrc) {
    return (
      <div ref={imgRef} className={cn('relative', className)}>
        <Skeleton className={cn('w-full h-full', skeletonClassName)} />
      </div>
    );
  }

  // Show skeleton while image is downloading
  if (isLoading && imageSrc) {
    return (
      <div ref={imgRef} className={cn('relative', className)}>
        <Skeleton className={cn('w-full h-full absolute inset-0', skeletonClassName)} />
        <img
          src={imageSrc}
          alt={alt}
          className={cn('opacity-0', className)}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <img
      src={hasError ? fallback : (imageSrc || fallback)}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        if (!hasError && fallback) {
          setHasError(true);
          (e.target as HTMLImageElement).src = fallback;
        }
      }}
    />
  );
}

// Hook for manual lazy image loading
export function useLazyImage(src: string) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!imgRef.current || !src) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [imageSrc]);

  return { imgRef, imageSrc, isLoading, hasError };
}
