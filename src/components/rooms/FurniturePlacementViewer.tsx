/**
 * Furniture Placement Viewer Component
 * 
 * 2D room visualization showing furniture placement with:
 * - SVG-based top-down room view
 * - Draggable furniture items (rectangles)
 * - Item labels and dimensions
 * - Grid snapping (optional)
 * - Zoom controls
 * - Legend with color coding
 * 
 * Size Target: 8-10 KB | ~300-350 lines
 */

import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { FurniturePlacement } from '@/services/features/recommendationService';

// =====================================================
// COMPONENT PROPS
// =====================================================

interface FurniturePlacementViewerProps {
  roomDimensions: {
    length_feet: number;
    width_feet: number;
    height_feet?: number;
    area_sqft?: number;
  };
  placements: FurniturePlacement[];
  onPlacementModified?: (placementId: string, newCoords: { x: number; y: number }) => void;
  onPlacementAccepted?: (placementId: string) => void;
  onPlacementRejected?: (placementId: string) => void;
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Get category color for visualization
 */
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'SOFA': '#3b82f6', // blue
    'TABLE': '#10b981', // green
    'CHAIR': '#f59e0b', // amber
    'BED': '#8b5cf6', // purple
    'STORAGE': '#ef4444', // red
    'WARDROBE': '#ec4899', // pink
    'DESK': '#14b8a6', // teal
  };
  
  const upperCategory = category.toUpperCase();
  for (const key in colors) {
    if (upperCategory.includes(key)) {
      return colors[key];
    }
  }
  
  return '#6b7280'; // gray default
}

/**
 * Get priority color
 */
