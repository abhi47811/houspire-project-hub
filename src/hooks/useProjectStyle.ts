import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface StyleBreakdown {
  style: string;
  count: number;
}

export interface ProjectStyleInfo {
  dominantStyle: string | null;
  styleBreakdown: StyleBreakdown[];
  totalRoomsWithStyle: number;
  hasMultipleStyles: boolean;
}

export type ConflictAction = 'cancel' | 'override' | 'apply_all';

export interface ConflictDialogState {
  isOpen: boolean;
  newStyle: string;
  existingStyles: StyleBreakdown[];
  dominantStyle: string | null;
  onResolve: ((action: ConflictAction) => void) | null;
}

export function useProjectStyle(projectId: string, currentRoomId?: string) {
  const [conflictDialog, setConflictDialog] = useState<ConflictDialogState>({
    isOpen: false,
    newStyle: '',
    existingStyles: [],
    dominantStyle: null,
    onResolve: null,
  });

  // Query all rooms in the project to get their styles
  const { data: projectStyleInfo, isLoading, refetch } = useQuery({
    queryKey: ['project-styles', projectId],
    queryFn: async (): Promise<ProjectStyleInfo> => {
      const { data: rooms, error } = await supabase
        .from('rooms')
        .select('id, selected_style')
        .eq('project_id', projectId);

      if (error) throw error;

      // Count styles (excluding current room if provided)
      const styleMap = new Map<string, number>();
      let totalWithStyle = 0;

      for (const room of rooms || []) {
        // Skip current room when calculating existing styles
        if (currentRoomId && room.id === currentRoomId) continue;
        
        if (room.selected_style) {
          totalWithStyle++;
          const count = styleMap.get(room.selected_style) || 0;
          styleMap.set(room.selected_style, count + 1);
        }
      }

      // Convert to array and sort by count descending
      const styleBreakdown: StyleBreakdown[] = Array.from(styleMap.entries())
        .map(([style, count]) => ({ style, count }))
        .sort((a, b) => b.count - a.count);

      const dominantStyle = styleBreakdown.length > 0 ? styleBreakdown[0].style : null;
      const hasMultipleStyles = styleBreakdown.length > 1;

      return {
        dominantStyle,
        styleBreakdown,
        totalRoomsWithStyle: totalWithStyle,
        hasMultipleStyles,
      };
    },
    enabled: !!projectId,
  });

  // Check if a new style conflicts with existing project style
  const hasConflict = useCallback((newStyle: string): boolean => {
    if (!projectStyleInfo || !newStyle) return false;
    if (projectStyleInfo.totalRoomsWithStyle === 0) return false;
    
    // Conflict exists if there are rooms with a different style
    return projectStyleInfo.dominantStyle !== null && 
           projectStyleInfo.dominantStyle !== newStyle;
  }, [projectStyleInfo]);

  // Show conflict dialog and return a promise that resolves with user's choice
  const checkAndConfirmStyle = useCallback((newStyle: string): Promise<ConflictAction> => {
    return new Promise((resolve) => {
      if (!hasConflict(newStyle)) {
        // No conflict, proceed with override (apply to current room)
        resolve('override');
        return;
      }

      // Show dialog
      setConflictDialog({
        isOpen: true,
        newStyle,
        existingStyles: projectStyleInfo?.styleBreakdown || [],
        dominantStyle: projectStyleInfo?.dominantStyle || null,
        onResolve: (action: ConflictAction) => {
          setConflictDialog(prev => ({ ...prev, isOpen: false, onResolve: null }));
          resolve(action);
        },
      });
    });
  }, [hasConflict, projectStyleInfo]);

  // Close the dialog (user cancelled via backdrop click)
  const closeConflictDialog = useCallback(() => {
    if (conflictDialog.onResolve) {
      conflictDialog.onResolve('cancel');
    }
    setConflictDialog(prev => ({ ...prev, isOpen: false, onResolve: null }));
  }, [conflictDialog.onResolve]);

  return {
    projectStyleInfo: projectStyleInfo || {
      dominantStyle: null,
      styleBreakdown: [],
      totalRoomsWithStyle: 0,
      hasMultipleStyles: false,
    },
    isLoading,
    refetch,
    hasConflict,
    checkAndConfirmStyle,
    conflictDialog,
    closeConflictDialog,
  };
}
