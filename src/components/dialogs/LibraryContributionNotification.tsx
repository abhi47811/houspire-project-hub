import { useState } from 'react';
import { BookOpen, Star, Award, ChevronDown, ChevronUp, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RoomCatalogResult {
  room_id: string;
  cataloged: boolean;
  reason?: string;
  library_id?: string;
  tier?: string;
  message: string;
  room_name?: string;
  quality_score?: number;
}

interface LibraryContributionNotificationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: {
    total_rooms: number;
    cataloged: number;
    featured: number;
    standard: number;
    learning: number;
    skipped: number;
    results: RoomCatalogResult[];
  };
  onViewContributions?: () => void;
}

export function LibraryContributionNotification({
  open,
  onOpenChange,
  results,
  onViewContributions,
}: LibraryContributionNotificationProps) {
  const [showDetails, setShowDetails] = useState(false);

  const catalogedResults = results.results.filter(r => r.cataloged);
  const skippedResults = results.results.filter(r => !r.cataloged);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Project Complete! 🎉
          </DialogTitle>
          <DialogDescription>
            Your renders have been cataloged to the Houspire Library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Summary Stats */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-5 w-5 text-primary" />
              <span className="font-semibold">
                {results.cataloged} render{results.cataloged !== 1 ? 's' : ''} added to Houspire Library!
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {results.featured > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-amber-500">
                    ⭐ Featured
                  </Badge>
                  <span>{results.featured}</span>
                </div>
              )}
              {results.standard > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Standard</Badge>
                  <span>{results.standard}</span>
                </div>
              )}
              {results.learning > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Learning</Badge>
                  <span>{results.learning}</span>
                </div>
              )}
              {results.skipped > 0 && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>⏭️ Skipped</span>
                  <span>{results.skipped}</span>
                </div>
              )}
            </div>
          </div>

          {/* Cataloged Renders */}
          {catalogedResults.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cataloged Renders</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs"
                >
                  {showDetails ? (
                    <>Hide Details <ChevronUp className="ml-1 h-3 w-3" /></>
                  ) : (
                    <>Show Details <ChevronDown className="ml-1 h-3 w-3" /></>
                  )}
                </Button>
              </div>

              {showDetails && (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {catalogedResults.map((result) => (
                    <div
                      key={result.room_id}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✅</span>
                        <span>{result.room_name || `Room ${result.room_id.substring(0, 8)}`}</span>
                        {result.quality_score && (
                          <span className="text-muted-foreground">
                            ({result.quality_score}%)
                          </span>
                        )}
                      </div>
                      <Badge
                        variant={result.tier === 'featured' ? 'default' : 'secondary'}
                        className={result.tier === 'featured' ? 'bg-amber-500' : ''}
                      >
                        {result.tier === 'featured' ? '⭐ Featured' : 'Standard'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Skipped Renders */}
          {showDetails && skippedResults.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">
                Skipped ({skippedResults.length})
              </span>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {skippedResults.map((result) => (
                  <div
                    key={result.room_id}
                    className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 text-xs text-muted-foreground"
                  >
                    <span>⏭️</span>
                    <span>{result.room_name || `Room ${result.room_id.substring(0, 8)}`}</span>
                    <span>-</span>
                    <span>{result.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Thank You Message */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground border-t pt-4">
            <Award className="h-4 w-4" />
            <span>Thank you for helping Houspire improve! 🙏</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
          {onViewContributions && (
            <Button className="flex-1" onClick={onViewContributions}>
              <ExternalLink className="h-4 w-4 mr-2" />
              View My Contributions
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
