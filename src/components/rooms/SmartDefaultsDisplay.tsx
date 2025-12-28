import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Sparkles, 
  Sofa, 
  Lightbulb, 
  Grid, 
  Layers, 
  Palette, 
  ClipboardCheck, 
  Paintbrush,
  Check,
  Edit,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SmartDefault {
  id: string;
  furniture: string[];
  lighting: string;
  flooring: string;
  ceiling: string;
  colors: { name: string; hex: string }[];
  checklist: string[];
  raw: {
    specifications?: { item: string; description?: string; quantity?: number }[];
    finishes?: { type: string; value: string; color?: string }[];
    checklist?: string[];
  } | null;
}

interface SmartDefaultsDisplayProps {
  smartDefaults: SmartDefault;
  styleName: string;
  roomType: string;
  budgetTier?: string;
  onApply?: () => void;
  onCustomize?: () => void;
  isApplying?: boolean;
  showActions?: boolean;
}

export function SmartDefaultsDisplay({
  smartDefaults,
  styleName,
  roomType,
  budgetTier = 'Mid-Range',
  onApply,
  onCustomize,
  isApplying = false,
  showActions = true,
}: SmartDefaultsDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="overflow-hidden border-primary/20">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">
                Smart Defaults for {styleName.replace('_', ' ')}
              </CardTitle>
              <CardDescription className="text-xs">
                Pre-configured specifications for {roomType.replace('_', ' ')}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {budgetTier}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-4 space-y-5">
          {/* Furniture Section */}
          <div>
            <Label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Sofa className="h-4 w-4 text-muted-foreground" />
              Furniture & Decor
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {smartDefaults.furniture.slice(0, 6).map((spec, index) => (
                <div key={index} className="flex items-start gap-2 p-2.5 bg-muted/50 rounded-lg">
                  <Check className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs leading-relaxed">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lighting Section */}
          <div>
            <Label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
              Lighting Plan
            </Label>
            <div className="p-2.5 bg-muted/50 rounded-lg">
              <p className="text-xs">{smartDefaults.lighting}</p>
            </div>
          </div>

          {/* Flooring & Ceiling Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                <Grid className="h-4 w-4 text-muted-foreground" />
                Flooring
              </Label>
              <div className="p-2.5 bg-muted/50 rounded-lg">
                <p className="text-xs">{smartDefaults.flooring}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                <Layers className="h-4 w-4 text-muted-foreground" />
                Ceiling
              </Label>
              <div className="p-2.5 bg-muted/50 rounded-lg">
                <p className="text-xs">{smartDefaults.ceiling}</p>
              </div>
            </div>
          </div>

          {/* Color Palette Section */}
          {smartDefaults.colors.length > 0 && (
            <div>
              <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                Color Palette
              </Label>
              <div className="flex gap-3 flex-wrap">
                {smartDefaults.colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-10 h-10 rounded-lg border-2 border-border shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <p className="text-xs font-medium">{color.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checklist Section */}
          {smartDefaults.checklist.length > 0 && (
            <div>
              <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                Design Checklist
              </Label>
              <div className="grid grid-cols-2 gap-1.5">
                {smartDefaults.checklist.slice(0, 6).map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Finishes Section */}
          {smartDefaults.raw?.finishes && smartDefaults.raw.finishes.length > 0 && (
            <div>
              <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                <Paintbrush className="h-4 w-4 text-muted-foreground" />
                Material Finishes
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {smartDefaults.raw.finishes.slice(0, 4).map((finish, index) => (
                  <div key={index} className="p-2.5 bg-muted/50 rounded-lg">
                    <p className="text-xs font-medium capitalize mb-0.5">{finish.type.replace('_', ' ')}</p>
                    <p className="text-xs text-muted-foreground">{finish.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}

      {showActions && (
        <CardFooter className="flex gap-3 pt-4 border-t bg-muted/20">
          {onCustomize && (
            <Button 
              variant="outline" 
              onClick={onCustomize}
              className="flex-1"
              size="sm"
            >
              <Edit className="h-4 w-4 mr-2" />
              Customize
            </Button>
          )}
          {onApply && (
            <Button 
              onClick={onApply}
              className="flex-1"
              size="sm"
              disabled={isApplying}
            >
              <Check className="h-4 w-4 mr-2" />
              {isApplying ? 'Applying...' : 'Apply & Continue'}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
