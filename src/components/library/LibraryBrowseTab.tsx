import { useState } from 'react';
import { Search, Filter, RefreshCw, Sparkles, Pin, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface LibraryImage {
  id: string;
  image_url: string;
  thumbnail_url: string | null;
  room_type: string;
  design_style: string;
  source_type: 'user_upload' | 'houspire_generated';
  tier: 'featured' | 'standard' | 'learning' | 'unverified' | null;
  quality_score: number | null;
  approval_rate: number | null;
  times_selected: number;
  city: string | null;
  tags: string[] | null;
  created_at: string;
}

const roomTypes = [
  { value: 'all', label: 'All Room Types' },
  { value: 'living_room', label: 'Living Room' },
  { value: 'master_bedroom', label: 'Master Bedroom' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'dining_room', label: 'Dining Room' },
  { value: 'balcony', label: 'Balcony' },
  { value: 'study_room', label: 'Study Room' },
  { value: 'kids_room', label: 'Kids Room' },
  { value: 'pooja_room', label: 'Pooja Room' },
  { value: 'home_office', label: 'Home Office' },
];

const designStyles = [
  { value: 'all', label: 'All Styles' },
  { value: 'modern_indian', label: 'Modern Indian' },
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'scandinavian', label: 'Scandinavian' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'bohemian', label: 'Bohemian' },
  { value: 'art_deco', label: 'Art Deco' },
  { value: 'traditional', label: 'Traditional Indian' },
  { value: 'tropical', label: 'Tropical' },
  { value: 'japandi', label: 'Japandi' },
  { value: 'rustic', label: 'Rustic' },
  { value: 'luxury', label: 'Luxury Modern' },
  { value: 'coastal', label: 'Coastal' },
];

export function LibraryBrowseTab() {
  const [filters, setFilters] = useState({
    roomType: 'all',
    designStyle: 'all',
    sourceType: 'all' as 'all' | 'user_upload' | 'houspire_generated',
    tier: 'all',
    search: '',
    sortBy: 'ranking_score',
  });

  const { data: images, isLoading, refetch } = useQuery({
    queryKey: ['library-browse', filters],
    queryFn: async () => {
      let query = supabase
        .from('style_library')
        .select('*')
        .eq('status', 'active')
        .order(filters.sortBy, { ascending: false })
        .limit(50);

      if (filters.roomType !== 'all') {
        query = query.eq('room_type', filters.roomType);
      }
      if (filters.designStyle !== 'all') {
        query = query.eq('design_style', filters.designStyle);
      }
      if (filters.sourceType !== 'all') {
        query = query.eq('source_type', filters.sourceType as 'user_upload' | 'houspire_generated');
      }
      if (filters.tier !== 'all') {
        query = query.eq('tier', filters.tier as 'featured' | 'standard' | 'learning' | 'unverified');
      }
      if (filters.search) {
        query = query.or(`tags.cs.{${filters.search}},design_style.ilike.%${filters.search}%,room_type.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as LibraryImage[];
    },
  });

  const { data: stats } = useQuery({
    queryKey: ['library-stats-quick'],
    queryFn: async () => {
      const { count } = await supabase
        .from('style_library')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');
      return { total: count || 0 };
    },
  });

  const formatRoomType = (type: string) => type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const formatStyle = (style: string) => style.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-muted-foreground">
            Explore {stats?.total || 0} references across all rooms and styles
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Room Type</label>
              <Select
                value={filters.roomType}
                onValueChange={(value) => setFilters({ ...filters, roomType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Design Style</label>
              <Select
                value={filters.designStyle}
                onValueChange={(value) => setFilters({ ...filters, designStyle: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {designStyles.map(style => (
                    <SelectItem key={style.value} value={style.value}>{style.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Source</label>
              <Select
                value={filters.sourceType}
                onValueChange={(value: 'all' | 'user_upload' | 'houspire_generated') => 
                  setFilters({ ...filters, sourceType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="houspire_generated">✨ Houspire Renders</SelectItem>
                  <SelectItem value="user_upload">📌 User Uploads</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tier</label>
              <Select
                value={filters.tier}
                onValueChange={(value) => setFilters({ ...filters, tier: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="featured">⭐ Featured</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ranking_score">Best Performance</SelectItem>
                  <SelectItem value="created_at">Most Recent</SelectItem>
                  <SelectItem value="times_selected">Most Popular</SelectItem>
                  <SelectItem value="quality_score">Quality Score</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search tags..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardContent className="p-3 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && (!images || images.length === 0) && (
        <Card className="bg-muted/50">
          <CardContent className="py-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">No References Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to find more references.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Image Grid */}
      {!isLoading && images && images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden transition-all hover:shadow-lg cursor-pointer">
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
                      Upload
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

                {/* City Badge */}
                {image.city && (
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {image.city}
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{formatRoomType(image.room_type)}</span>
                  {image.quality_score && (
                    <span className="text-xs text-muted-foreground">{image.quality_score}%</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatStyle(image.design_style)}</span>
                  {image.approval_rate && (
                    <span className="text-green-600">{Math.round(image.approval_rate * 100)}% success</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Used {image.times_selected}×</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default LibraryBrowseTab;