function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'essential':
      return '#ef4444'; // red
    case 'recommended':
      return '#f59e0b'; // amber
    case 'optional':
      return '#6b7280'; // gray
    default:
      return '#6b7280';
  }
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export function FurniturePlacementViewer({
  roomDimensions,
  placements,
  onPlacementModified,
  onPlacementAccepted,
  onPlacementRejected,
}: FurniturePlacementViewerProps) {
  // ===================================================
  // STATE
  // ===================================================
  
  const [zoom, setZoom] = useState(1);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // ===================================================
  // CONSTANTS
  // ===================================================
  
  const SVG_WIDTH = 600;
  const SVG_HEIGHT = 400;
  const PADDING = 40;
  
  const roomWidth = roomDimensions.length_feet;
  const roomLength = roomDimensions.width_feet;
  
  // Calculate scale factor to fit room in SVG
  const scaleX = (SVG_WIDTH - 2 * PADDING) / roomWidth;
  const scaleY = (SVG_HEIGHT - 2 * PADDING) / roomLength;
  const scale = Math.min(scaleX, scaleY) * zoom;

  // ===================================================
  // HANDLERS
  // ===================================================
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetView = () => {
    setZoom(1);
    setSelectedItem(null);
  };

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName === selectedItem ? null : itemName);
  };

  const handleItemAccept = (itemName: string) => {
    if (onPlacementAccepted) {
      onPlacementAccepted(itemName);
    }
  };

  const handleItemReject = (itemName: string) => {
    if (onPlacementRejected) {
      onPlacementRejected(itemName);
    }
  };

  // ===================================================
  // HELPER FUNCTIONS FOR RENDERING
  // ===================================================
  
  /**
   * Convert placement percentage to SVG coordinates
   */
  const toSVGCoords = (xPercent: number, yPercent: number) => {
    const x = PADDING + (xPercent / 100) * roomWidth * scale;
    const y = PADDING + (yPercent / 100) * roomLength * scale;
    return { x, y };
  };

  /**
   * Convert dimensions from inches to SVG scale
   */
  const toSVGDimensions = (widthInches: number, depthInches: number) => {
    const widthFeet = widthInches / 12;
    const depthFeet = depthInches / 12;
    return {
      width: widthFeet * scale,
      height: depthFeet * scale,
    };
  };

  // ===================================================
  // RENDER
  // ===================================================
  
  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Room: {roomWidth}' × {roomLength}'</p>
              <p className="text-xs text-muted-foreground">
                {placements.length} furniture items
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                disabled={zoom >= 2}
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleResetView}
                title="Reset View"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SVG Room View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Room Layout (Top View)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
            <svg
              width={SVG_WIDTH}
              height={SVG_HEIGHT}
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              className="w-full h-auto"
            >
              {/* Room Outline */}
              <rect
                x={PADDING}
                y={PADDING}
                width={roomWidth * scale}
                height={roomLength * scale}
                fill="white"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="5,5"
              />

              {/* Grid Lines */}
              {Array.from({ length: Math.ceil(roomWidth) }).map((_, i) => (
                <line
                  key={`grid-v-${i}`}
                  x1={PADDING + i * scale}
                  y1={PADDING}
                  x2={PADDING + i * scale}
                  y2={PADDING + roomLength * scale}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: Math.ceil(roomLength) }).map((_, i) => (
                <line
                  key={`grid-h-${i}`}
                  x1={PADDING}
                  y1={PADDING + i * scale}
                  x2={PADDING + roomWidth * scale}
                  y2={PADDING + i * scale}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              ))}

              {/* Furniture Items */}
              {placements.map((item, index) => {
                const coords = toSVGCoords(item.placement.x, item.placement.y);
                const dims = toSVGDimensions(item.dimensions.width, item.dimensions.depth);
                const color = getCategoryColor(item.category);
                const isSelected = selectedItem === item.item_name;
                const isHovered = hoveredItem === item.item_name;

                return (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <g
                          transform={`translate(${coords.x}, ${coords.y}) rotate(${item.placement.rotation})`}
                          onClick={() => handleItemClick(item.item_name)}
                          onMouseEnter={() => setHoveredItem(item.item_name)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className="cursor-pointer"
                        >
                          {/* Furniture Rectangle */}
                          <rect
                            x={-dims.width / 2}
                            y={-dims.height / 2}
                            width={dims.width}
                            height={dims.height}
                            fill={color}
                            fillOpacity={isSelected || isHovered ? 0.8 : 0.6}
                            stroke={isSelected ? '#000' : color}
                            strokeWidth={isSelected ? 3 : 2}
                            rx="4"
                          />

                          {/* Item Label */}
                          {(isSelected || isHovered) && (
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="white"
                              fontSize="10"
                              fontWeight="bold"
                              className="pointer-events-none"
                            >
                              {item.item_name.split(' ')[0]}
                            </text>
                          )}

                          {/* Priority Indicator */}
                          <circle
                            cx={dims.width / 2 - 5}
                            cy={-dims.height / 2 + 5}
                            r="4"
                            fill={getPriorityColor(item.priority)}
                          />
                        </g>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          <p className="font-semibold">{item.item_name}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                          <p className="text-xs">
                            {item.dimensions.width}" × {item.dimensions.depth}"
                          </p>
                          <p className="text-xs">
                            ₹{item.estimated_cost.toLocaleString()}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {item.priority}
                          </Badge>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}

              {/* Dimensions Labels */}
              <text
                x={PADDING + (roomWidth * scale) / 2}
                y={PADDING - 10}
                textAnchor="middle"
                fill="#64748b"
                fontSize="12"
              >
                {roomWidth}'
              </text>
              <text
                x={PADDING - 10}
                y={PADDING + (roomLength * scale) / 2}
                textAnchor="middle"
                fill="#64748b"
                fontSize="12"
                transform={`rotate(-90, ${PADDING - 10}, ${PADDING + (roomLength * scale) / 2})`}
              >
                {roomLength}'
              </text>
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-4 w-4" />
            Legend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Priority Legend */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Priority</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs">Essential</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-xs">Recommended</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                  <span className="text-xs">Optional</span>
                </div>
              </div>
            </div>

            {/* Category Legend */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Categories</p>
              <div className="space-y-1">
                {Array.from(new Set(placements.map(p => p.category))).map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3"
                      style={{ backgroundColor: getCategoryColor(category) }}
                    />
                    <span className="text-xs">{category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Legend */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Actions</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>• Click item to select</p>
                <p>• Hover for details</p>
                <p>• Use zoom controls</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Item Details */}
      {selectedItem && (
        <Card className="border-primary">
          <CardContent className="pt-6">
            {(() => {
              const item = placements.find(p => p.item_name === selectedItem);
              if (!item) return null;

              return (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">{item.item_name}</h4>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <Badge variant="outline">{item.priority}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Dimensions:</span>
                      <p className="font-medium">
                        {item.dimensions.width}" × {item.dimensions.depth}" × {item.dimensions.height}"
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Position:</span>
                      <p className="font-medium">
                        {Math.round(item.placement.x)}%, {Math.round(item.placement.y)}%
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rotation:</span>
                      <p className="font-medium">{item.placement.rotation}°</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Estimated Cost:</span>
                      <p className="font-medium">₹{item.estimated_cost.toLocaleString()}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{item.rationale}</p>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleItemAccept(item.item_name)}
                    >
                      Accept Placement
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleItemReject(item.item_name)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Export component
export default FurniturePlacementViewer;
