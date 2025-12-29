import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Keyboard } from 'lucide-react';

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ShortcutGroup {
  title: string;
  shortcuts: { keys: string[]; description: string }[];
}

const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const cmdKey = isMac ? '⌘' : 'Ctrl';

const shortcutGroups: ShortcutGroup[] = [
  {
    title: 'Navigation',
    shortcuts: [
      { keys: [cmdKey, 'K'], description: 'Open global search' },
      { keys: [cmdKey, 'N'], description: 'Create new project' },
      { keys: ['Esc'], description: 'Close dialog / Go back' },
      { keys: ['←', '→'], description: 'Navigate between phases' },
    ],
  },
  {
    title: 'Actions',
    shortcuts: [
      { keys: [cmdKey, 'Enter'], description: 'Continue to next phase' },
      { keys: [cmdKey, 'R'], description: 'Regenerate render' },
      { keys: [cmdKey, 'A'], description: 'Approve current item' },
      { keys: [cmdKey, 'S'], description: 'Save current settings' },
      { keys: [cmdKey, 'U'], description: 'Upload image' },
    ],
  },
  {
    title: 'Edit',
    shortcuts: [
      { keys: [cmdKey, 'Z'], description: 'Undo' },
      { keys: [cmdKey, 'Shift', 'Z'], description: 'Redo' },
      { keys: [cmdKey, 'C'], description: 'Copy settings from room' },
      { keys: [cmdKey, 'T'], description: 'Save as template' },
    ],
  },
  {
    title: 'Help',
    shortcuts: [
      { keys: ['?'], description: 'Show keyboard shortcuts' },
    ],
  },
];

export function KeyboardShortcutsDialog({
  open,
  onOpenChange,
}: KeyboardShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Use these shortcuts to work faster.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto">
          {shortcutGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {group.title}
              </h3>
              <div className="space-y-2">
                {group.shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1.5"
                  >
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span key={keyIndex}>
                          <kbd className="px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted border rounded-md shadow-sm">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-muted-foreground mx-0.5">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t text-center text-xs text-muted-foreground">
          Press <kbd className="px-1.5 py-0.5 text-xs bg-muted border rounded">?</kbd> anywhere to show this dialog
        </div>
      </DialogContent>
    </Dialog>
  );
}
