/**
 * F-061: Version Comparison Component
 * 
 * Side-by-side comparison of two render versions with
 * detailed difference analysis and visual comparison.
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  GitCompare,
  Check,
  X,
  Star,
  ArrowRight,
  Info,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VersionComparison } from '@/services/features/refinementService';

interface VersionComparisonComponentProps {
  comparison: VersionComparison;
  onSelectVersion?: (versionId: string) => void;
  className?: string;
}

export function VersionComparisonComponent({
  comparison,
  onSelectVersion,
  className,
}: VersionComparisonComponentProps) {
  const { version_a, version_b, differences } = comparison;

  const getDifferenceIcon = (diff: number) => {
    if (diff > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (diff < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return null;
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <GitCompare className="w-4 h-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">Version Comparison</CardTitle>
            <CardDescription className="text-xs">
              Side-by-side analysis of render versions
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Image Comparison */}
        <div className="grid grid-cols-2 gap-4">
          {/* Version A */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                Version {version_a.version_number}
              </Badge>
              {version_a.is_approved && (
                <Badge variant="default" className="text-xs">
                  <Check className="w-3 h-3 mr-1" />
                  Approved
                </Badge>
              )}
              {version_a.is_favorite && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              )}
            </div>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={version_a.thumbnail_url || version_a.image_url}
                alt={`Version ${version_a.version_number}`}
                className="w-full h-full object-cover"
              />
            </div>
            {version_a.quality_score && (
              <div className="text-xs text-center text-muted-foreground">
                Quality: {version_a.quality_score}/100
              </div>
            )}
          </div>

          {/* Version B */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                Version {version_b.version_number}
              </Badge>
              {version_b.is_approved && (
                <Badge variant="default" className="text-xs">
                  <Check className="w-3 h-3 mr-1" />
                  Approved
                </Badge>
              )}
              {version_b.is_favorite && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              )}
            </div>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={version_b.thumbnail_url || version_b.image_url}
                alt={`Version ${version_b.version_number}`}
                className="w-full h-full object-cover"
              />
            </div>
            {version_b.quality_score && (
              <div className="text-xs text-center text-muted-foreground">
                Quality: {version_b.quality_score}/100
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Differences Analysis */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Info className="w-4 h-4 text-muted-foreground" />
            <span>Key Differences</span>
          </div>

          {/* Style Change */}
          {differences.style_changed && (
            <Alert>
              <AlertDescription className="text-xs">
                <div className="font-medium mb-1">Style Changed</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{version_a.style_id}</span>
                  <ArrowRight className="w-3 h-3" />
                  <span>{version_b.style_id}</span>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Quality Difference */}
          {differences.quality_difference !== 0 && (
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">Quality Score Change</span>
              <div className="flex items-center gap-2">
                {getDifferenceIcon(differences.quality_difference)}
                <span className={cn(
                  'text-sm font-medium',
                  differences.quality_difference > 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  {differences.quality_difference > 0 ? '+' : ''}
                  {differences.quality_difference.toFixed(1)} points
                </span>
              </div>
            </div>
          )}

          {/* Parameter Changes */}
          {differences.param_differences.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground">
                Parameter Changes
              </div>
              {differences.param_differences.map((diff, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span>{diff}</span>
                </div>
              ))}
            </div>
          )}

          {/* No Changes */}
          {!differences.style_changed &&
            differences.quality_difference === 0 &&
            differences.param_differences.length === 0 && (
              <Alert>
                <AlertDescription className="text-xs">
                  No significant differences detected between versions
                </AlertDescription>
              </Alert>
            )}
        </div>

        <Separator />

        {/* Actions */}
        {onSelectVersion && (
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectVersion(version_a.id)}
            >
              Select Version {version_a.version_number}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectVersion(version_b.id)}
            >
              Select Version {version_b.version_number}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
