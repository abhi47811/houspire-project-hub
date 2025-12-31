/**
 * F-021 & F-028: Architectural Preservation Settings UI
 * 
 * Component for viewing and configuring architectural preservation settings.
 * Shows detected elements and allows users to enable/disable preservation.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Building2,
  DoorOpen,
  Frame,
  Ruler,
  Shield,
  AlertCircle,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ArchitecturalElement {
  type: 'door' | 'window' | 'built_in' | 'column' | 'beam' | 'alcove' | 'niche';
  count: number;
  locations?: string[];
}

interface RoomDimensions {
  length?: number;
  width?: number;
  height?: number;
  area?: number;
  unit: 'feet' | 'meters';
}

interface ArchitecturalPreservationSettingsProps {
  elements: ArchitecturalElement[];
  dimensions: RoomDimensions;
  preserveDoors: boolean;
  preserveWindows: boolean;
  preserveBuiltIns: boolean;
  onPreservationChange: (preferences: {
    preserve_doors?: boolean;
    preserve_windows?: boolean;
    preserve_built_ins?: boolean;
  }) => void;
  isUpdating?: boolean;
  className?: string;
}

export function ArchitecturalPreservationSettings({
  elements,
  dimensions,
  preserveDoors,
  preserveWindows,
  preserveBuiltIns,
  onPreservationChange,
  isUpdating = false,
  className,
}: ArchitecturalPreservationSettingsProps) {
  const [localPreferences, setLocalPreferences] = useState({
    preserve_doors: preserveDoors,
    preserve_windows: preserveWindows,
    preserve_built_ins: preserveBuiltIns,
  });

  function handleToggle(key: keyof typeof localPreferences, value: boolean) {
    const newPreferences = {
      ...localPreferences,
      [key]: value,
    };
    setLocalPreferences(newPreferences);
    onPreservationChange(newPreferences);
  }

  const doorElement = elements.find((e) => e.type === 'door');
  const windowElement = elements.find((e) => e.type === 'window');
  const builtInElement = elements.find((e) => e.type === 'built_in');

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">Architectural Preservation</CardTitle>
            <CardDescription className="text-xs">
              Control which elements to preserve in renders
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Room Dimensions */}
        {dimensions.length && dimensions.width && (
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Ruler className="w-4 h-4 text-muted-foreground" />
              Room Dimensions
            </Label>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Size:</span>
                <span className="text-sm font-medium">
                  {dimensions.length}' × {dimensions.width}'
                  {dimensions.height && ` × ${dimensions.height}'`}
                </span>
              </div>
              {dimensions.area && (
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-muted-foreground">Area:</span>
                  <span className="text-sm font-medium">
                    {dimensions.area} sq ft
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <Separator />

        {/* Detected Elements */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            Detected Elements
          </Label>

          {/* Doors */}
          {doorElement && doorElement.count > 0 && (
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <DoorOpen className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">
                    Doors
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {doorElement.count}
                    </Badge>
                  </div>
                  {doorElement.locations && doorElement.locations.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      {doorElement.locations.join(', ')}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      When enabled, AI will maintain door count and positions
                    </p>
                  </TooltipContent>
                </Tooltip>
                <Switch
                  checked={localPreferences.preserve_doors}
                  onCheckedChange={(checked) => handleToggle('preserve_doors', checked)}
                  disabled={isUpdating}
                />
              </div>
            </div>
          )}

          {/* Windows */}
          {windowElement && windowElement.count > 0 && (
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Frame className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">
                    Windows
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {windowElement.count}
                    </Badge>
                  </div>
                  {windowElement.locations && windowElement.locations.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      {windowElement.locations.join(', ')}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      When enabled, AI will maintain window count and positions
                    </p>
                  </TooltipContent>
                </Tooltip>
                <Switch
                  checked={localPreferences.preserve_windows}
                  onCheckedChange={(checked) => handleToggle('preserve_windows', checked)}
                  disabled={isUpdating}
                />
              </div>
            </div>
          )}

          {/* Built-ins */}
          {builtInElement && (
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Built-in Storage</div>
                  {builtInElement.count > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Detected in original image
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      When enabled, AI will preserve built-in furniture and storage
                    </p>
                  </TooltipContent>
                </Tooltip>
                <Switch
                  checked={localPreferences.preserve_built_ins}
                  onCheckedChange={(checked) => handleToggle('preserve_built_ins', checked)}
                  disabled={isUpdating}
                />
              </div>
            </div>
          )}

          {elements.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <Building2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No architectural elements detected</p>
              <p className="text-xs mt-1">
                Upload an image and run AI analysis to detect elements
              </p>
            </div>
          )}
        </div>

        <Separator />

        {/* Preservation Status */}
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-primary">
                Preservation Active
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                AI renders will maintain the room's actual structure and dimensions.
                Detected elements will be preserved in the generated designs.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
