import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import {
  Users,
  FileText,
  Archive,
  Trash2,
  X,
  RefreshCw,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { statusConfig } from '@/hooks/useProjectsData';

interface BatchOperationsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkStatusChange: (status: string) => void;
  onBulkExport: () => void;
  onBulkArchive: () => void;
  onBulkDelete: () => void;
  isAdmin: boolean;
}

export function BatchOperationsBar({
  selectedCount,
  onClearSelection,
  onBulkStatusChange,
  onBulkExport,
  onBulkArchive,
  onBulkDelete,
  isAdmin,
}: BatchOperationsBarProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 bg-card border border-border rounded-lg shadow-lg px-4 py-3">
          <div className="flex items-center gap-2 pr-3 border-r border-border">
            <span className="text-sm font-medium">{selectedCount} selected</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={onClearSelection}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Change Status */}
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
            <Select onValueChange={onBulkStatusChange}>
              <SelectTrigger className="h-8 w-[140px]">
                <SelectValue placeholder="Change Status" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {Object.entries(statusConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>{config.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Export */}
          <Button variant="outline" size="sm" onClick={onBulkExport} className="gap-2">
            <FileText className="h-4 w-4" />
            Export
          </Button>

          {/* Archive */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setArchiveDialogOpen(true)}
            className="gap-2 text-warning hover:text-warning"
          >
            <Archive className="h-4 w-4" />
            Archive
          </Button>

          {/* Delete (Admin only) */}
          {isAdmin && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setDeleteDialogOpen(true)}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedCount} Projects?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all selected projects and their associated rooms, renders, and budget items. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                onBulkDelete();
                setDeleteDialogOpen(false);
              }}
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Archive Confirmation */}
      <AlertDialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive {selectedCount} Projects?</AlertDialogTitle>
            <AlertDialogDescription>
              This will archive all selected projects. You can restore them later from the archived projects section.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onBulkArchive();
                setArchiveDialogOpen(false);
              }}
            >
              Archive All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
