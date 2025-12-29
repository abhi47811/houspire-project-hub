import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useEnhancedKeyboardShortcuts } from '@/hooks/useEnhancedKeyboardShortcuts';
import { KeyboardShortcutsDialog } from '@/components/dialogs/KeyboardShortcutsDialog';

export function AppLayout() {
  const navigate = useNavigate();
  const [showShortcutsDialog, setShowShortcutsDialog] = useState(false);
  
  // Initialize enhanced keyboard shortcuts
  useEnhancedKeyboardShortcuts({
    onSearch: () => {
      window.dispatchEvent(new CustomEvent('openGlobalSearch'));
    },
    onNewProject: () => {
      navigate('/projects');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('openNewProjectDialog'));
      }, 100);
    },
    onShowHelp: () => {
      setShowShortcutsDialog(true);
    },
    onEscape: () => {
      setShowShortcutsDialog(false);
    },
  });
  
  // Monitor network status
  useNetworkStatus();

  return (
    <div className="flex h-screen w-full">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-to-main sr-only focus:not-sr-only">
        Skip to main content
      </a>
      
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader />
        <main 
          id="main-content" 
          className="flex-1 overflow-auto bg-background p-4 md:p-6"
          role="main"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>
      
      <KeyboardShortcutsDialog 
        open={showShortcutsDialog} 
        onOpenChange={setShowShortcutsDialog} 
      />
    </div>
  );
}
