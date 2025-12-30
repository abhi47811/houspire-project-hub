/**
 * F-063: Render History Timeline Component
 * 
 * Visual timeline of all render versions with quick actions
 * and refinement request tracking.
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  History,
  Star,
  Check,
  GitBranch,
  Trash2,
  Eye,
  GitCompare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RenderHistory, RenderVersion } from '@/services/features/refinementService';

interface RenderHistoryTimelineProps {
  history: RenderHistory;
  onViewVersion?: (versionId: string) => void;
  onCompareVersions?: (versionIdA: string, versionIdB: string) => void;
  onToggleFavorite?: (versionId: string, isFavorite: boolean) => void;
  onDeleteVersion?: (versionId: string) => void;
  className?: string;
}

export function RenderHistoryTimeline({
  history,
  onViewVersion,
  onCompareVersions,
  onToggleFavorite,
  onDeleteVersion,
  className,
}: RenderHistoryTimelineProps) {
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);

  const handleVersionSelect = (versionId: string) => {
    if (selectedVersions.includes(versionId)) {
      setSelectedVersions(selectedVersions.filter((id) => id !== versionId));
    } else if (selectedVersions.length < 2) {
      setSelectedVersions([...selectedVersions, versionId]);
    }
  };

  const handleCompare = () => {
    if (selectedVersions.length === 2 && onCompareVersions) {
      onCompareVersions(selectedVersions[0], selectedVersions[1]);
      setSelectedVersions([]);
    }
  };

  const getRefinementBadge = (version: RenderVersion) => {
    if (!version.refinement_request) return null;

    const { status, type } = version.refinement_request;
    const statusColors = {
      pending: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
      in_progress: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      completed: 'bg-green-500/10 text-green-700 border-green-500/20',
      rejected: 'bg-red-500/10 text-red-700 border-red-500/20',
    };

    return (
      <Badge variant="outline" className={cn('text-[10px] h-4 px-1', statusColors[status])}>
        {type.replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <History className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Render History</CardTitle>
              <CardDescription className="text-xs">
                {history.total_versions} versions • {history.favorite_versions.length} favorites
              </CardDescription>
            </div>
          </div>
          {selectedVersions.length === 2 && (
            <Button size="sm" onClick={handleCompare}>
              <GitCompare className="w-4 h-4 mr-2" />
              Compare
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {history.versions.map((version, idx) => {
              const isSelected = selectedVersions.includes(version.id);
              const isApproved = version.id === history.approved_version_id;
              const isFavorite = history.favorite_versions.includes(version.id);
              const hasParent = !!version.parent_version_id;

              return (
                <div
                  key={version.id}
                  className={cn(
                    'relative p-3 rounded-lg border-2 transition-all',
                    isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
                    'cursor-pointer'
                  )}
                  onClick={() => handleVersionSelect(version.id)}
                >
                  {/* Timeline Connector */}
                  {idx < history.versions.length - 1 && (
                    <div className="absolute left-8 top-full w-0.5 h-3 bg-border" />
                  )}

                  <div className="flex gap-3">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 rounded overflow-hidden bg-muted shrink-0">
                      <img
                        src={version.thumbnail_url || version.image_url}
                        alt={`Version ${version.version_number}`}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <Check className="w-6 h-6 text-primary" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          Version {version.version_number}
                        </span>
                        {isApproved && (
                          <Badge variant="default" className="text-[10px] h-4 px-1">
                            <Check className="w-2.5 h-2.5 mr-0.5" />
                            Approved
                          </Badge>
                        )}
                        {hasParent && (
                          <Badge variant="outline" className="text-[10px] h-4 px-1">
                            <GitBranch className="w-2.5 h-2.5 mr-0.5" />
                            Refinement
                          </Badge>
                        )}
                        {getRefinementBadge(version)}
                      </div>

                      {version.quality_score && (
                        <div className="text-xs text-muted-foreground">
                          Quality: {version.quality_score}/100
                        </div>
                      )}

                      {version.refinement_request && (
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {version.refinement_request.description}
                        </div>
                      )}

                      <div className="text-[11px] text-muted-foreground">
                        {new Date(version.created_at).toLocaleDateString()} •{' '}
                        {new Date(version.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite?.(version.id, !isFavorite);
                        }}
                      >
                        <Star
                          className={cn(
                            'w-3.5 h-3.5',
                            isFavorite
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-muted-foreground'
                          )}
                        />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewVersion?.(version.id);
                        }}
                      >
                        <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteVersion?.(version.id);
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            {history.versions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No render history yet</p>
                <p className="text-xs mt-1">
                  Generate your first render to start tracking versions
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        {selectedVersions.length > 0 && (
          <div className="mt-3 p-2 bg-primary/5 rounded text-xs text-center">
            {selectedVersions.length === 1
              ? '1 version selected. Select one more to compare.'
              : '2 versions selected. Click Compare button above.'}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
