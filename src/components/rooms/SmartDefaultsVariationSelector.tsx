/**
 * Smart Defaults Variation Selector Component
 * Feature F-035: Variation Selection UI
 * 
 * Allows users to select premium/mid-range/budget variations for each furniture category
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Crown, 
  DollarSign, 
  Sparkles 
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface VariationOption {
  tier: 'premium' | 'mid_range' | 'budget';
  description: string;
  estimatedCost: number;
  features: string[];
}

interface CategoryVariations {
  category: string;
  priority: 'ESSENTIAL' | 'RECOMMENDED' | 'OPTIONAL';
  variations: {
    premium: string[];
    mid_range: string[];
    budget: string[];
  };
}

interface SmartDefaultsVariationSelectorProps {
  variations: CategoryVariations[];
  selectedTier: 'premium' | 'mid_range' | 'budget';
  selectedVariations: Record<string, string>; // category -> selected variation
  onVariationChange: (category: string, variation: string, tier: string) => void;
  cityMultiplier?: number;
  showCosts?: boolean;
}

export function SmartDefaultsVariationSelector({
  variations,
  selectedTier,
  selectedVariations,
  onVariationChange,
  cityMultiplier = 1.0,
  showCosts = true,
}: SmartDefaultsVariationSelectorProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'mid_range':
        return <Sparkles className="h-4 w-4 text-blue-500" />;
      case 'budget':
        return <DollarSign className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case 'premium':
        return 'Premium';
      case 'mid_range':
        return 'Mid-Range';
      case 'budget':
        return 'Budget';
      default:
        return tier;
    }
  };

  const getTierMultiplier = (tier: string) => {
    switch (tier) {
      case 'premium':
        return 2.5;
      case 'mid_range':
        return 1.0;
      case 'budget':
        return 0.5;
      default:
        return 1.0;
    }
  };

  const estimateCategoryCost = (category: string, tier: string): number => {
    // Base costs per category (in INR)
    const baseCosts: Record<string, number> = {
      'SOFA': 50000,
      'TABLE': 30000,
      'CHAIR': 15000,
      'BED': 60000,
      'WARDROBE': 80000,
      'TV_UNIT': 40000,
      'LIGHTING': 25000,
      'CURTAINS': 20000,
      'RUG': 15000,
      'DECOR': 10000,
      'SHELVING': 35000,
      'DESK': 25000,
    };

    const baseCost = baseCosts[category.toUpperCase()] || 20000;
    const tierMultiplier = getTierMultiplier(tier);
    
    return Math.round(baseCost * tierMultiplier * cityMultiplier);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const priorityColors = {
    'ESSENTIAL': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    'RECOMMENDED': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    'OPTIONAL': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Furniture & Decor Variations
        </CardTitle>
        <CardDescription>
          Select specific variations for each category. Currently showing <strong>{getTierLabel(selectedTier)}</strong> tier.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {variations.map((categoryVariation) => {
          const isExpanded = expandedCategories.has(categoryVariation.category);
          const tierVariations = categoryVariation.variations[selectedTier] || [];
          const currentSelection = selectedVariations[categoryVariation.category] || tierVariations[0];

          return (
            <Card key={categoryVariation.category} className="border-muted">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">
                      {categoryVariation.category.replace('_', ' ')}
                    </h4>
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs", priorityColors[categoryVariation.priority])}
                    >
                      {categoryVariation.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {showCosts && (
                      <span className="text-xs text-muted-foreground">
                        ~{formatCurrency(estimateCategoryCost(categoryVariation.category, selectedTier))}
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => toggleCategory(categoryVariation.category)}
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                {!isExpanded && currentSelection && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentSelection}
                  </p>
                )}
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <RadioGroup
                    value={currentSelection}
                    onValueChange={(value) =>
                      onVariationChange(categoryVariation.category, value, selectedTier)
                    }
                    className="space-y-2"
                  >
                    {tierVariations.map((variation, index) => (
                      <label
                        key={index}
                        className={cn(
                          "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                          currentSelection === variation
                            ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                            : 'bg-card hover:border-primary/50'
                        )}
                      >
                        <RadioGroupItem
                          value={variation}
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{variation}</span>
                            {currentSelection === variation && (
                              <Check className="h-4 w-4 text-primary ml-auto" />
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>

                  {tierVariations.length === 0 && (
                    <p className="text-xs text-muted-foreground italic py-2">
                      No variations available for {getTierLabel(selectedTier)} tier
                    </p>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}

        {variations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No variations available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
