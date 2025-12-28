import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { 
  Sparkles, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Image as ImageIcon,
  Palette,
  Sofa,
  LayoutGrid
} from 'lucide-react';

interface LibraryImage {
  id: string;
  image_url: string;
  room_type: string;
  design_style: string;
  color_palette: string[] | null;
  furniture_list: string[] | null;
  layout_pattern: { arrangement?: string; focal_point?: string } | null;
  thumbnail_url: string | null;
}

interface AnalysisResult {
  id: string;
  success: boolean;
  error?: string;
  metadata?: {
    color_palette: string[];
    furniture_count: number;
    layout: string;
  };
}

export default function LibraryAnalyzer() {
  const queryClient = useQueryClient();
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<AnalysisResult[]>([]);

  // Fetch pending images count
  const { data: pendingData, isLoading: loadingPending } = useQuery({
    queryKey: ['library-analyzer-pending'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('analyze-library-metadata', {
        body: { action: 'get_pending' }
      });
      if (error) throw error;
      return data as { pendingCount: number };
    },
    refetchInterval: analyzing ? 5000 : false
  });

  // Fetch images with missing metadata
  const { data: pendingImages, isLoading: loadingImages, refetch } = useQuery({
    queryKey: ['library-images-pending-metadata'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('style_library')
        .select('id, image_url, room_type, design_style, color_palette, furniture_list, layout_pattern, thumbnail_url')
        .eq('status', 'active')
        .or('color_palette.is.null,furniture_list.is.null,layout_pattern.is.null')
        .limit(20);

      if (error) throw error;
      return data as LibraryImage[];
    }
  });

  // Analyze single image
  const analyzeSingle = useMutation({
    mutationFn: async (imageId: string) => {
      const { data, error } = await supabase.functions.invoke('analyze-library-metadata', {
        body: { action: 'analyze_single', imageId }
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data, imageId) => {
      if (data.successful > 0) {
        toast.success('Image analyzed successfully');
        queryClient.invalidateQueries({ queryKey: ['library-images-pending-metadata'] });
        queryClient.invalidateQueries({ queryKey: ['library-analyzer-pending'] });
      } else {
        toast.error('Analysis failed');
      }
      setResults(prev => [...prev, ...(data.results || [])]);
    },
    onError: (error) => {
      toast.error(`Analysis failed: ${error.message}`);
    }
  });

  // Analyze batch
  const analyzeBatch = async () => {
    setAnalyzing(true);
    setProgress(0);
    setResults([]);

    const totalPending = pendingData?.pendingCount || 0;
    let processed = 0;

    try {
      while (true) {
        const { data, error } = await supabase.functions.invoke('analyze-library-metadata', {
          body: { action: 'analyze_batch', batchSize: 3 }
        });

        if (error) throw error;

        if (data.analyzed === 0) {
          break; // No more images to analyze
        }

        processed += data.analyzed;
        setProgress(Math.min((processed / totalPending) * 100, 100));
        setResults(prev => [...prev, ...(data.results || [])]);

        // Small delay between batches to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if we're done
        if (data.analyzed < 3) break;
      }

      toast.success(`Analysis complete! ${processed} images processed`);
      queryClient.invalidateQueries({ queryKey: ['library-images-pending-metadata'] });
      queryClient.invalidateQueries({ queryKey: ['library-analyzer-pending'] });
    } catch (error) {
      toast.error(`Batch analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setAnalyzing(false);
    }
  };

  const hasMetadata = (image: LibraryImage) => 
    image.color_palette && image.furniture_list && image.layout_pattern;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Library Metadata Analyzer
          </h1>
          <p className="text-muted-foreground mt-1">
            Use AI to extract color palettes, furniture lists, and layout patterns from library images
          </p>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Status</CardTitle>
          <CardDescription>Images awaiting metadata extraction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {loadingPending ? <Skeleton className="h-9 w-16" /> : pendingData?.pendingCount || 0}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {results.filter(r => r.success).length}
                </div>
                <div className="text-sm text-muted-foreground">Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-destructive">
                  {results.filter(r => !r.success).length}
                </div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
            </div>
            
            <Button 
              onClick={analyzeBatch} 
              disabled={analyzing || (pendingData?.pendingCount || 0) === 0}
              size="lg"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Analyze All ({pendingData?.pendingCount || 0})
                </>
              )}
            </Button>
          </div>

          {analyzing && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                {Math.round(progress)}% complete
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loadingImages ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))
        ) : pendingImages?.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold">All Images Analyzed!</h3>
              <p className="text-muted-foreground">Every library image has complete metadata.</p>
            </CardContent>
          </Card>
        ) : (
          pendingImages?.map((image) => {
            const result = results.find(r => r.id === image.id);
            const isAnalyzing = analyzeSingle.isPending && analyzeSingle.variables === image.id;

            return (
              <Card key={image.id} className="overflow-hidden group">
                <div className="relative aspect-square">
                  <img
                    src={image.thumbnail_url || image.image_url}
                    alt={`${image.room_type} - ${image.design_style}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="sm"
                      onClick={() => analyzeSingle.mutate(image.id)}
                      disabled={isAnalyzing || analyzing}
                    >
                      {isAnalyzing ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-1" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {/* Status indicator */}
                  {result && (
                    <div className="absolute top-2 right-2">
                      {result.success ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500 bg-white rounded-full" />
                      ) : (
                        <XCircle className="h-6 w-6 text-destructive bg-white rounded-full" />
                      )}
                    </div>
                  )}
                </div>
                
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {image.room_type}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {image.design_style}
                    </Badge>
                  </div>
                  
                  {/* Metadata indicators */}
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <div className={`flex items-center gap-1 ${image.color_palette ? 'text-green-600' : ''}`}>
                      <Palette className="h-3 w-3" />
                      <span>{image.color_palette ? '✓' : '—'}</span>
                    </div>
                    <div className={`flex items-center gap-1 ${image.furniture_list ? 'text-green-600' : ''}`}>
                      <Sofa className="h-3 w-3" />
                      <span>{image.furniture_list ? '✓' : '—'}</span>
                    </div>
                    <div className={`flex items-center gap-1 ${image.layout_pattern ? 'text-green-600' : ''}`}>
                      <LayoutGrid className="h-3 w-3" />
                      <span>{image.layout_pattern ? '✓' : '—'}</span>
                    </div>
                  </div>

                  {/* Show extracted colors if available */}
                  {result?.success && result.metadata?.color_palette && (
                    <div className="flex gap-1 mt-2">
                      {result.metadata.color_palette.slice(0, 5).map((color, i) => (
                        <div
                          key={i}
                          className="h-4 w-4 rounded-full border border-border"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Recent Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-auto">
              {results.slice(-10).reverse().map((result, i) => (
                <div 
                  key={`${result.id}-${i}`} 
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    result.success ? 'bg-green-50 dark:bg-green-950/20' : 'bg-destructive/10'
                  }`}
                >
                  <code className="text-xs font-mono">{result.id.slice(0, 8)}...</code>
                  {result.success ? (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{result.metadata?.furniture_count || 0} items, {result.metadata?.layout}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <XCircle className="h-4 w-4" />
                      <span>{result.error}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
