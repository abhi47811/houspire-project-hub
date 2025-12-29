import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Palette, CheckCircle } from 'lucide-react';
import { StyleBreakdown, ConflictAction } from '@/hooks/useProjectStyle';

interface StyleConflictDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newStyle: string;
  existingStyles: StyleBreakdown[];
  dominantStyle: string | null;
  onResolve: (action: ConflictAction) => void;
}

export function StyleConflictDialog({
  open,
  onOpenChange,
  newStyle,
  existingStyles,
  dominantStyle,
  onResolve,
}: StyleConflictDialogProps) {
  const totalRooms = existingStyles.reduce((sum, s) => sum + s.count, 0);

  const handleCancel = () => {
    onResolve('cancel');
    onOpenChange(false);
  };

  const handleOverride = () => {
    onResolve('override');
    onOpenChange(false);
  };

  const handleApplyAll = () => {
    onResolve('apply_all');
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        handleCancel();
      }
    }}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Style Conflict Detected
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>
              This project already has rooms with different style(s). Selecting 
              <span className="font-semibold text-foreground"> "{newStyle}"</span> will 
              create visual inconsistency.
            </p>

            {/* Current styles breakdown */}
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Current Project Styles ({totalRooms} room{totalRooms !== 1 ? 's' : ''})
              </p>
              <div className="flex flex-wrap gap-2">
                {existingStyles.map((item) => (
                  <Badge 
                    key={item.style} 
                    variant={item.style === dominantStyle ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    <Palette className="h-3 w-3 mr-1" />
                    {item.style} ({item.count})
                  </Badge>
                ))}
              </div>
            </div>

            {/* What happens with each choice */}
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Recommended:</p>
              <p>Apply "{newStyle}" to all rooms to maintain consistency.</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel onClick={handleCancel} className="mt-0">
            Cancel
          </AlertDialogCancel>
          <Button 
            variant="outline" 
            onClick={handleOverride}
            className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
          >
            Override Anyway
          </Button>
          <AlertDialogAction onClick={handleApplyAll} className="gap-1">
            <CheckCircle className="h-4 w-4" />
            Apply to All Rooms
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
