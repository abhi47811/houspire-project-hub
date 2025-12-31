/**
 * F-073: Budget Breakdown Display Component
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  IndianRupee,
  PieChart,
  Package,
  Download,
  TrendingUp,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { BudgetSummary } from '@/services/features/budgetService';

interface BudgetBreakdownDisplayProps {
  budget: BudgetSummary;
  onExport?: () => void;
  onOptimize?: () => void;
  className?: string;
}

export function BudgetBreakdownDisplay({
  budget,
  onExport,
  onOptimize,
  className,
}: BudgetBreakdownDisplayProps) {
  // Calculate percentages for categories
  const categoryPercentages = Object.entries(budget.by_category).map(
    ([category, amount]) => ({
      category,
      amount,
      percentage: (amount / budget.total_cost) * 100,
    })
  ).sort((a, b) => b.amount - a.amount);

  // Group items by priority
  const itemsByPriority = {
    essential: budget.items.filter((i) => i.priority === 'essential'),
    recommended: budget.items.filter((i) => i.priority === 'recommended' || !i.priority),
    optional: budget.items.filter((i) => i.priority === 'optional'),
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <IndianRupee className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Budget Breakdown</CardTitle>
              <CardDescription className="text-xs">
                {budget.room_type?.replace('_', ' ') || 'Project'} {budget.room_area ? `• ${budget.room_area} sq ft` : ''}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs capitalize">
              {budget.budget_tier.replace('_', ' ')}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {budget.city}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Total Cost Summary */}
        <div className="p-4 bg-gradient-to-r from-primary/10 to-transparent rounded-lg">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-sm text-muted-foreground">Total Cost</span>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs space-y-1">
                    <div>Subtotal: ₹{budget.subtotal.toLocaleString('en-IN')}</div>
                    <div>GST: ₹{budget.total_gst.toLocaleString('en-IN')}</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">
            ₹{budget.total_cost.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Includes GST • {budget.items.length} items
          </div>
        </div>

        <Separator />

        {/* Cost Breakdown */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Category Breakdown</span>
          </div>

          <div className="space-y-3">
            {categoryPercentages.map(({ category, amount, percentage }) => (
              <div key={category} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize">{category.replace('_', ' ')}</span>
                  <span className="font-medium">
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={percentage} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Items by Priority */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Items by Priority</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Essential</div>
              <div className="text-lg font-bold text-red-700 dark:text-red-400">
                {itemsByPriority.essential.length}
              </div>
              <div className="text-xs text-muted-foreground">
                ₹{itemsByPriority.essential
                  .reduce((sum, item) => sum + (item.total || 0), 0)
                  .toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Recommended</div>
              <div className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                {itemsByPriority.recommended.length}
              </div>
              <div className="text-xs text-muted-foreground">
                ₹{itemsByPriority.recommended
                  .reduce((sum, item) => sum + (item.total || 0), 0)
                  .toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-3 bg-blue-500/10 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Optional</div>
              <div className="text-lg font-bold text-blue-700 dark:text-blue-400">
                {itemsByPriority.optional.length}
              </div>
              <div className="text-xs text-muted-foreground">
                ₹{itemsByPriority.optional
                  .reduce((sum, item) => sum + (item.total || 0), 0)
                  .toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex gap-2">
          {onOptimize && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOptimize}
              className="flex-1"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Optimize Budget
            </Button>
          )}
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>

        {/* Detailed Items List */}
        <Separator />

        <div className="space-y-2">
          <div className="text-sm font-medium">All Items ({budget.items.length})</div>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {budget.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs p-2 bg-muted/50 rounded"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.item_name}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {item.quantity} {item.unit} • {item.category}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    ₹{(item.total || 0).toLocaleString('en-IN')}
                  </div>
                  <Badge variant="outline" className="text-[10px] h-4 px-1">
                    {item.priority || 'recommended'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
