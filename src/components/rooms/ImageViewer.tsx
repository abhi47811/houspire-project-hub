import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Maximize2,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper function to resolve storage path to signed URL
async function resolveImageUrl(storagePath: string): Promise<string | null> {
  if (!storagePath) return null;
  
  // If already a full URL, return as-is
  if (storagePath.startsWith('http://') || storagePath.startsWith('https://')) {
    return storagePath;
  }
  
  // Generate signed URL from storage path
  const { data, error } = await supabase.storage
    .from('room-images')
    .createSignedUrl(storagePath, 3600); // 1 hour expiry
  
  if (error) {
    console.error('Failed to create signed URL:', error);
    return null;
  }
  
  return data?.signedUrl || null;
}

interface RoomImage {
  id: string;
  room_id: string;
  phase: number;
  image_type: string;
  resolution: string;
  storage_path: string;
  file_name: string;
  file_size: number | null;
  created_at: string;
  signedUrl?: string | null;
}

interface ImageViewerProps {
  roomId: string;
  phase: number;
  imageType?: string;
  showControls?: boolean;
  className?: string;
}

export const ImageViewer = React.forwardRef<HTMLDivElement, ImageViewerProps>(
  function ImageViewer({
    roomId,
    phase,
    imageType = 'original',
    showControls = true,
    className,
  }, ref) {
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: image, isLoading } = useQuery({
    queryKey: ['room-images', roomId, phase, imageType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_images')
        .select('*')
        .eq('room_id', roomId)
        .eq('phase', phase)
        .eq('image_type', imageType)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      
      // Resolve signed URL
      const signedUrl = await resolveImageUrl(data.storage_path);
      return { ...data, signedUrl } as RoomImage;
    },
  });

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setZoom(1);

  const handleDownload = async () => {
    if (!image?.signedUrl) return;
    
    try {
      const response = await fetch(image.signedUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = image.file_name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (isLoading) {
    return (
      <Skeleton className={cn('aspect-square rounded-lg', className)} />
    );
  }

  if (!image || !image.signedUrl || imageError) {
    return (
      <div
        className={cn(
          'aspect-square rounded-lg bg-muted flex flex-col items-center justify-center gap-2',
          className
        )}
      >
        <div className="h-12 w-12 rounded-full bg-muted-foreground/10 flex items-center justify-center">
          <Maximize2 className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          {imageError ? 'Failed to load image' : 'No image available'}
        </p>
        {image && imageError && (
          <p className="text-xs text-muted-foreground/70 max-w-[200px] truncate">
            {image.file_name}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative rounded-lg overflow-hidden bg-muted group',
        isFullscreen && 'fixed inset-0 z-50 rounded-none',
        className
      )}
    >
      {/* Image Container */}
      <div
        className={cn(
          'w-full h-full overflow-auto',
          isFullscreen ? 'flex items-center justify-center' : 'aspect-square'
        )}
      >
        <img
          src={image.signedUrl}
          alt={`Phase ${phase} - ${imageType}`}
          className="object-contain transition-transform duration-200"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center',
            maxWidth: isFullscreen ? '100vw' : '100%',
            maxHeight: isFullscreen ? '100vh' : '100%',
          }}
          onError={() => setImageError(true)}
        />
      </div>

      {/* Controls Overlay */}
      {showControls && (
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent',
            'opacity-0 group-hover:opacity-100 transition-opacity'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-white text-sm px-2 min-w-[4rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={handleReset}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Resolution Badge */}
      <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/50 text-white text-xs">
        {image.resolution}
      </div>
    </div>
  );
});

ImageViewer.displayName = 'ImageViewer';

// Before/After Comparison Slider
interface BeforeAfterSliderProps {
  roomId: string;
  beforePhase: number;
  afterPhase: number;
  beforeType?: string;
  afterType?: string;
  className?: string;
}

export function BeforeAfterSlider({
  roomId,
  beforePhase,
  afterPhase,
  beforeType = 'original',
  afterType = 'original',
  className,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const { data: beforeImage, isLoading: isLoadingBefore } = useQuery({
    queryKey: ['room-images', roomId, beforePhase, beforeType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_images')
        .select('*')
        .eq('room_id', roomId)
        .eq('phase', beforePhase)
        .eq('image_type', beforeType)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      
      const signedUrl = await resolveImageUrl(data.storage_path);
      return { ...data, signedUrl } as RoomImage;
    },
  });

  const { data: afterImage, isLoading: isLoadingAfter } = useQuery({
    queryKey: ['room-images', roomId, afterPhase, afterType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_images')
        .select('*')
        .eq('room_id', roomId)
        .eq('phase', afterPhase)
        .eq('image_type', afterType)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      
      const signedUrl = await resolveImageUrl(data.storage_path);
      return { ...data, signedUrl } as RoomImage;
    },
  });

  if (isLoadingBefore || isLoadingAfter) {
    return <Skeleton className={cn('aspect-square rounded-lg', className)} />;
  }

  if (!beforeImage?.signedUrl || !afterImage?.signedUrl) {
    return (
      <div
        className={cn(
          'aspect-square rounded-lg bg-muted flex items-center justify-center',
          className
        )}
      >
        <p className="text-sm text-muted-foreground">
          Both images required for comparison
        </p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="relative aspect-square rounded-lg overflow-hidden">
        {/* After Image (Background) */}
        <img
          src={afterImage.signedUrl}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage.signedUrl}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${100 / (sliderPosition / 100)}%` }}
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/50 text-white text-xs">
          Before
        </div>
        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/50 text-white text-xs">
          After
        </div>
      </div>

      {/* Slider Control */}
      <Slider
        value={[sliderPosition]}
        onValueChange={([value]) => setSliderPosition(value)}
        min={0}
        max={100}
        step={1}
        className="w-full"
      />
    </div>
  );
}
