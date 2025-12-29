import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import { Search, Filter, Star, MapPin, Sparkles, Pin, Upload, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { libraryService, LibraryImage } from '@/services/api/libraryService';
import { cn } from '@/lib/utils';

interface LibraryBrowserProps {
  roomType: string;
  designStyle: string;
  userCity: string;
  onSelect: (image: LibraryImage) => void;
  onUploadNew?: () => void;
}

interface Filters {
  sourceType: 'all' | 'user_upload' | 'houspire_generated';
  minQuality: number;
  city: 'all' | 'user_city';
  sortBy: 'best' | 'recent' | 'popular';
}

export function LibraryBrowser({
  roomType,
  designStyle,
  userCity,
  onSelect,
  onUploadNew
}: LibraryBrowserProps) {
  const [images, setImages] = useState<LibraryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<LibraryImage | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    sourceType: 'all',
    minQuality: 0,
    city: 'all',
    sortBy: 'best'
  });

  const loadImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const rankedImages = await libraryService.getRankedLibraryImages({
        roomType,
        designStyle,
        userCity,
        limit: 50,
        sourceType: filters.sourceType,
        minQuality: filters.minQuality
      });

      let filtered = [...rankedImages];

      // Filter by city
      if (filters.city === 'user_city') {
        filtered = filtered.filter(img => img.city === userCity);
      }

      // Sort
      if (filters.sortBy === 'recent') {
        filtered.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else if (filters.sortBy === 'popular') {
        filtered.sort((a, b) => b.times_selected - a.times_selected);
      }
      // 'best' is default - already sorted by ranking_score

      setImages(filtered);
    } catch (err) {
      console.error('Error loading library:', err);
      setError(err instanceof Error ? err.message : 'Failed to load library');
    } finally {
      setLoading(false);
    }
  }, [roomType, designStyle, userCity, filters]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const handleImageClick = (image: LibraryImage) => {
    setSelectedImage(image);
    libraryService.incrementViews(image.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Style Library</h2>
          <p className="text-muted-foreground">
            {roomType} • {designStyle} • {images.length} references
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={loadImages}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Source</label>
                <Select
                  value={filters.sourceType}
                  onValueChange={(value: Filters['sourceType']) => 
                    setFilters({ ...filters, sourceType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="houspire_generated">✨ Houspire Renders</SelectItem>
                    <SelectItem value="user_upload">📌 Reference Images</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Min Quality</label>
                <Select
                  value={filters.minQuality.toString()}
                  onValueChange={(value) => 
                    setFilters({ ...filters, minQuality: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">All Quality</SelectItem>
                    <SelectItem value="90">90%+ Premium</SelectItem>
                    <SelectItem value="85">85%+ Good</SelectItem>
                    <SelectItem value="80">80%+ Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Select
                  value={filters.city}
                  onValueChange={(value: Filters['city']) => 
                    setFilters({ ...filters, city: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="user_city">My City ({userCity})</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value: Filters['sortBy']) => 
                    setFilters({ ...filters, sortBy: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best">Best Performance</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Info */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Houspire Renders have verified quality</span>
        </div>
        <div className="flex items-center gap-1">
          <Pin className="h-4 w-4 text-purple-500" />
          <span>Reference Images are learning from usage</span>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardContent className="p-2 space-y-2">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-7 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="py-8 text-center">
            <p className="text-destructive font-medium mb-2">Error Loading Library</p>
            <p className="text-destructive/80 text-sm mb-4">{error}</p>
            <Button variant="destructive" onClick={loadImages}>
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && images.length === 0 && (
        <Card className="bg-muted/50">
          <CardContent className="py-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">No References Yet</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to add a reference for {roomType} • {designStyle}!
            </p>
            {onUploadNew && (
              <Button onClick={onUploadNew}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Reference Image
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Image Grid */}
      {!loading && !error && images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {images.map((image) => (
            <LibraryImageCard
              key={image.id}
              image={image}
              userCity={userCity}
              isSelected={selectedImage?.id === image.id}
              onSelect={() => handleImageClick(image)}
              onUse={() => onSelect(image)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// IMAGE CARD COMPONENT
// ============================================================================

interface LibraryImageCardProps {
  image: LibraryImage;
  userCity: string;
  isSelected: boolean;
  onSelect: () => void;
  onUse: () => void;
}

const LibraryImageCard = forwardRef<HTMLDivElement, LibraryImageCardProps>(
  function LibraryImageCard({ image, userCity, isSelected, onSelect, onUse }, ref) {
    const getPerformanceLabel = () => {
      if (image.times_selected === 0) return { label: 'New', color: 'bg-muted text-muted-foreground' };
      if (!image.approval_rate) return { label: 'New', color: 'bg-muted text-muted-foreground' };
      
      if (image.approval_rate >= 0.9) return { label: 'Excellent', color: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300' };
      if (image.approval_rate >= 0.8) return { label: 'Good', color: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300' };
      if (image.approval_rate >= 0.7) return { label: 'Fair', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300' };
      return { label: 'Poor', color: 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300' };
    };

    const performance = getPerformanceLabel();
    const isCityMatch = image.city === userCity;

    return (
      <Card
        ref={ref}
        className={cn(
          "overflow-hidden transition-all cursor-pointer hover:shadow-lg",
          isSelected && "ring-2 ring-primary"
        )}
        onClick={onSelect}
      >
        {/* Image */}
        <div className="relative aspect-video bg-muted">
          <img
            src={image.thumbnail_url || image.image_url}
            alt={`${image.room_type} ${image.design_style}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Source Badge */}
          <div className="absolute top-2 left-2">
            {image.source_type === 'houspire_generated' ? (
              <Badge className="bg-primary text-primary-foreground gap-1">
                <Sparkles className="h-3 w-3" />
                Houspire
              </Badge>
            ) : (
              <Badge className="bg-purple-600 text-white gap-1">
                <Pin className="h-3 w-3" />
                Reference
              </Badge>
            )}
          </div>

          {/* Tier Badge */}
          {image.tier === 'featured' && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-yellow-500 text-yellow-950 gap-1">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </Badge>
            </div>
          )}

          {/* City Match */}
          {isCityMatch && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-green-600 text-white gap-1">
                <MapPin className="h-3 w-3" />
                Your City
              </Badge>
            </div>
          )}
        </div>

        {/* Info */}
        <CardContent className="p-2 space-y-1.5 min-w-0">
          {/* Quality & Performance Row */}
          <div className="flex items-center justify-between text-xs">
            {image.quality_score !== null && (
              <span className="font-medium">{image.quality_score}% quality</span>
            )}
            <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0", performance.color)}>
              {performance.label}
            </Badge>
          </div>

          {/* Usage Stats */}
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span className="truncate">Used: {image.times_selected}×</span>
            {image.approval_rate !== null && (
              <span className="truncate">Success: {Math.round(image.approval_rate * 100)}%</span>
            )}
          </div>

          {/* Color Palette */}
          {image.color_palette && (
            <div className="flex gap-0.5">
              {Object.values(image.color_palette).slice(0, 3).map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-sm border border-border"
                  style={{ backgroundColor: color as string }}
                />
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-1.5 pt-1">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-7 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
            >
              View
            </Button>
            <Button
              size="sm"
              className="flex-1 h-7 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onUse();
              }}
            >
              Use
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

LibraryImageCard.displayName = 'LibraryImageCard';

export { LibraryImageCard };
export default LibraryBrowser;