import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { useToast } from '@/hooks/use-toast';
import { useSessionTracking } from '@/hooks/useSessionTracking';
import { useRealtimeSubscriptions } from '@/hooks/useRealtimeSubscriptions';
import {
  ArrowLeft,
  CheckCircle,
  MoreVertical,
  Edit,
  Trash2,
  Upload,
  Search,
  Sparkles,
  Palette,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { PhaseUpload } from '@/components/rooms/PhaseUpload';
import { PhaseAnalyze } from '@/components/rooms/PhaseAnalyze';
import { PhaseClean } from '@/components/rooms/PhaseClean';
import { PhaseCustomize } from '@/components/rooms/PhaseCustomize';
import { PhaseGenerate } from '@/components/rooms/PhaseGenerate';

type RoomType = 'living_room' | 'master_bedroom' | 'bedroom' | 'kitchen' | 'dining_room' | 'balcony' | 'study_room' | 'kids_room' | 'guest_room' | 'pooja_room' | 'home_office' | 'gym' | 'entertainment_room' | 'utility_room';

interface Room {
  id: string;
  project_id: string;
  room_number: number;
  room_name: string | null;
  room_type: RoomType | null;
  length_feet: number | null;
  width_feet: number | null;
  height_feet: number | null;
  current_phase: number;
  phase_1_completed: boolean;
  phase_2_completed: boolean;
  phase_3_completed: boolean;
  phase_4_completed: boolean;
  phase_5_completed: boolean;
  selected_style: string | null;
  final_quality_score: number | null;
  retry_count: number;
  smart_default_id: string | null;
}

interface Project {
  id: string;
  name: string;
}

const roomTypeLabels: Record<RoomType, string> = {
  living_room: 'Living Room',
  master_bedroom: 'Master Bedroom',
  bedroom: 'Bedroom',
  kitchen: 'Kitchen',
  dining_room: 'Dining Room',
  balcony: 'Balcony',
  study_room: 'Study Room',
  kids_room: "Kids Room",
  guest_room: 'Guest Room',
  pooja_room: 'Pooja Room',
  home_office: 'Home Office',
  gym: 'Gym',
  entertainment_room: 'Entertainment Room',
  utility_room: 'Utility Room',
};

const phases = [
  { id: 1, name: 'Upload', icon: Upload, imageType: 'original' },
  { id: 2, name: 'Analyze', icon: Search, imageType: 'original' },
  { id: 3, name: 'Clean', icon: Sparkles, imageType: 'cleaned' },
  { id: 4, name: 'Customize', icon: Palette, imageType: 'cleaned' },
  { id: 5, name: 'Generate', icon: ImageIcon, imageType: 'final' },
];

// Helper to resolve image URLs - handles both full URLs and storage paths
const resolveImageUrl = (path: string): string => {
  if (!path) return '';
  // If it's already a full URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // Otherwise, generate Supabase storage URL with bucket name
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/room-images/${path}`;
};

export default function RoomDetail() {
  const { projectId, roomId } = useParams<{ projectId: string; roomId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [activePhase, setActivePhase] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Session tracking - track user viewing this room
  useSessionTracking({ projectId, roomId });
  
  // Realtime subscriptions for live updates
  useRealtimeSubscriptions({ 
    projectId,
    roomIds: roomId ? [roomId] : [],
    enableNotifications: true,
    enableChangeEvents: true,
    enableJobUpdates: true,
  });

  // Fetch room
  const { data: room, isLoading: roomLoading } = useQuery({
    queryKey: ['room', roomId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', roomId)
        .maybeSingle();
      if (error) throw error;
      return data as Room | null;
    },
    enabled: !!roomId,
  });

  // Fetch project for breadcrumb
  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name')
        .eq('id', projectId)
        .maybeSingle();
      if (error) throw error;
      return data as Project | null;
    },
    enabled: !!projectId,
  });

  // Get the image type based on active phase
  const getImageTypeForPhase = (phase: number) => {
    if (phase <= 2) return 'original';
    if (phase <= 4) return 'cleaned';
    return 'final';
  };

  // Fetch current phase image for the main viewer with fallback to original
  const { data: currentImage, isLoading: imageLoading } = useQuery({
    queryKey: ['room-images', roomId, activePhase],
    queryFn: async () => {
      const imageType = getImageTypeForPhase(activePhase);
      const phaseToQuery = activePhase <= 2 ? 1 : (activePhase <= 4 ? 3 : 5);
      
      // Try to get the phase-specific image
      let { data, error } = await supabase
        .from('room_images')
        .select('*')
        .eq('room_id', roomId!)
        .eq('phase', phaseToQuery)
        .eq('image_type', imageType)
        .maybeSingle();

      // If no image found for current phase, fallback to original
      if (!data && activePhase > 1) {
        const fallbackResult = await supabase
          .from('room_images')
          .select('*')
          .eq('room_id', roomId!)
          .eq('phase', 1)
          .eq('image_type', 'original')
          .maybeSingle();
        
        data = fallbackResult.data;
        if (fallbackResult.error) throw fallbackResult.error;
      }

      if (error) throw error;
      return data;
    },
    enabled: !!roomId,
  });

  // Delete room mutation
  const deleteRoom = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', roomId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Room deleted' });
      navigate(`/projects/${projectId}`);
    },
    onError: (error: Error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // Set active phase based on room's current phase
  useEffect(() => {
    if (room) {
      setActivePhase(room.current_phase);
    }
  }, [room]);

  if (roomLoading) {
    return <RoomDetailSkeleton />;
  }

  if (!room) {
    return (
      <div className="space-y-6">
        <Link to={`/projects/${projectId}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Project
          </Button>
        </Link>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <h3 className="text-lg font-semibold">Room not found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The room you're looking for doesn't exist or you don't have access.
            </p>
            <Link to={`/projects/${projectId}`}>
              <Button className="mt-4">Back to Project</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const roomType = room.room_type ? roomTypeLabels[room.room_type] : 'Unknown';
  const area = room.length_feet && room.width_feet 
    ? (room.length_feet * room.width_feet).toFixed(0) 
    : null;

  const isPhaseCompleted = (phase: number) => {
    const phaseKey = `phase_${phase}_completed` as keyof Room;
    return room[phaseKey] as boolean;
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleZoomReset = () => setZoom(100);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to={`/projects/${projectId}`}>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {project?.name || 'Project'}
        </Button>
      </Link>

      {/* Room Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: Room Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">
                  {room.room_name || `Room ${room.room_number}`}
                </h1>
                <Badge variant="secondary">{roomType}</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {room.length_feet && room.width_feet && (
                  <span>
                    {room.length_feet} × {room.width_feet} ft
                    {room.height_feet && ` × ${room.height_feet} ft`}
                  </span>
                )}
                {area && (
                  <span>• {area} sq ft</span>
                )}
                <span>• Phase {room.current_phase} of 5</span>
              </div>
            </div>

            {/* Right: Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Room
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Room
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Phase Navigation */}
          <div className="mt-6">
            <Tabs value={String(activePhase)} onValueChange={(v) => setActivePhase(Number(v))}>
              <TabsList className="grid w-full grid-cols-5">
                {phases.map((phase) => {
                  const completed = isPhaseCompleted(phase.id);
                  const isCurrent = phase.id === room.current_phase;
                  const Icon = phase.icon;

                  return (
                    <TabsTrigger
                      key={phase.id}
                      value={String(phase.id)}
                      className="relative gap-2"
                    >
                      {completed ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                      <span className="hidden sm:inline">{phase.name}</span>
                      {isCurrent && !completed && (
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Image Viewer */}
        <Card className="min-h-0">
          <CardContent className="p-4">
            {/* Zoom Controls */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">
                Phase {activePhase}: {phases[activePhase - 1].name}
              </span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-sm">{zoom}%</span>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleZoomReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Display */}
            <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              {imageLoading ? (
                <Skeleton className="w-full h-full" />
              ) : currentImage?.storage_path ? (
                <div 
                  className="flex items-center justify-center w-full h-full transition-transform"
                  style={{ transform: `scale(${zoom / 100})` }}
                >
                  <img
                    src={resolveImageUrl(currentImage.storage_path)}
                    alt={`Phase ${activePhase} - ${phases[activePhase - 1].name}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div 
                  className="flex items-center justify-center transition-transform"
                  style={{ transform: `scale(${zoom / 100})` }}
                >
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">No image uploaded yet</p>
                    <p className="text-xs mt-1">Upload an image in Phase 1</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Phase Content Panel */}
        <Card className="min-h-0 flex flex-col max-h-[calc(100vh-380px)] lg:max-h-[calc(100vh-300px)]">
          <CardContent className="p-4 overflow-y-auto flex-1">
            {activePhase === 1 && (
              <PhaseUpload room={room} projectId={projectId!} />
            )}
            {activePhase === 2 && (
              <PhaseAnalyze room={room} projectId={projectId!} />
            )}
            {activePhase === 3 && (
              <PhaseClean room={room} projectId={projectId!} />
            )}
            {activePhase === 4 && (
              <PhaseCustomize room={room} projectId={projectId!} />
            )}
            {activePhase === 5 && (
              <PhaseGenerate room={room} projectId={projectId!} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Room</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this room? This action cannot be undone.
              All associated data including analysis and renders will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteRoom.mutate()}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function RoomDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-32" />
      
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
