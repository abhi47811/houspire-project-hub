import { useMutationMonitor } from '@/hooks/useMutationMonitor';

/**
 * Provider component that initializes mutation monitoring
 * Place this inside QueryClientProvider in App.tsx
 */
export function MutationMonitorProvider() {
  useMutationMonitor();
  return null;
}

export default MutationMonitorProvider;
