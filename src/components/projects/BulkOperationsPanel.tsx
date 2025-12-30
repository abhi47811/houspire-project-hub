import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Layers,
  Play,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import {
  startBulkOperation,
  getBulkOperationStatus,
  BulkOperationProgress,
} from '@/services/bulkOperationsService';

interface Room {
  id: string;
  room_name: string;
  room_type: string;
  current_phase: number;
}

interface BulkOperationsPanelProps {
  projectId: string;
  rooms: Room[];
  onComplete?: () => void;
}

export function BulkOperationsPanel({
  projectId,
  rooms,
  onComplete,
}: BulkOperationsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [operation, setOperation] = useState<'generate' | 'clean' | 'approve' | 'export'>(
    'generate'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<BulkOperationProgress | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSelectAll = () => {
    if (selectedRooms.length === rooms.length) {
      setSelectedRooms([]);
    } else {
      setSelectedRooms(rooms.map((r) => r.id));
    }
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]
    );
  };

  const handleStartOperation = async () => {
    if (selectedRooms.length === 0) {
      toast({
        title: 'No Rooms Selected',
        description: 'Please select at least one room to process.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    try {
      const result = await startBulkOperation({
        projectId,
        roomIds: selectedRooms,
        operation,
      });

      if (result.success) {
        setJobId(result.jobId);
        toast({
          title: 'Bulk Operation Started',
          description: `Processing ${selectedRooms.length} rooms...`,
        });

        // Poll for progress
        pollProgress(result.jobId);
      } else {
        throw new Error(result.error || 'Failed to start bulk operation');
      }
    } catch (error: any) {
      console.error('Bulk operation error:', error);
      toast({
        title: 'Operation Failed',
        description: error.message,
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };

  const pollProgress = async (jobId: string) => {
    const interval = setInterval(async () => {
      const status = await getBulkOperationStatus(jobId);
      if (status) {
        setProgress(status);

        // Check if completed
        if (status.completed + status.failed >= status.total) {
          clearInterval(interval);
          setIsProcessing(false);

          toast({
            title: 'Bulk Operation Complete',
            description: `Completed: ${status.completed}, Failed: ${status.failed}`,
          });

          if (onComplete) {
            onComplete();
          }
        }
      }
    }, 2000); // Poll every 2 seconds

    // Cleanup on unmount
    return () => clearInterval(interval);
  };

  const progressPercentage = progress
    ? ((progress.completed + progress.failed) / progress.total) * 100
    : 0;

  const getOperationLabel = (op: string) => {
    switch (op) {
      case 'generate':
        return 'Generate Renders';
      case 'clean':
        return 'Clean Images';
      case 'approve':
        return 'Approve Rooms';
      case 'export':
        return 'Export Data';
      default:
        return op;
    }
  };

  const getOperationIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="gap-2"
        disabled={rooms.length === 0}
      >
        <Layers className="w-4 h-4" />
        Bulk Operations
        {rooms.length > 0 && (
          <Badge variant="secondary" className="ml-1">
            {rooms.length}
          </Badge>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Bulk Operations
            </DialogTitle>
            <DialogDescription>
              Process multiple rooms at once. Select rooms and choose an operation.
            </DialogDescription>
          </DialogHeader>

          {!isProcessing && !progress && (
            <div className="space-y-6">
              {/* Operation Selection */}
              <div className="space-y-2">
                <Label>Select Operation</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={operation === 'generate' ? 'default' : 'outline'}
                    onClick={() => setOperation('generate')}
                    className="justify-start"
                  >
                    Generate Renders
                  </Button>
                  <Button
                    variant={operation === 'clean' ? 'default' : 'outline'}
                    onClick={() => setOperation('clean')}
                    className="justify-start"
                  >
                    Clean Images
                  </Button>
                  <Button
                    variant={operation === 'approve' ? 'default' : 'outline'}
                    onClick={() => setOperation('approve')}
                    className="justify-start"
                  >
                    Approve Rooms
                  </Button>
                  <Button
                    variant={operation === 'export' ? 'default' : 'outline'}
                    onClick={() => setOperation('export')}
                    className="justify-start"
                  >
                    Export Data
                  </Button>
                </div>
              </div>

              {/* Room Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Select Rooms ({selectedRooms.length} selected)</Label>
                  <Button variant="link" size="sm" onClick={handleSelectAll}>
                    {selectedRooms.length === rooms.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>

                <div className="border rounded-lg divide-y max-h-64 overflow-y-auto">
                  {rooms.map((room) => (
                    <div
                      key={room.id}
                      className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleSelectRoom(room.id)}
                    >
                      <Checkbox
                        checked={selectedRooms.includes(room.id)}
                        onCheckedChange={() => handleSelectRoom(room.id)}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{room.room_name || 'Unnamed Room'}</div>
                        <div className="text-sm text-muted-foreground">
                          {room.room_type} • Phase {room.current_phase}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Progress View */}
          {(isProcessing || progress) && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">
                    {progress?.completed || 0} / {progress?.total || selectedRooms.length}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                  <div className="text-sm text-blue-600 dark:text-blue-400">In Progress</div>
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {progress?.inProgress || 0}
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                  <div className="text-sm text-green-600 dark:text-green-400">Completed</div>
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {progress?.completed || 0}
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                  <div className="text-sm text-red-600 dark:text-red-400">Failed</div>
                  <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                    {progress?.failed || 0}
                  </div>
                </div>
              </div>

              {/* Room Results */}
              {progress?.results && (
                <div className="space-y-2">
                  <Label>Room Status</Label>
                  <div className="border rounded-lg divide-y max-h-48 overflow-y-auto">
                    {progress.results.map((result) => (
                      <div key={result.roomId} className="flex items-center gap-3 p-3">
                        {getOperationIcon(result.status)}
                        <div className="flex-1">
                          <div className="font-medium">{result.roomName}</div>
                          {result.error && (
                            <div className="text-sm text-red-600">{result.error}</div>
                          )}
                        </div>
                        <Badge
                          variant={
                            result.status === 'completed'
                              ? 'default'
                              : result.status === 'failed'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {result.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {!isProcessing && !progress && (
              <>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleStartOperation}
                  disabled={selectedRooms.length === 0}
                  className="gap-2"
                >
                  <Play className="w-4 h-4" />
                  Start {getOperationLabel(operation)}
                </Button>
              </>
            )}
            {(isProcessing || progress) && (
              <Button onClick={() => setIsOpen(false)} variant="outline">
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
