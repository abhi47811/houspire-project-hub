import { useState } from 'react';
import { useRenderVersions, RenderVersion } from '@/hooks/useRenderVersions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Star, 
  MoreVertical, 
  Trash2, 
  RotateCcw, 
  GitCompare,
  Download,
  Clock,
  Sparkles,
  StickyNote,
  Tag,
  CheckCircle,
  AlertCircle,
  GitBranch,
  Eye,
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
  const { 
    versions, 
    isLoading, 
    markAsFinal, 
    deleteVersion, 
    revertToVersion,
    approveVersion,
    updateNotes,
    addTags,
    rateVersion,
  } = useRenderVersions(roomId);
  
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [versionToDelete, setVersionToDelete] = useState<string | null>(null);
  
  // Notes dialog state
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [notesVersionId, setNotesVersionId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');
  
  // Tags dialog state
  const [tagsDialogOpen, setTagsDialogOpen] = useState(false);
  const [tagsVersionId, setTagsVersionId] = useState<string | null>(null);
  const [tagsText, setTagsText] = useState('');

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
      deleteVersion(versionToDelete);
      setVersionToDelete(null);
    }
    setDeleteDialogOpen(false);
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
      console.error('Download failed:', error);
    }
  };

  const handleRate = (versionId: string, rating: number) => {
    rateVersion(versionId, rating);
  };

  const openNotesDialog = (version: RenderVersion) => {
    setNotesVersionId(version.id);
    setNotesText(version.notes || '');
    setNotesDialogOpen(true);
  };

  const saveNotes = () => {
    if (notesVersionId) {
      updateNotes(notesVersionId, notesText);
    }
    setNotesDialogOpen(false);
  };

  const openTagsDialog = (version: RenderVersion) => {
    setTagsVersionId(version.id);
    setTagsText('');
    setTagsDialogOpen(true);
  };

  const saveTags = () => {
    if (tagsVersionId && tagsText.trim()) {
      const newTags = tagsText.split(',').map(t => t.trim()).filter(Boolean);
      addTags(tagsVersionId, newTags);
    }
    setTagsDialogOpen(false);
  };

  const getQualityColor = (score: number | null) => {
    if (!score) return 'text-muted-foreground';
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Find parent version for display
  const getParentVersion = (version: RenderVersion) => {
    if (!version.parent_version_id) return null;
    return versions.find(v => v.id === version.parent_version_id);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-40 w-full" />
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
            {versions.length} version{versions.length !== 1 ? 's' : ''} • 
            Select up to 4 to compare
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
          {versions.map((version, index) => {
            const parent = getParentVersion(version);
            
            return (
              <div key={version.id} className="relative pl-14">
                {/* Timeline dot */}
                <div className={`absolute left-4 top-4 w-4 h-4 rounded-full border-2 ${
                  version.is_final 
                    ? 'bg-primary border-primary' 
                    : version.is_approved
                      ? 'bg-green-500 border-green-500'
                      : 'bg-background border-border'
                }`} />

                <Card className={`${version.is_final ? 'border-primary ring-1 ring-primary/20' : ''}`}>
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
                      <div className="w-28 h-28 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={resolveImageUrl(version.storage_path || version.render_url)}
                          alt={`Version ${version.version_number}`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Version Info */}
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Header row */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-lg">v{version.version_number}</span>
                          {version.is_final && (
                            <Badge variant="default" className="gap-1">
                              <Star className="h-3 w-3" />
                              Final
                            </Badge>
                          )}
                          {version.is_approved && !version.is_final && (
                            <Badge variant="secondary" className="gap-1 bg-green-500/10 text-green-600">
                              <CheckCircle className="h-3 w-3" />
                              Approved
                            </Badge>
                          )}
                          {index === 0 && !version.is_final && (
                            <Badge variant="outline">Latest</Badge>
                          )}
                        </div>

                        {/* Parent indicator */}
                        {parent && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <GitBranch className="h-3 w-3" />
                            <span>From v{parent.version_number}</span>
                          </div>
                        )}

                        {/* Prompt preview */}
                        {version.prompt_used && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {version.prompt_used}
                          </p>
                        )}

                        {/* Change summary */}
                        {version.change_summary && (
                          <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                            <AlertCircle className="h-3 w-3" />
                            <span>{version.change_summary}</span>
                          </div>
                        )}

                        {/* Notes display */}
                        {version.notes && (
                          <div className="flex items-start gap-1 text-sm bg-muted/50 rounded p-2">
                            <StickyNote className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">{version.notes}</span>
                          </div>
                        )}

                        {/* Tags display */}
                        {version.tags && version.tags.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap">
                            <Tag className="h-3 w-3 text-muted-foreground" />
                            {version.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Rating stars */}
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              onClick={() => handleRate(version.id, star)}
                              className="p-0.5 hover:scale-110 transition-transform"
                            >
                              <Star 
                                className={`h-4 w-4 ${
                                  version.user_rating && star <= version.user_rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-muted-foreground/30'
                                }`}
                              />
                            </button>
                          ))}
                          {version.user_rating && (
                            <span className="text-xs text-muted-foreground ml-1">
                              ({version.user_rating}/5)
                            </span>
                          )}
                        </div>

                        {/* Metrics row */}
                        <div className="flex items-center gap-4 text-sm">
                          {version.quality_score !== null && (
                            <span className={`flex items-center gap-1 ${getQualityColor(version.quality_score)}`}>
                              <Sparkles className="h-3 w-3" />
                              {version.quality_score}%
                            </span>
                          )}
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
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
                          <DropdownMenuItem onClick={() => window.open(resolveImageUrl(version.storage_path || version.render_url), '_blank')}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Full Size
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          {!version.is_approved && (
                            <DropdownMenuItem onClick={() => approveVersion(version.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          
                          {!version.is_final && (
                            <DropdownMenuItem onClick={() => markAsFinal(version.id)}>
                              <Star className="mr-2 h-4 w-4" />
                              Set as Final
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuItem onClick={() => revertToVersion(version.id)}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Restore as New
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem onClick={() => openNotesDialog(version)}>
                            <StickyNote className="mr-2 h-4 w-4" />
                            {version.notes ? 'Edit Notes' : 'Add Notes'}
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem onClick={() => openTagsDialog(version)}>
                            <Tag className="mr-2 h-4 w-4" />
                            Add Tags
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem onClick={() => handleDownload(version)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          
                          {!version.is_final && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDelete(version.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
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
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Notes Dialog */}
      <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Version Notes</DialogTitle>
          </DialogHeader>
          <Textarea
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            placeholder="Add notes about this version..."
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotesDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveNotes}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tags Dialog */}
      <Dialog open={tagsDialogOpen} onOpenChange={setTagsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Tags</DialogTitle>
          </DialogHeader>
          <Input
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="Enter tags separated by commas..."
          />
          <p className="text-xs text-muted-foreground">
            Example: modern, minimalist, approved
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTagsDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveTags}>Add Tags</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
