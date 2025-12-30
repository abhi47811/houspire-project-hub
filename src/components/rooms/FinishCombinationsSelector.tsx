import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { 
  Palette, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Info,
  Sparkles 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

/**
 * F-036: Finish Combinations Selector Component
 * 
 * Allows users to select finish combinations for different budget tiers:
 * - Premium (2.5x multiplier): High-end materials
 * - Mid-Range (1.0x multiplier): Standard quality
 * - Budget (0.5x multiplier): Cost-effective options
 * 
 * Features:
 * - Visual finish previews with colors
 * - Budget tier selection with multipliers
 * - Grouped finish categories (Flooring, Wall Finish, Ceiling, Hardware, etc.)
 * - Real-time cost estimation
 * - Expandable/collapsible sections
 */

interface Finish {
  type: string;
  value: string;
  color?: string;
  description?: string;
  cost_multiplier?: number;
}

interface FinishCategory {
  name: string;
  finishes: Finish[];
  required: boolean;
  priority: 'essential' | 'recommended' | 'optional';
}

export interface FinishCombination {
  tier: 'premium' | 'mid_range' | 'budget';
  finishes: Finish[];
  estimated_cost?: number;
  cost_multiplier: number;
}

interface FinishCombinationsSelectorProps {
  finishesByTier: {
    premium: Finish[];
    mid_range: Finish[];
    budget: Finish[];
  };
  selectedTier?: 'premium' | 'mid_range' | 'budget';
  onTierChange?: (tier: 'premium' | 'mid_range' | 'budget') => void;
  onFinishesChange?: (finishes: Finish[]) => void;
  cityMultiplier?: number;
  className?: string;
}

export function FinishCombinationsSelector({
  finishesByTier,
  selectedTier = 'mid_range',
  onTierChange,
  onFinishesChange,
  cityMultiplier = 1.0,
  className,
}: FinishCombinationsSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [customSelections, setCustomSelections] = useState<Record<string, string>>({});

  // Get tier multipliers
  const tierMultipliers = {
    premium: 2.5,
    mid_range: 1.0,
    budget: 0.5,
  };

  // Get current tier finishes
  const currentFinishes = finishesByTier[selectedTier] || [];

  // Group finishes by type/category
  const finishCategories = groupFinishesByCategory(currentFinishes);

  // Calculate estimated cost
  const baseCost = 50000; // Base cost in INR
  const estimatedCost = Math.round(
    baseCost * tierMultipliers[selectedTier] * cityMultiplier
  );

  function groupFinishesByCategory(finishes: Finish[]): FinishCategory[] {
    const categories: Record<string, Finish[]> = {};
    
    finishes.forEach((finish) => {
      const category = finish.type || 'Other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(finish);
    });

    // Define priority order
    const priorityOrder: Record<string, 'essential' | 'recommended' | 'optional'> = {
      'Flooring': 'essential',
      'Wall Finish': 'essential',
      'Ceiling': 'essential',
      'Hardware': 'recommended',
      'Lighting Fixtures': 'recommended',
      'Paint': 'essential',
      'Tiles': 'recommended',
      'Countertop': 'recommended',
      'Backsplash': 'optional',
      'Trim': 'optional',
    };

    return Object.entries(categories).map(([name, finishes]) => ({
      name,
      finishes,
      required: priorityOrder[name] === 'essential',
      priority: priorityOrder[name] || 'optional',
    }));
  }

  function handleTierChange(tier: 'premium' | 'mid_range' | 'budget') {
    onTierChange?.(tier);
    setCustomSelections({});
    onFinishesChange?.(finishesByTier[tier] || []);
  }

  function getPriorityColor(priority: string) {
    switch (priority) {
      case 'essential':
        return 'bg-red-500';
      case 'recommended':
        return 'bg-yellow-500';
      case 'optional':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  }

  function getPriorityLabel(priority: string) {
    switch (priority) {
      case 'essential':
        return 'Essential';
      case 'recommended':
        return 'Recommended';
      case 'optional':
        return 'Optional';
      default:
        return 'Other';
    }
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Finish Combinations</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
        <CardDescription>
          Select finish quality tier for your project
        </CardDescription>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Budget Tier Selector */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Budget Tier</Label>
            <RadioGroup
              value={selectedTier}
              onValueChange={(value) =>
                handleTierChange(value as 'premium' | 'mid_range' | 'budget')
              }
              className="grid grid-cols-3 gap-3"
            >
              {/* Premium Tier */}
              <div className="relative">
                <RadioGroupItem
                  value="premium"
                  id="premium"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="premium"
                  className={cn(
                    'flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all',
                    selectedTier === 'premium' && 'ring-2 ring-primary'
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold">Premium</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    2.5x
                  </Badge>
                  <span className="text-xs text-muted-foreground mt-1">
                    High-end materials
                  </span>
                </Label>
              </div>

              {/* Mid-Range Tier */}
              <div className="relative">
                <RadioGroupItem
                  value="mid_range"
                  id="mid_range"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="mid_range"
                  className={cn(
                    'flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all',
                    selectedTier === 'mid_range' && 'ring-2 ring-primary'
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="font-semibold">Mid-Range</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    1.0x
                  </Badge>
                  <span className="text-xs text-muted-foreground mt-1">
                    Standard quality
                  </span>
                </Label>
              </div>

              {/* Budget Tier */}
              <div className="relative">
                <RadioGroupItem
                  value="budget"
                  id="budget"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="budget"
                  className={cn(
                    'flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all',
                    selectedTier === 'budget' && 'ring-2 ring-primary'
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">Budget</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    0.5x
                  </Badge>
                  <span className="text-xs text-muted-foreground mt-1">
                    Cost-effective
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Estimated Cost */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Estimated Cost:</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Based on {selectedTier.replace('_', ' ')} tier
                    <br />
                    City multiplier: {cityMultiplier}x
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="text-lg font-bold text-primary">
              ₹{estimatedCost.toLocaleString('en-IN')}
            </span>
          </div>

          <Separator />

          {/* Finish Categories */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Selected Finishes</Label>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  <div className={cn('w-2 h-2 rounded-full mr-1', getPriorityColor('essential'))} />
                  Essential
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <div className={cn('w-2 h-2 rounded-full mr-1', getPriorityColor('recommended'))} />
                  Recommended
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <div className={cn('w-2 h-2 rounded-full mr-1', getPriorityColor('optional'))} />
                  Optional
                </Badge>
              </div>
            </div>

            {finishCategories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full',
                      getPriorityColor(category.priority)
                    )}
                  />
                  <Label className="text-sm font-medium">{category.name}</Label>
                  <Badge variant="outline" className="text-xs">
                    {getPriorityLabel(category.priority)}
                  </Badge>
                </div>

                <div className="grid gap-2 pl-4">
                  {category.finishes.map((finish, index) => (
                    <div
                      key={`${finish.type}-${index}`}
                      className="flex items-center gap-3 p-2 rounded-md bg-muted/50"
                    >
                      {finish.color && (
                        <div
                          className="w-8 h-8 rounded border-2 border-border shrink-0"
                          style={{ backgroundColor: finish.color }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {finish.value}
                        </div>
                        {finish.description && (
                          <div className="text-xs text-muted-foreground truncate">
                            {finish.description}
                          </div>
                        )}
                      </div>
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {finishCategories.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Palette className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No finishes available for this tier</p>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
