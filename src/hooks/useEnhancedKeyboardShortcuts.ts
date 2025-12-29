import { useEffect, useCallback, useRef } from 'react';

interface ShortcutHandlers {
  onSearch?: () => void;
  onNewProject?: () => void;
  onEscape?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onContinue?: () => void;
  onRegenerate?: () => void;
  onApprove?: () => void;
  onSave?: () => void;
  onUpload?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onCopySettings?: () => void;
  onSaveTemplate?: () => void;
  onShowHelp?: () => void;
}

export function useEnhancedKeyboardShortcuts(handlers: ShortcutHandlers = {}) {
  // Use ref to avoid stale closures
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdKey = isMac ? event.metaKey : event.ctrlKey;
    const target = event.target as HTMLElement;
    const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
    const isContentEditable = target.isContentEditable;

    // Don't trigger shortcuts when typing in inputs (except for specific ones)
    const canTriggerInInput = ['Escape'].includes(event.key);
    if ((isInput || isContentEditable) && !canTriggerInInput) {
      // Allow Cmd+Z/Y for undo/redo even in inputs
      if (cmdKey && (event.key === 'z' || event.key === 'y')) {
        // Let the browser handle native undo/redo in inputs
        return;
      }
      return;
    }

    // ? - Show keyboard shortcuts help
    if (event.key === '?' && !cmdKey && !event.shiftKey) {
      event.preventDefault();
      handlersRef.current.onShowHelp?.();
      return;
    }

    // Escape - Close dialogs
    if (event.key === 'Escape') {
      handlersRef.current.onEscape?.();
      return;
    }

    // Arrow keys for phase navigation
    if (!isInput && !isContentEditable) {
      if (event.key === 'ArrowLeft') {
        handlersRef.current.onArrowLeft?.();
        return;
      }
      if (event.key === 'ArrowRight') {
        handlersRef.current.onArrowRight?.();
        return;
      }
    }

    // Command/Ctrl shortcuts
    if (cmdKey) {
      switch (event.key.toLowerCase()) {
        case 'k':
          event.preventDefault();
          handlersRef.current.onSearch?.();
          break;
        case 'n':
          event.preventDefault();
          handlersRef.current.onNewProject?.();
          break;
        case 'enter':
          event.preventDefault();
          handlersRef.current.onContinue?.();
          break;
        case 'r':
          event.preventDefault();
          handlersRef.current.onRegenerate?.();
          break;
        case 'a':
          if (!isInput) {
            event.preventDefault();
            handlersRef.current.onApprove?.();
          }
          break;
        case 's':
          event.preventDefault();
          handlersRef.current.onSave?.();
          break;
        case 'u':
          event.preventDefault();
          handlersRef.current.onUpload?.();
          break;
        case 'z':
          event.preventDefault();
          if (event.shiftKey) {
            handlersRef.current.onRedo?.();
          } else {
            handlersRef.current.onUndo?.();
          }
          break;
        case 'y':
          event.preventDefault();
          handlersRef.current.onRedo?.();
          break;
        case 'c':
          if (!isInput) {
            event.preventDefault();
            handlersRef.current.onCopySettings?.();
          }
          break;
        case 't':
          event.preventDefault();
          handlersRef.current.onSaveTemplate?.();
          break;
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// Hook for shortcut hints
export function getShortcutHint(shortcut: string): string {
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const cmdKey = isMac ? '⌘' : 'Ctrl+';
  return shortcut.replace('Cmd+', cmdKey);
}
