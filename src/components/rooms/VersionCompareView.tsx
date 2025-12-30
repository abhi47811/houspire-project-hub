import { RenderVersion } from '@/hooks/useRenderVersions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Download, Sparkles, Clock } from 'lucide-react';
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

  const handleSetAsFinal = async (version: RenderVersion) => {
    if (!roomId) return;
    try {
      await versionControlService.setAsFinal(version.id, roomId);
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
    const url = resolveImageUrl(version.storage_path || version.image_url);
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
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  // Determine grid columns based on number of versions
  const gridCols = versions.length === 2 
    ? 'grid-cols-2' 
    : versions.length === 3 
      ? 'grid-cols-3' 
      : 'grid-cols-2 lg:grid-cols-4';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compare Versions</DialogTitle>
        </DialogHeader>

        <div className={`grid ${gridCols} gap-4 mt-4`}>
          {versions.map((version) => (
            <Card key={version.id} className={version.is_final ? 'border-primary' : ''}>
              <CardContent className="p-4 space-y-4">
                {/* Image */}
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                  <img
                    src={resolveImageUrl(version.storage_path || version.image_url)}
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

                {/* Metadata */}
                <div className="space-y-2 text-sm">
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
                {version.prompt_used && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Prompt:</span>
                    <p className="mt-1 text-foreground line-clamp-3 text-xs bg-muted p-2 rounded">
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
                      onClick={() => handleSetAsFinal(version)}
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Select
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    className={version.is_final || !roomId ? 'flex-1' : ''}
                    onClick={() => handleDownload(version)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
