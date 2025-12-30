import { useState, useMemo } from 'react';
import { RenderVersion, useVersionComparison } from '@/hooks/useRenderVersions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Star, 
  Download, 
  Sparkles, 
  Clock, 
  Layers,
  SplitSquareHorizontal,
  Plus,
  Minus,
  ArrowRight,
  AlertCircle,
  StickyNote,
  Tag,
  RefreshCw,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { versionControlService } from '@/services/features/versionControlService';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface VersionCompareViewProps {
  versions: RenderVersion[];
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
}

// Helper to resolve image URLs
const resolveImageUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/room-images/${path}`;
};

export function VersionCompareView({ versions, isOpen, onClose, roomId }: VersionCompareViewProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [overlayOpacity, setOverlayOpacity] = useState([50]);
  const [compareMode, setCompareMode] = useState<'side-by-side' | 'overlay'>('side-by-side');
  const [overlaySwapped, setOverlaySwapped] = useState(false);

  // Get comparison data for first two versions
  const v1 = versions[0];
  const v2 = versions[1];
  const { data: comparison, isLoading: comparisonLoading } = useVersionComparison(
    v1?.id, 
    v2?.id
  );

  const handleSetAsFinal = async (version: RenderVersion) => {
    if (!roomId) return;
    try {
      await versionControlService.markAsFinal(version.id);
      queryClient.invalidateQueries({ queryKey: ['render-versions', roomId] });
      toast({ title: 'Version set as final' });
      onClose();
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: error instanceof Error ? error.message : 'Failed to set as final',
        variant: 'destructive' 
      });
    }
  };

  const handleDownload = async (version: RenderVersion) => {
    const url = resolveImageUrl(version.storage_path || version.render_url);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `render-v${version.version_number}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      toast({ 
        title: 'Download failed', 
        variant: 'destructive' 
      });
    }
  };

  const getQualityColor = (score: number | null) => {
    if (!score) return 'text-muted-foreground';
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'added': return <Plus className="h-3 w-3 text-green-500" />;
      case 'removed': return <Minus className="h-3 w-3 text-red-500" />;
      default: return <ArrowRight className="h-3 w-3 text-blue-500" />;
    }
  };

  // Compute grid columns based on number of versions (for side-by-side)
  const gridCols = useMemo(() => {
    if (versions.length === 2) return 'grid-cols-2';
    if (versions.length === 3) return 'grid-cols-3';
    return 'grid-cols-2 lg:grid-cols-4';
  }, [versions.length]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Compare Versions
            <Badge variant="outline">{versions.length} selected</Badge>
          </DialogTitle>
        </DialogHeader>

        {/* Mode Tabs - only show if 2 versions selected */}
        {versions.length === 2 && (
          <Tabs value={compareMode} onValueChange={(v) => setCompareMode(v as any)}>
            <TabsList className="mb-4">
              <TabsTrigger value="side-by-side" className="gap-2">
                <SplitSquareHorizontal className="h-4 w-4" />
                Side by Side
              </TabsTrigger>
              <TabsTrigger value="overlay" className="gap-2">
                <Layers className="h-4 w-4" />
                Overlay
              </TabsTrigger>
            </TabsList>

            {/* Side by Side View */}
            <TabsContent value="side-by-side" className="mt-0">
              <div className="grid grid-cols-2 gap-6">
                {versions.slice(0, 2).map((version) => (
                  <VersionCard 
                    key={version.id}
                    version={version}
                    roomId={roomId}
                    onSetAsFinal={handleSetAsFinal}
                    onDownload={handleDownload}
                    getQualityColor={getQualityColor}
                  />
                ))}
              </div>

              {/* Differences Card */}
              {comparison && (
                <DifferencesCard 
                  comparison={comparison} 
                  isLoading={comparisonLoading}
                  getChangeIcon={getChangeIcon}
                />
              )}
            </TabsContent>

            {/* Overlay View */}
            <TabsContent value="overlay" className="mt-0">
              <div className="space-y-4">
                {/* Opacity Slider with Swap Button */}
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium min-w-[60px]">
                    v{overlaySwapped ? v2?.version_number : v1?.version_number}
                  </span>
                  <Slider
                    value={overlayOpacity}
                    onValueChange={setOverlayOpacity}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium min-w-[60px] text-right">
                    v{overlaySwapped ? v1?.version_number : v2?.version_number}
                  </span>
                  <Badge variant="outline">{overlayOpacity[0]}%</Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setOverlaySwapped(!overlaySwapped)}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Swap
                  </Button>
                </div>

                {/* Overlay Image Container */}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                  {/* Base image */}
                  <img
                    src={resolveImageUrl(
                      overlaySwapped 
                        ? (v2?.storage_path || v2?.render_url || '') 
                        : (v1?.storage_path || v1?.render_url || '')
                    )}
                    alt={`Version ${overlaySwapped ? v2?.version_number : v1?.version_number}`}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  {/* Overlay image with opacity */}
                  <img
                    src={resolveImageUrl(
                      overlaySwapped 
                        ? (v1?.storage_path || v1?.render_url || '') 
                        : (v2?.storage_path || v2?.render_url || '')
                    )}
                    alt={`Version ${overlaySwapped ? v1?.version_number : v2?.version_number}`}
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{ opacity: overlayOpacity[0] / 100 }}
                  />
                </div>

                {/* Version Labels */}
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      v{overlaySwapped ? v2?.version_number : v1?.version_number}
                    </Badge>
                    {(overlaySwapped ? v2 : v1)?.is_final && <Badge>Final</Badge>}
                  </div>
                  <div className="flex items-center gap-2">
                    {(overlaySwapped ? v1 : v2)?.is_final && <Badge>Final</Badge>}
                    <Badge variant="outline">
                      v{overlaySwapped ? v1?.version_number : v2?.version_number}
                    </Badge>
                  </div>
                </div>

                {/* Differences Card for Overlay Mode */}
                {comparison && (
                  <DifferencesCard 
                    comparison={comparison} 
                    isLoading={comparisonLoading}
                    getChangeIcon={getChangeIcon}
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Multi-version grid (3-4 versions) */}
        {versions.length > 2 && (
          <div className={`grid ${gridCols} gap-4`}>
            {versions.map((version) => (
              <VersionCard 
                key={version.id}
                version={version}
                roomId={roomId}
                onSetAsFinal={handleSetAsFinal}
                onDownload={handleDownload}
                getQualityColor={getQualityColor}
                compact
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Extracted VersionCard component
interface VersionCardProps {
  version: RenderVersion;
  roomId?: string;
  onSetAsFinal: (version: RenderVersion) => void;
  onDownload: (version: RenderVersion) => void;
  getQualityColor: (score: number | null) => string;
  compact?: boolean;
}

function VersionCard({ version, roomId, onSetAsFinal, onDownload, getQualityColor, compact }: VersionCardProps) {
  return (
    <Card className={version.is_final ? 'border-primary ring-1 ring-primary/20' : ''}>
      <CardContent className={compact ? 'p-3' : 'p-4'}>
        <div className="space-y-3">
          {/* Image */}
          <div className={`${compact ? 'aspect-square' : 'aspect-[4/3]'} rounded-lg overflow-hidden bg-muted`}>
            <img
              src={resolveImageUrl(version.storage_path || version.render_url)}
              alt={`Version ${version.version_number}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Version Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold">v{version.version_number}</span>
              {version.is_final && (
                <Badge variant="default" className="gap-1">
                  <Star className="h-3 w-3" />
                  Final
                </Badge>
              )}
            </div>
          </div>

          {/* Rating Display */}
          {version.user_rating && (
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star}
                  className={`h-3 w-3 ${
                    star <= version.user_rating!
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Notes */}
          {version.notes && !compact && (
            <div className="flex items-start gap-1.5 text-xs bg-muted/50 rounded p-2">
              <StickyNote className="h-3 w-3 mt-0.5 text-muted-foreground" />
              <span className="text-muted-foreground line-clamp-2">{version.notes}</span>
            </div>
          )}

          {/* Tags */}
          {version.tags && version.tags.length > 0 && !compact && (
            <div className="flex items-center gap-1 flex-wrap">
              <Tag className="h-3 w-3 text-muted-foreground" />
              {version.tags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs py-0">
                  {tag}
                </Badge>
              ))}
              {version.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">+{version.tags.length - 3}</span>
              )}
            </div>
          )}

          {/* Metadata */}
          <div className={`space-y-1.5 ${compact ? 'text-xs' : 'text-sm'}`}>
            {/* Quality Score */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Quality</span>
              <span className={`flex items-center gap-1 font-medium ${getQualityColor(version.quality_score)}`}>
                <Sparkles className="h-3 w-3" />
                {version.quality_score ? `${version.quality_score}%` : 'N/A'}
              </span>
            </div>

            {/* Timestamp */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="flex items-center gap-1 text-foreground">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(version.created_at), { addSuffix: true })}
              </span>
            </div>
          </div>

          {/* Prompt Preview */}
          {version.prompt_used && !compact && (
            <div className="text-xs">
              <span className="text-muted-foreground">Prompt:</span>
              <p className="mt-1 text-foreground line-clamp-2 bg-muted p-2 rounded">
                {version.prompt_used}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {!version.is_final && roomId && (
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => onSetAsFinal(version)}
              >
                <Star className="h-4 w-4 mr-1" />
                Select
              </Button>
            )}
            <Button 
              size="sm" 
              variant="outline"
              className={version.is_final || !roomId ? 'flex-1' : ''}
              onClick={() => onDownload(version)}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Extracted DifferencesCard component
interface DifferencesCardProps {
  comparison: any;
  isLoading: boolean;
  getChangeIcon: (changeType: string) => React.ReactNode;
}

function DifferencesCard({ comparison, isLoading, getChangeIcon }: DifferencesCardProps) {
  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Detecting Changes...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  const hasChanges = comparison.styleChanges?.length > 0 || 
                     comparison.paramChanges?.length > 0 || 
                     comparison.qualityDelta !== 0;

  if (!hasChanges) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Differences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No significant differences detected between these versions.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Differences
        </CardTitle>
        {comparison.changeSummary && (
          <p className="text-sm text-muted-foreground">{comparison.changeSummary}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quality Delta */}
        {comparison.qualityDelta !== 0 && (
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">Quality Score</span>
            <Badge variant={comparison.qualityDelta > 0 ? 'default' : 'destructive'}>
              {comparison.qualityDelta > 0 ? '+' : ''}{comparison.qualityDelta}%
            </Badge>
          </div>
        )}

        {/* Style Changes */}
        {comparison.styleChanges?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Style Changes</h4>
            <div className="space-y-1">
              {comparison.styleChanges.map((change: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs p-2 bg-muted/50 rounded">
                  {getChangeIcon(change.changeType)}
                  <span className="font-mono">{change.field}</span>
                  {change.changeType === 'modified' && (
                    <>
                      <span className="text-muted-foreground line-through">{JSON.stringify(change.oldValue)}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span className="text-foreground">{JSON.stringify(change.newValue)}</span>
                    </>
                  )}
                  {change.changeType === 'added' && (
                    <span className="text-green-600">{JSON.stringify(change.newValue)}</span>
                  )}
                  {change.changeType === 'removed' && (
                    <span className="text-red-600 line-through">{JSON.stringify(change.oldValue)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Param Changes */}
        {comparison.paramChanges?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Parameter Changes</h4>
            <div className="space-y-1">
              {comparison.paramChanges.map((change: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs p-2 bg-muted/50 rounded">
                  {getChangeIcon(change.changeType)}
                  <span className="font-mono">{change.field}</span>
                  {change.changeType === 'modified' && (
                    <>
                      <span className="text-muted-foreground line-through">{JSON.stringify(change.oldValue)}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span className="text-foreground">{JSON.stringify(change.newValue)}</span>
                    </>
                  )}
                  {change.changeType === 'added' && (
                    <span className="text-green-600">{JSON.stringify(change.newValue)}</span>
                  )}
                  {change.changeType === 'removed' && (
                    <span className="text-red-600 line-through">{JSON.stringify(change.oldValue)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
