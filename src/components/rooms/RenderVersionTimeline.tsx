// ============================================================================
// RENDER VERSION TIMELINE COMPONENT
// ============================================================================
// Purpose: Visual timeline showing all render versions
// Location: src/components/rooms/RenderVersionTimeline.tsx
// ============================================================================

import { useState } from 'react';
import { useRenderVersions } from '@/hooks/useRenderVersions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Check,
  Star,
  Clock,
  Eye,
  Trash2,
  RotateCcw,
  Tag,
  StickyNote,
  AlertCircle,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import type { RenderVersion } from '@/services/features/versionControlService';

interface RenderVersionTimelineProps {
  roomId: string;
  onVersionSelect?: (version: RenderVersion) => void;
  onCompare?: (versions: RenderVersion[]) => void;
  className?: string;
}

export function RenderVersionTimeline({
  roomId,
  onVersionSelect,
  onCompare,
  className,
}: RenderVersionTimelineProps) {
  const {
    versions,
    isLoading,
    versionCount,
    approveVersion,
    markAsFinal,
    revertToVersion,
    rateVersion,
    deleteVersion,
    isApproving,
    isReverting,
    isDeleting,
  } = useRenderVersions(roomId);

  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);

  const handleSelectVersion = (versionId: string) => {
    setSelectedVersions((prev) => {
      if (prev.includes(versionId)) {
        return prev.filter((id) => id !== versionId);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), versionId];
      }
      return [...prev, versionId];
    });
  };

  const handleCompare = () => {
    if (selectedVersions.length >= 2 && onCompare && versions) {
      const versionsToCompare = versions.filter((v) =>
        selectedVersions.includes(v.id)
      );
      onCompare(versionsToCompare);
    }
  };

  const handleRating = (versionId: string, rating: number) => {
    rateVersion({ versionId, rating });
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="py-10">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!versions || versions.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="py-10">
          <div className="text-center text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No versions yet. Generate your first render to start tracking versions.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Version History</CardTitle>
            <CardDescription>
              {versionCount} version{versionCount !== 1 ? 's' : ''} • Select up to 4 to compare
            </CardDescription>
          </div>
          {selectedVersions.length >= 2 && (
            <Button onClick={handleCompare} size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Compare ({selectedVersions.length})
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {versions.map((version, index) => (
              <div key={version.id} className="relative">
                {/* Timeline connector */}
                {index < versions.length - 1 && (
                  <div className="absolute left-[19px] top-[60px] bottom-[-16px] w-0.5 bg-border" />
                )}

                {/* Version card */}
                <div
                  className={cn(
                    'flex gap-4 p-4 rounded-lg border transition-all cursor-pointer',
                    selectedVersions.includes(version.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50',
                    version.is_final && 'ring-2 ring-green-500/20'
                  )}
                  onClick={() => handleSelectVersion(version.id)}
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold',
                        version.is_final
                          ? 'border-green-500 bg-green-500/10 text-green-700'
                          : version.is_approved
                          ? 'border-blue-500 bg-blue-500/10 text-blue-700'
                          : 'border-border bg-background'
                      )}
                    >
                      v{version.version_number}
                    </div>
                  </div>

                  {/* Version content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold flex items-center gap-2">
                          Version {version.version_number}
                          {version.is_final && (
                            <Badge variant="default" className="bg-green-600">
                              <Check className="h-3 w-3 mr-1" />
                              Final
                            </Badge>
                          )}
                          {version.is_approved && !version.is_final && (
                            <Badge variant="secondary">
                              <Check className="h-3 w-3 mr-1" />
                              Approved
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(version.created_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>

                      {/* Quality score */}
                      {version.quality_score && (
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {version.quality_score.toFixed(1)}
                          </div>
                          <div className="text-xs text-muted-foreground">Quality</div>
                        </div>
                      )}
                    </div>

                    {/* Thumbnail */}
                    <div className="relative aspect-video rounded-md overflow-hidden bg-muted mb-3">
                      <img
                        src={version.thumbnail_url || version.render_url}
                        alt={`Version ${version.version_number}`}
                        className="w-full h-full object-cover"
                      />
                      {selectedVersions.includes(version.id) && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <Check className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Change summary */}
                    {version.change_summary && (
                      <div className="flex items-start gap-2 mb-3 p-2 rounded bg-muted/50">
                        <AlertCircle className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                        <p className="text-sm">{version.change_summary}</p>
                      </div>
                    )}

                    {/* Tags */}
                    {version.tags && version.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {version.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Notes */}
                    {version.notes && (
                      <div className="flex items-start gap-2 mb-3 p-2 rounded bg-muted/50">
                        <StickyNote className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                        <p className="text-sm">{version.notes}</p>
                      </div>
                    )}

                    {/* User rating */}
                    {version.user_rating && (
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-4 w-4',
                              i < version.user_rating!
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            )}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          {version.user_rating}/5
                        </span>
                      </div>
                    )}

                    <Separator className="my-3" />

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {!version.is_approved && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            approveVersion(version.id);
                          }}
                          disabled={isApproving}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      )}

                      {version.is_approved && !version.is_final && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsFinal(version.id);
                          }}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Mark as Final
                        </Button>
                      )}

                      {index > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            revertToVersion(version.id);
                          }}
                          disabled={isReverting}
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Revert to This
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onVersionSelect) {
                            onVersionSelect(version);
                          }
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Full
                        </Button>

                      {!version.is_final && index > 0 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              confirm(
                                'Are you sure you want to delete this version? This cannot be undone.'
                              )
                            ) {
                              deleteVersion(version.id);
                            }
                          }}
                          disabled={isDeleting}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
