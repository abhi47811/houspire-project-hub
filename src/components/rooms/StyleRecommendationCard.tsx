/**
 * Style Recommendation Card Component
 * 
 * Individual card displaying a single style recommendation with:
 * - Style name and confidence badge
 * - Budget fit indicator
 * - Estimated cost
 * - Pros and cons lists
 * - Sample images (optional)
 * - Select/View details actions
 * 
 * Size Target: 5-7 KB | ~180-220 lines
 */

import React from 'react';
import { Check, X, Eye, Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { StyleRecommendation } from '@/services/features/recommendationService';

// =====================================================
// COMPONENT PROPS
// =====================================================

interface StyleRecommendationCardProps {
  recommendation: StyleRecommendation;
  isSelected: boolean;
  onSelect: (styleName: string) => void;
  onViewDetails: (styleName: string) => void;
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Get confidence color based on score
 */
function getConfidenceColor(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  return 'bg-orange-500';
}

/**
 * Get budget fit color and icon
 */
function getBudgetFitStyles(budgetFit: string) {
  switch (budgetFit) {
    case 'under_budget':
      return {
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        icon: '💰',
        label: 'Under Budget',
      };
    case 'within_budget':
      return {
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        icon: '✓',
        label: 'Within Budget',
      };
    case 'over_budget':
      return {
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        icon: '⚠',
        label: 'Over Budget',
      };
    default:
      return {
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        icon: '?',
        label: 'Unknown',
      };
  }
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export function StyleRecommendationCard({
  recommendation,
  isSelected,
  onSelect,
  onViewDetails,
}: StyleRecommendationCardProps) {
  const budgetStyles = getBudgetFitStyles(recommendation.budget_fit);
  const confidenceColor = getConfidenceColor(recommendation.confidence_score);

  return (
    <Card 
      className={`group hover:shadow-lg transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary shadow-lg' : ''
      }`}
    >
      <CardHeader className="space-y-2">
        {/* Style Name & Confidence Badge */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold leading-tight line-clamp-2">
            {recommendation.style_name}
          </h3>
          <Badge 
            className={`${confidenceColor} text-white shrink-0 ml-2`}
          >
            {recommendation.confidence_score}%
          </Badge>
        </div>

        {/* Budget Fit Indicator */}
        <div 
          className={`${budgetStyles.bgColor} ${budgetStyles.color} rounded-md px-3 py-2 flex items-center gap-2 text-sm font-medium`}
        >
          <span className="text-lg">{budgetStyles.icon}</span>
          <span>{budgetStyles.label}</span>
        </div>

        {/* Estimated Cost */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            Estimated Cost
          </span>
          <span className="font-bold text-lg">
            ₹{recommendation.estimated_cost.toLocaleString()}
          </span>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-4 pt-4">
        {/* Reasoning */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Why This Style?
          </p>
          <p className="text-sm leading-relaxed">
            {recommendation.reasoning}
          </p>
        </div>

        {/* Pros */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
            <Check className="h-3 w-3 text-green-600" />
            Advantages
          </p>
          <ul className="space-y-1">
            {recommendation.pros.slice(0, 3).map((pro, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span className="leading-tight">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        {recommendation.cons && recommendation.cons.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
              <X className="h-3 w-3 text-orange-600" />
              Considerations
            </p>
            <ul className="space-y-1">
              {recommendation.cons.slice(0, 2).map((con, index) => (
                <li key={index} className="text-sm flex items-start gap-2 text-muted-foreground">
                  <X className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                  <span className="leading-tight">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sample Images (if available) */}
        {recommendation.sample_images && recommendation.sample_images.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Sample Images
            </p>
            <div className="grid grid-cols-3 gap-2">
              {recommendation.sample_images.slice(0, 3).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-md overflow-hidden bg-muted"
                >
                  <img
                    src={image}
                    alt={`${recommendation.style_name} sample ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <Separator />

      <CardFooter className="flex gap-2 pt-4">
        {/* Select Button */}
        <Button
          className={`flex-1 ${isSelected ? 'bg-green-600 hover:bg-green-700' : ''}`}
          variant={isSelected ? 'default' : 'default'}
          onClick={() => onSelect(recommendation.style_name)}
          disabled={isSelected}
        >
          {isSelected ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Selected
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Select Style
            </>
          )}
        </Button>

        {/* View Details Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onViewDetails(recommendation.style_name)}
          title="View full details"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </CardFooter>

      {/* Selected Indicator Overlay */}
      {isSelected && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-green-600 text-white shadow-lg">
            ✓ Selected
          </Badge>
        </div>
      )}
    </Card>
  );
}

// Export component
export default StyleRecommendationCard;
