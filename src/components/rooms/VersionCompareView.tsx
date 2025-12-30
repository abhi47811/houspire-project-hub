// ============================================================================
// VERSION COMPARE VIEW COMPONENT
// ============================================================================
// Purpose: Side-by-side comparison of render versions
// Location: src/components/rooms/VersionCompareView.tsx
// ============================================================================

import { useState } from 'react';
import { useVersionComparison } from '@/hooks/useRenderVersions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, ArrowRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RenderVersion } from '@/services/features/versionControlService';

interface VersionCompareViewProps {
  versions: RenderVersion[];
  isOpen: boolean;
  onClose: () => void;
}

export function VersionCompareView({
  versions,
  isOpen,
  onClose,
}: VersionCompareViewProps) {
  const [selectedVersion1, setSelectedVersion1] = useState<RenderVersion | null>(
    versions[0] || null
  );
  const [selectedVersion2, setSelectedVersion2] = useState<RenderVersion | null>(
    versions[1] || null
  );
  const [viewMode, setViewMode] = useState<'side-by-side' | 'overlay'>('side-by-side');
  const [overlayOpacity, setOverlayOpacity] = useState(50);

  const { data: comparison, isLoading } = useVersionComparison(
    selectedVersion1?.id,
    selectedVersion2?.id
  );

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Compare Versions</DialogTitle>
          <DialogDescription>
            Compare up to 2 versions side-by-side or as overlay
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {/* Version selectors */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Version 1</label>
              <select
                className="w-full p-2 rounded-md border bg-background"
                value={selectedVersion1?.id || ''}
                onChange={(e) => {
                  const version = versions.find((v) => v.id === e.target.value);
                  setSelectedVersion1(version || null);
                }}
              >
                {versions.map((v) => (
                  <option key={v.id} value={v.id}>
                    Version {v.version_number} - {v.change_summary || 'Initial version'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Version 2</label>
              <select
                className="w-full p-2 rounded-md border bg-background"
                value={selectedVersion2?.id || ''}
                onChange={(e) => {
                  const version = versions.find((v) => v.id === e.target.value);
                  setSelectedVersion2(version || null);
                }}
              >
                {versions.map((v) => (
                  <option key={v.id} value={v.id}>
                    Version {v.version_number} - {v.change_summary || 'Initial version'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
            <TabsList className="mb-4">
              <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
              <TabsTrigger value="overlay">Overlay</TabsTrigger>
            </TabsList>

            {/* Side by Side View */}
            <TabsContent value="side-by-side">
              <div className="grid grid-cols-2 gap-6">
                {/* Version 1 */}
                <VersionCard version={selectedVersion1} label="Version 1" />

                {/* Version 2 */}
                <VersionCard version={selectedVersion2} label="Version 2" />
              </div>
            </TabsContent>

            {/* Overlay View */}
            <TabsContent value="overlay">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Opacity:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={overlayOpacity}
                    onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground w-12">
                    {overlayOpacity}%
                  </span>
                </div>

                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  {/* Base image (Version 1) */}
                  {selectedVersion1 && (
                    <img
                      src={selectedVersion1.render_url}
                      alt="Version 1"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  )}

                  {/* Overlay image (Version 2) */}
                  {selectedVersion2 && (
                    <img
                      src={selectedVersion2.render_url}
                      alt="Version 2"
                      className="absolute inset-0 w-full h-full object-contain"
                      style={{ opacity: overlayOpacity / 100 }}
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded" />
                    <span>Version {selectedVersion1?.version_number}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded" />
                    <span>Version {selectedVersion2?.version_number}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Differences */}
          {comparison && !isLoading && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Detected Changes</h3>

                {/* Style changes */}
                {comparison.differences.style_changes.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Badge variant="secondary">Style Changes</Badge>
                      <span className="text-muted-foreground">
                        ({comparison.differences.style_changes.length})
                      </span>
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {comparison.differences.style_changes.map((change, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Parameter changes */}
                {comparison.differences.param_changes.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Badge variant="secondary">Parameter Changes</Badge>
                      <span className="text-muted-foreground">
                        ({comparison.differences.param_changes.length})
                      </span>
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {comparison.differences.param_changes.map((change, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quality delta */}
                {comparison.differences.quality_delta !== 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Quality Score Change</h4>
                    <div
                      className={cn(
                        'text-2xl font-bold',
                        comparison.differences.quality_delta > 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      )}
                    >
                      {comparison.differences.quality_delta > 0 ? '+' : ''}
                      {comparison.differences.quality_delta.toFixed(1)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {comparison.differences.quality_delta > 0
                        ? 'Improvement in quality'
                        : 'Decrease in quality'}
                    </p>
                  </div>
                )}

                {/* No changes */}
                {comparison.differences.style_changes.length === 0 &&
                  comparison.differences.param_changes.length === 0 &&
                  comparison.differences.quality_delta === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No detectable differences between these versions
                    </p>
                  )}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for version card
function VersionCard({
  version,
  label,
}: {
  version: RenderVersion | null;
  label: string;
}) {
  if (!version) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          No version selected
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold mb-1">
            {label}: Version {version.version_number}
          </h3>
          <p className="text-sm text-muted-foreground">{version.change_summary}</p>
        </div>

        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-3">
          <img
            src={version.render_url}
            alt={`Version ${version.version_number}`}
            className="w-full h-full object-contain"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2"
            onClick={() => window.open(version.render_url, '_blank')}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 text-sm">
          {version.quality_score && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quality Score:</span>
              <span className="font-medium">{version.quality_score.toFixed(1)}/10</span>
            </div>
          )}

          {version.user_rating && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">User Rating:</span>
              <span className="font-medium">{version.user_rating}/5 ⭐</span>
            </div>
          )}

          {version.is_approved && (
            <Badge variant="secondary" className="w-full justify-center">
              Approved
            </Badge>
          )}

          {version.is_final && (
            <Badge variant="default" className="w-full justify-center bg-green-600">
              Final Version
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
