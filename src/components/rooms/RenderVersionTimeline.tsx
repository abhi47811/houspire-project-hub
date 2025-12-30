import { useState } from 'react';
import { useRenderVersions, RenderVersion } from '@/hooks/useRenderVersions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Star, 
  MoreVertical, 
  Trash2, 
  RotateCcw, 
  GitCompare,
  Download,
  Clock,
  Sparkles,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RenderVersionTimelineProps {
  roomId: string;
  onCompare: (versions: RenderVersion[]) => void;
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

export function RenderVersionTimeline({ roomId, onCompare }: RenderVersionTimelineProps) {
  const { versions, isLoading, setAsFinal, deleteVersion, restoreVersion } = useRenderVersions(roomId);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [versionToDelete, setVersionToDelete] = useState<string | null>(null);

  const handleToggleSelect = (versionId: string) => {
    setSelectedVersions(prev => 
      prev.includes(versionId)
        ? prev.filter(id => id !== versionId)
        : prev.length < 4 ? [...prev, versionId] : prev
    );
  };

  const handleCompare = () => {
    const versionsToCompare = versions.filter(v => selectedVersions.includes(v.id));
    onCompare(versionsToCompare);
  };

  const handleDelete = (versionId: string) => {
    setVersionToDelete(versionId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (versionToDelete) {
      deleteVersion.mutate(versionToDelete);
      setVersionToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleDownload = async (version: RenderVersion) => {
    const url = resolveImageUrl(version.storage_path || version.image_url);
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
  };

  const getQualityColor = (score: number | null) => {
    if (!score) return 'text-muted-foreground';
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (versions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="font-semibold text-lg">No Version History</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Generate your first render to start tracking versions
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Compare Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Version History</h3>
          <p className="text-sm text-muted-foreground">
            {versions.length} version{versions.length !== 1 ? 's' : ''}
          </p>
        </div>
        {selectedVersions.length >= 2 && (
          <Button onClick={handleCompare} size="sm">
            <GitCompare className="h-4 w-4 mr-2" />
            Compare ({selectedVersions.length})
          </Button>
        )}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-4">
          {versions.map((version, index) => (
            <div key={version.id} className="relative pl-14">
              {/* Timeline dot */}
              <div className={`absolute left-4 top-4 w-4 h-4 rounded-full border-2 ${
                version.is_final 
                  ? 'bg-primary border-primary' 
                  : 'bg-background border-border'
              }`} />

              <Card className={version.is_final ? 'border-primary' : ''}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Checkbox for selection */}
                    <div className="flex items-start pt-1">
                      <Checkbox
                        checked={selectedVersions.includes(version.id)}
                        onCheckedChange={() => handleToggleSelect(version.id)}
                        disabled={!selectedVersions.includes(version.id) && selectedVersions.length >= 4}
                      />
                    </div>

                    {/* Thumbnail */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={resolveImageUrl(version.storage_path || version.image_url)}
                        alt={`Version ${version.version_number}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Version Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">v{version.version_number}</span>
                        {version.is_final && (
                          <Badge variant="default" className="gap-1">
                            <Star className="h-3 w-3" />
                            Final
                          </Badge>
                        )}
                        {index === 0 && !version.is_final && (
                          <Badge variant="secondary">Latest</Badge>
                        )}
                      </div>

                      {version.prompt_used && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {version.prompt_used}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-sm">
                        {version.quality_score && (
                          <span className={`flex items-center gap-1 ${getQualityColor(version.quality_score)}`}>
                            <Sparkles className="h-3 w-3" />
                            {version.quality_score}%
                          </span>
                        )}
                        <span className="text-muted-foreground">
                          {formatDistanceToNow(new Date(version.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>

                    {/* Actions Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        {!version.is_final && (
                          <DropdownMenuItem onClick={() => setAsFinal.mutate(version.id)}>
                            <Star className="mr-2 h-4 w-4" />
                            Set as Final
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => restoreVersion.mutate(version.id)}>
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Restore as New
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(version)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(version.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Version</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this version? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
