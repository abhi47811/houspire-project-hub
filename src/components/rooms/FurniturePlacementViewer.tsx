/**
 * F-050: Furniture Placement Viewer Component
 * 
 * Visual representation of furniture placement recommendations
 * based on room dimensions and layout rules.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Info, Ruler, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { PlacementRecommendation, PlacementRule, RoomLayout } from '@/lib/furniturePlacement';

interface FurniturePlacementViewerProps {
  recommendations: PlacementRecommendation[];
  layout: RoomLayout;
  rules: PlacementRule[];
  roomDimensions: {
    width: number;
    length: number;
    height?: number;
  };
  className?: string;
}

export function FurniturePlacementViewer({
  recommendations,
  layout,
  rules,
  roomDimensions,
  className,
}: FurniturePlacementViewerProps) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Ruler className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Furniture Placement Guide</CardTitle>
              <CardDescription className="text-xs">
                AI-generated layout recommendations
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {recommendations.length} items
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Room Dimensions */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Room Dimensions</span>
            {roomDimensions.width < layout.min_dimensions.width ||
            roomDimensions.length < layout.min_dimensions.length ? (
              <Tooltip>
                <TooltipTrigger>
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Room size is below recommended minimum
                    <br />
                    Minimum: {layout.min_dimensions.width}' × {layout.min_dimensions.length}'
                  </p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {roomDimensions.width}' × {roomDimensions.length}'
            {roomDimensions.height && ` × ${roomDimensions.height}'`}
            {' '}({(roomDimensions.width * roomDimensions.length).toFixed(0)} sq ft)
          </div>
        </div>

        <Separator />

        {/* Focal Points */}
        {layout.focal_points.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Focal Points</div>
            <div className="flex flex-wrap gap-2">
              {layout.focal_points.map((point, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {point.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Traffic Paths */}
        {layout.traffic_paths.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Traffic Flow</div>
            <div className="flex flex-wrap gap-2">
              {layout.traffic_paths.map((path, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {path.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Placement Zones */}
        <div className="space-y-4">
          <div className="text-sm font-medium">Placement Recommendations by Zone</div>

          {layout.placement_zones.map((zone, zoneIdx) => {
            const zoneRecommendations = recommendations.filter(
              (r) => r.zone === zone.name
            );

            if (zoneRecommendations.length === 0) return null;

            return (
              <div key={zoneIdx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium capitalize">
                    {zone.name.replace(/_/g, ' ')}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {zoneRecommendations.length}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground pl-4 mb-2">
                  {zone.purpose}
                </div>

                <div className="space-y-2 pl-4">
                  {zoneRecommendations.map((rec, recIdx) => (
                    <div
                      key={recIdx}
                      className="p-3 bg-muted/50 rounded-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize">
                          {rec.item.replace(/_/g, ' ')}
                        </span>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {rec.position.replace('_', ' ')}
                        </Badge>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {rec.rationale}
                      </div>

                      {/* Clearances */}
                      {(rec.clearances.front || rec.clearances.sides) && (
                        <div className="flex items-center gap-3 text-xs pt-1">
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-3 h-3 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Required clearances</p>
                            </TooltipContent>
                          </Tooltip>
                          <div className="flex gap-3">
                            {rec.clearances.front && (
                              <span>Front: {rec.clearances.front}'</span>
                            )}
                            {rec.clearances.sides && (
                              <span>Sides: {rec.clearances.sides}'</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {recommendations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Ruler className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No placement recommendations available</p>
            <p className="text-xs mt-1">
              Add furniture items to see placement suggestions
            </p>
          </div>
        )}

        <Separator />

        {/* Placement Rules */}
        {rules.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Placement Rules</span>
              <Badge variant="outline" className="text-xs">
                {rules.length} rules
              </Badge>
            </div>
            <div className="space-y-1.5">
              {rules.slice(0, 5).map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-muted-foreground p-2 bg-muted/30 rounded"
                >
                  <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">
                      {rule.description}
                    </div>
                    <div className="text-[11px] mt-0.5">
                      {rule.reason}
                      {rule.min_distance && rule.max_distance && (
                        <span className="text-primary ml-1">
                          ({rule.min_distance}' - {rule.max_distance}')
                        </span>
                      )}
                      {rule.min_distance && !rule.max_distance && (
                        <span className="text-primary ml-1">
                          (min {rule.min_distance}')
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {rules.length > 5 && (
                <div className="text-xs text-muted-foreground text-center pt-1">
                  +{rules.length - 5} more rules
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
