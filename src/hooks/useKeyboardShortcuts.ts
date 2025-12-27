import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ShortcutHandlers {
  onSearch?: () => void;
  onNewProject?: () => void;
  onEscape?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers = {}) {
  const navigate = useNavigate();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdKey = isMac ? event.metaKey : event.ctrlKey;

      // Cmd/Ctrl + K: Global search
      if (cmdKey && event.key === 'k') {
        event.preventDefault();
        handlers.onSearch?.();
      }

      // Cmd/Ctrl + N: New project
      if (cmdKey && event.key === 'n') {
        event.preventDefault();
        handlers.onNewProject?.();
      }

      // Escape: Close dialogs
      if (event.key === 'Escape') {
        handlers.onEscape?.();
      }

      // Arrow keys for phase navigation (only if not in an input)
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
        (event.target as HTMLElement).tagName
      );

      if (!isInput) {
        if (event.key === 'ArrowLeft') {
          handlers.onArrowLeft?.();
        }
        if (event.key === 'ArrowRight') {
          handlers.onArrowRight?.();
        }
      }
    },
    [handlers]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

export function useGlobalShortcuts() {
  const navigate = useNavigate();

  useKeyboardShortcuts({
    onNewProject: () => {
      navigate('/projects');
      // Delay to allow navigation, then dispatch custom event
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('openNewProjectDialog'));
      }, 100);
    },
    onSearch: () => {
      window.dispatchEvent(new CustomEvent('openGlobalSearch'));
    },
  });
}
