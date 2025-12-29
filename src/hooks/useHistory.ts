import { useState, useCallback, useRef } from 'react';

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

interface UseHistoryReturn<T> {
  state: T;
  setState: (newState: T | ((prev: T) => T)) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clear: () => void;
  historyLength: number;
}

const MAX_HISTORY = 20;

export function useHistory<T>(initialState: T): UseHistoryReturn<T> {
  const [history, setHistory] = useState<HistoryState<T>>({
    past: [],
    present: initialState,
    future: [],
  });

  // Ref to track if this is a programmatic undo/redo
  const isUndoRedo = useRef(false);

  const setState = useCallback((newState: T | ((prev: T) => T)) => {
    setHistory((prev) => {
      const resolvedState = typeof newState === 'function'
        ? (newState as (prev: T) => T)(prev.present)
        : newState;

      // Don't add to history if state hasn't changed
      if (JSON.stringify(resolvedState) === JSON.stringify(prev.present)) {
        return prev;
      }

      // If this is from undo/redo, don't update history
      if (isUndoRedo.current) {
        isUndoRedo.current = false;
        return { ...prev, present: resolvedState };
      }

      // Normal state update - add to history
      const newPast = [...prev.past, prev.present].slice(-MAX_HISTORY);
      return {
        past: newPast,
        present: resolvedState,
        future: [], // Clear future on new action
      };
    });
  }, []);

  const undo = useCallback(() => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev;

      const newPast = prev.past.slice(0, -1);
      const newPresent = prev.past[prev.past.length - 1];
      const newFuture = [prev.present, ...prev.future];

      isUndoRedo.current = true;

      return {
        past: newPast,
        present: newPresent,
        future: newFuture,
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev;

      const newPresent = prev.future[0];
      const newFuture = prev.future.slice(1);
      const newPast = [...prev.past, prev.present];

      isUndoRedo.current = true;

      return {
        past: newPast,
        present: newPresent,
        future: newFuture,
      };
    });
  }, []);

  const clear = useCallback(() => {
    setHistory((prev) => ({
      past: [],
      present: prev.present,
      future: [],
    }));
  }, []);

  return {
    state: history.present,
    setState,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    clear,
    historyLength: history.past.length,
  };
}
