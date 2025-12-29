import { useState, useEffect, useCallback } from 'react';
import { X, Bug, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, XCircle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface FlowEvent {
  id: string;
  type: 'click' | 'submit' | 'mutation' | 'error' | 'navigation' | 'api';
  target: string;
  timestamp: Date;
  status: 'pending' | 'success' | 'error';
  details?: string;
  duration?: number;
}

interface MutationStats {
  total: number;
  success: number;
  failed: number;
  pending: number;
}

// Global event store
const eventStore: FlowEvent[] = [];
const MAX_EVENTS = 100;
const subscribers = new Set<() => void>();

const addEvent = (event: Omit<FlowEvent, 'id' | 'timestamp'>) => {
  const newEvent: FlowEvent = {
    ...event,
    id: crypto.randomUUID(),
    timestamp: new Date(),
  };
  eventStore.unshift(newEvent);
  if (eventStore.length > MAX_EVENTS) {
    eventStore.pop();
  }
  subscribers.forEach(fn => fn());
  return newEvent.id;
};

const updateEvent = (id: string, updates: Partial<FlowEvent>) => {
  const event = eventStore.find(e => e.id === id);
  if (event) {
    Object.assign(event, updates);
    subscribers.forEach(fn => fn());
  }
};

// Export for use in other hooks
export const flowTracker = {
  addEvent,
  updateEvent,
  trackClick: (target: string) => addEvent({ type: 'click', target, status: 'success' }),
  trackSubmit: (target: string) => addEvent({ type: 'submit', target, status: 'pending' }),
  trackMutation: (name: string) => addEvent({ type: 'mutation', target: name, status: 'pending' }),
  trackError: (message: string, details?: string) => addEvent({ type: 'error', target: message, status: 'error', details }),
  trackNavigation: (path: string) => addEvent({ type: 'navigation', target: path, status: 'success' }),
  trackApi: (endpoint: string) => addEvent({ type: 'api', target: endpoint, status: 'pending' }),
  success: (id: string, duration?: number) => updateEvent(id, { status: 'success', duration }),
  error: (id: string, details?: string) => updateEvent(id, { status: 'error', details }),
};

export function FlowTracker() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [events, setEvents] = useState<FlowEvent[]>([]);
  const [stats, setStats] = useState<MutationStats>({ total: 0, success: 0, failed: 0, pending: 0 });

  // Only show in development
  const isDev = import.meta.env.DEV;

  const updateEvents = useCallback(() => {
    setEvents([...eventStore]);
    
    const mutationEvents = eventStore.filter(e => e.type === 'mutation');
    setStats({
      total: mutationEvents.length,
      success: mutationEvents.filter(e => e.status === 'success').length,
      failed: mutationEvents.filter(e => e.status === 'error').length,
      pending: mutationEvents.filter(e => e.status === 'pending').length,
    });
  }, []);

  useEffect(() => {
    if (!isDev) return;

    subscribers.add(updateEvents);
    updateEvents();

    // Track unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      flowTracker.trackError('Unhandled Promise Rejection', event.reason?.message || String(event.reason));
    };
    window.addEventListener('unhandledrejection', handleRejection);

    // Track global errors
    const handleError = (event: ErrorEvent) => {
      flowTracker.trackError(event.message, `${event.filename}:${event.lineno}`);
    };
    window.addEventListener('error', handleError);

    // Track all button clicks globally
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest('button');
      if (button) {
        const label = button.textContent?.trim() || button.getAttribute('aria-label') || 'Unknown Button';
        flowTracker.trackClick(label);
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      subscribers.delete(updateEvents);
      window.removeEventListener('unhandledrejection', handleRejection);
      window.removeEventListener('error', handleError);
      document.removeEventListener('click', handleClick);
    };
  }, [isDev, updateEvents]);

  if (!isDev) return null;

  const hasErrors = events.some(e => e.status === 'error');
  const hasPending = events.some(e => e.status === 'pending');

  const getEventIcon = (event: FlowEvent) => {
    switch (event.status) {
      case 'success': return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'error': return <XCircle className="h-3 w-3 text-red-500" />;
      case 'pending': return <Activity className="h-3 w-3 text-yellow-500 animate-pulse" />;
    }
  };

  const getEventColor = (type: FlowEvent['type']) => {
    switch (type) {
      case 'click': return 'bg-blue-500/10 text-blue-600';
      case 'submit': return 'bg-purple-500/10 text-purple-600';
      case 'mutation': return 'bg-orange-500/10 text-orange-600';
      case 'error': return 'bg-red-500/10 text-red-600';
      case 'navigation': return 'bg-green-500/10 text-green-600';
      case 'api': return 'bg-cyan-500/10 text-cyan-600';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Collapsed State - Floating Button */}
      {!isOpen && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsOpen(true)}
          className={cn(
            "rounded-full h-10 w-10 p-0 shadow-lg",
            hasErrors && "border-red-500 bg-red-500/10",
            hasPending && !hasErrors && "border-yellow-500 bg-yellow-500/10"
          )}
        >
          <Bug className={cn("h-4 w-4", hasErrors && "text-red-500")} />
          {(hasErrors || hasPending) && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
          )}
        </Button>
      )}

      {/* Expanded Panel */}
      {isOpen && (
        <div className="bg-background border rounded-lg shadow-xl w-80">
          {/* Header */}
          <div className="flex items-center justify-between p-2 border-b bg-muted/50">
            <div className="flex items-center gap-2">
              <Bug className="h-4 w-4" />
              <span className="text-sm font-medium">Flow Tracker</span>
              {hasErrors && <AlertTriangle className="h-3 w-3 text-red-500" />}
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-2 p-2 border-b text-xs">
            <Badge variant="outline" className="text-green-600">
              ✓ {stats.success}
            </Badge>
            <Badge variant="outline" className="text-red-600">
              ✕ {stats.failed}
            </Badge>
            <Badge variant="outline" className="text-yellow-600">
              ⋯ {stats.pending}
            </Badge>
            <span className="text-muted-foreground ml-auto">
              {events.length} events
            </span>
          </div>

          {/* Events List */}
          {!isMinimized && (
            <ScrollArea className="h-64">
              <div className="p-2 space-y-1">
                {events.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    No events tracked yet
                  </p>
                ) : (
                  events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-2 p-1.5 rounded text-xs hover:bg-muted/50"
                    >
                      {getEventIcon(event)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <Badge variant="secondary" className={cn("text-[10px] px-1", getEventColor(event.type))}>
                            {event.type}
                          </Badge>
                          {event.duration && (
                            <span className="text-muted-foreground">{event.duration}ms</span>
                          )}
                        </div>
                        <p className="truncate text-muted-foreground">{event.target}</p>
                        {event.details && (
                          <p className="text-red-500 truncate text-[10px]">{event.details}</p>
                        )}
                      </div>
                      <span className="text-muted-foreground text-[10px]">
                        {event.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          )}
        </div>
      )}
    </div>
  );
}

export default FlowTracker;
