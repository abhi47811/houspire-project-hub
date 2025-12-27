import { ReactNode } from 'react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';

interface BulkItem {
  id: string;
  name: string;
  hasIssue?: boolean;
  issueMessage?: string;
}

interface BulkApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  items: BulkItem[];
  onApprove: () => void;
  isLoading?: boolean;
  approveLabel?: string;
  icon?: ReactNode;
}

export function BulkApprovalDialog({
  open,
  onOpenChange,
  title,
  description,
  items,
  onApprove,
  isLoading = false,
  approveLabel = 'Approve All',
  icon,
}: BulkApprovalDialogProps) {
  const itemsWithIssues = items.filter((item) => item.hasIssue);
  const hasWarnings = itemsWithIssues.length > 0;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {icon || <CheckCircle2 className="h-5 w-5 text-primary" />}
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4 space-y-4">
          {/* Affected Items List */}
          <div>
            <p className="text-sm font-medium mb-2">
              Affected items ({items.length})
            </p>
            <ScrollArea className="h-40 rounded-md border">
              <div className="p-2 space-y-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-1 px-2 rounded hover:bg-muted/50"
                  >
                    <span className="text-sm">{item.name}</span>
                    {item.hasIssue && (
                      <Badge variant="outline" className="text-xs text-amber-600">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Issue
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Warning Section */}
          {hasWarnings && (
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    {itemsWithIssues.length} item{itemsWithIssues.length !== 1 ? 's' : ''} with issues detected
                  </p>
                  <ul className="mt-1 text-xs text-amber-700 dark:text-amber-300 space-y-0.5">
                    {itemsWithIssues.slice(0, 3).map((item) => (
                      <li key={item.id}>
                        • {item.name}: {item.issueMessage || 'Unknown issue'}
                      </li>
                    ))}
                    {itemsWithIssues.length > 3 && (
                      <li>• ...and {itemsWithIssues.length - 3} more</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onApprove();
            }}
            disabled={isLoading}
            className={hasWarnings ? 'bg-amber-600 hover:bg-amber-700' : ''}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {approveLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
