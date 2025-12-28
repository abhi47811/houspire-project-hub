import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useProjectApiCostBadge } from '@/hooks/useApiCost';
import { useSessionTracking } from '@/hooks/useSessionTracking';
import { useRealtimeSubscriptions } from '@/hooks/useRealtimeSubscriptions';
import {
  ArrowLeft,
  MapPin,
  Home,
  IndianRupee,
  Calendar,
  CheckCircle,
  Plus,
  Copy,
  Palette,
  FileCheck,
  Image,
  Sparkles,
  Users,
  Zap,
  Download,
  Loader2,
  Trash2,
} from 'lucide-react';
import { format } from 'date-fns';
import { AddRoomForm } from '@/components/projects/AddRoomForm';

type ProjectStatus = 'draft' | 'in_progress' | 'review' | 'approved' | 'completed' | 'cancelled';
type RoomType = 'living_room' | 'master_bedroom' | 'bedroom' | 'kitchen' | 'dining_room' | 'balcony' | 'study_room' | 'kids_room' | 'guest_room' | 'pooja_room' | 'home_office' | 'gym' | 'entertainment_room' | 'utility_room';

interface Project {
  id: string;
  name: string;
  description: string | null;
  client_name: string | null;
  client_email: string | null;
  city: string | null;
  max_rooms: number;
  total_rooms: number;
  status: ProjectStatus;
  current_phase: number;
  deadline: string | null;
  estimated_budget: number | null;
  actual_cost: number | null;
  created_at: string;
}

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
}

const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'bg-muted text-muted-foreground' },
  in_progress: { label: 'In Progress', color: 'bg-primary/10 text-primary' },
  review: { label: 'Review', color: 'bg-warning/10 text-warning' },
  approved: { label: 'Approved', color: 'bg-success/10 text-success' },
  completed: { label: 'Completed', color: 'bg-success/10 text-success' },
  cancelled: { label: 'Cancelled', color: 'bg-destructive/10 text-destructive' },
};

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

const phaseLabels = [
  'Input',
  'Analysis',
  'Cleanup',
  'Styling',
  'Rendering',
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set());
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const isAdmin = profile?.role === 'admin';
  
  // API Cost tracking
  const { formattedCost, callCount } = useProjectApiCostBadge(id || '');
  
  // Session tracking - track user viewing this project
  useSessionTracking({ projectId: id });
  
  // Realtime subscriptions for live updates
  useRealtimeSubscriptions({ 
    projectId: id,
    enableNotifications: true,
    enableChangeEvents: true,
    enableJobUpdates: true,
  });

  // Delete project mutation
  const deleteProject = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Project deleted successfully' });
      navigate('/projects');
    },
    onError: (error) => {
      toast({
        title: 'Failed to delete project',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    },
  });

  // Fetch project
  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Project | null;
    },
    enabled: !!id,
  });

  // Fetch rooms
  const { data: rooms = [], isLoading: roomsLoading } = useQuery({
    queryKey: ['rooms', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('project_id', id)
        .order('room_number', { ascending: true });

      if (error) throw error;
      return data as Room[];
    },
    enabled: !!id,
  });

  // Update project status mutation
  const updateProjectStatus = useMutation({
    mutationFn: async (status: ProjectStatus) => {
      const { error } = await supabase
        .from('projects')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      toast({ title: 'Project status updated' });
    },
  });

  // Bulk update rooms mutation
  const bulkUpdateRooms = useMutation({
    mutationFn: async (updates: Partial<Room>) => {
      const roomIds = Array.from(selectedRooms);
      const { error } = await supabase
        .from('rooms')
        .update(updates)
        .in('id', roomIds);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms', id] });
      setSelectedRooms(new Set());
      toast({ title: 'Rooms updated successfully' });
    },
  });

  const handleSelectAll = () => {
    if (selectedRooms.size === rooms.length) {
      setSelectedRooms(new Set());
    } else {
      setSelectedRooms(new Set(rooms.map(r => r.id)));
    }
  };

  const handleSelectRoom = (roomId: string) => {
    const newSelected = new Set(selectedRooms);
    if (newSelected.has(roomId)) {
      newSelected.delete(roomId);
    } else {
      newSelected.add(roomId);
    }
    setSelectedRooms(newSelected);
  };

  const handleBulkPhaseAction = (phase: number) => {
    const phaseKey = `phase_${phase}_completed` as keyof Room;
    bulkUpdateRooms.mutate({ [phaseKey]: true } as Partial<Room>);
  };

  // Export project with auto-catalog
  const handleExportProject = async () => {
    if (!project) return;
    
    setIsExporting(true);
    
    try {
      // Auto-catalog approved renders to library
      console.log('Auto-cataloging approved renders...');
      
      const { data: catalogResult, error: catalogError } = await supabase.functions.invoke('auto-catalog-renders', {
        body: { projectId: project.id }
      });
      
      if (catalogError) {
        console.error('Auto-catalog error:', catalogError);
      } else {
        console.log('Auto-catalog result:', catalogResult);
        
        if (catalogResult && catalogResult.cataloged > 0) {
          toast({
            title: '📚 Added to Library',
            description: `${catalogResult.cataloged} render${catalogResult.cataloged > 1 ? 's' : ''} added to style library${catalogResult.featured > 0 ? ` (${catalogResult.featured} featured)` : ''}`,
          });
        }
      }
      
      // Update project status to completed
      await supabase
        .from('projects')
        .update({ status: 'completed' })
        .eq('id', project.id);
      
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      
      toast({
        title: 'Project Exported',
        description: 'Your project has been completed and renders cataloged.',
      });
      
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Export Failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  if (projectLoading) {
    return <ProjectDetailSkeleton />;
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <Link to="/projects">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <h3 className="text-lg font-semibold">Project not found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The project you're looking for doesn't exist or you don't have access.
            </p>
            <Link to="/projects">
              <Button className="mt-4">View All Projects</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const status = statusConfig[project.status] || statusConfig.draft;
  const projectProgress = ((project.current_phase - 1) / 4) * 100;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/projects">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </Link>

      {/* Project Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: Project Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
                <Badge className={status.color}>{status.label}</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {project.client_name || 'No client'}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {project.city || 'No city'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Home className="h-4 w-4" />
                  {rooms.length}/{project.max_rooms} rooms
                </span>
                <span className="flex items-center gap-1.5">
                  <IndianRupee className="h-4 w-4" />
                  {project.estimated_budget ? formatCurrency(project.estimated_budget) : 'No budget'}
                </span>
                {project.deadline && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(project.deadline), 'MMM d, yyyy')}
                  </span>
                )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary cursor-help">
                        <Zap className="h-3.5 w-3.5" />
                        <span className="font-medium">{formattedCost}</span>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>API Cost: {formattedCost}</p>
                      <p className="text-xs text-muted-foreground">{callCount} API calls</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Phase Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Phase {project.current_phase}: {phaseLabels[project.current_phase - 1]}</span>
                  <span className="text-muted-foreground">{Math.round(projectProgress)}% complete</span>
                </div>
                <Progress value={projectProgress} className="h-2" />
                <div className="flex items-center justify-between pt-1">
                  {phaseLabels.map((label, index) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          index + 1 < project.current_phase
                            ? 'bg-success text-success-foreground'
                            : index + 1 === project.current_phase
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {index + 1 < project.current_phase ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground hidden sm:block">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap gap-2">
              <Link to={`/projects/${id}/budget`}>
                <Button variant="outline">
                  <IndianRupee className="mr-2 h-4 w-4" />
                  View Budget
                </Button>
              </Link>
              <Link to={`/projects/${id}/vendors`}>
                <Button variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Vendors
                </Button>
              </Link>
              <Button
                onClick={() => updateProjectStatus.mutate('approved')}
                disabled={project.status === 'approved' || project.status === 'completed'}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Project
              </Button>
              <Button
                onClick={handleExportProject}
                disabled={isExporting || project.status === 'completed'}
                variant={project.status === 'approved' ? 'default' : 'outline'}
              >
                {isExporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export Project
                  </>
                )}
              </Button>
              
              {/* Admin Delete Button */}
              {isAdmin && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete "{project.name}" and all its rooms, renders, and budget items. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => deleteProject.mutate()}
                      >
                        Delete Project
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Action Toolbar */}
      {selectedRooms.size > 0 && (
        <div className="sticky top-0 z-40 bg-card border rounded-lg shadow-lg p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={selectedRooms.size === rooms.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm font-medium">
                {selectedRooms.size} room{selectedRooms.size > 1 ? 's' : ''} selected
              </span>
            </div>

            <div className="flex-1" />

            <div className="flex flex-wrap items-center gap-2">
              {project.current_phase === 2 && (
                <Button size="sm" variant="outline" onClick={() => handleBulkPhaseAction(2)}>
                  <FileCheck className="mr-2 h-4 w-4" />
                  Approve All Analysis
                </Button>
              )}
              {project.current_phase === 3 && (
                <Button size="sm" variant="outline" onClick={() => handleBulkPhaseAction(3)}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Approve All Cleaned
                </Button>
              )}
              {project.current_phase === 4 && (
                <Button size="sm" variant="outline" onClick={() => handleBulkPhaseAction(4)}>
                  <Palette className="mr-2 h-4 w-4" />
                  Apply Style to All
                </Button>
              )}
              {project.current_phase === 5 && (
                <Button size="sm" variant="outline" onClick={() => handleBulkPhaseAction(5)}>
                  <Image className="mr-2 h-4 w-4" />
                  Approve All Renders
                </Button>
              )}
              <Button size="sm" variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Copy Settings
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Rooms Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Rooms</h2>
          {rooms.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleSelectAll}>
              {selectedRooms.size === rooms.length ? 'Deselect All' : 'Select All'}
            </Button>
          )}
        </div>

        {roomsLoading ? (
          <RoomsGridSkeleton />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                isSelected={selectedRooms.has(room.id)}
                onSelect={() => handleSelectRoom(room.id)}
              />
            ))}

            {/* Add Room Card */}
            {rooms.length < project.max_rooms && (
              <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
                <DialogTrigger asChild>
                  <Card className="border-dashed cursor-pointer transition-colors hover:border-primary hover:bg-muted/50">
                    <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] text-center">
                      <div className="rounded-full bg-muted p-4">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="mt-3 font-medium">Add Room</p>
                      <p className="text-sm text-muted-foreground">
                        {project.max_rooms - rooms.length} slots remaining
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Room</DialogTitle>
                    <DialogDescription>
                      Add a new room to this project.
                    </DialogDescription>
                  </DialogHeader>
                  <AddRoomForm
                    projectId={project.id}
                    nextRoomNumber={rooms.length + 1}
                    onSuccess={() => {
                      setIsAddRoomOpen(false);
                      queryClient.invalidateQueries({ queryKey: ['rooms', id] });
                      queryClient.invalidateQueries({ queryKey: ['project', id] });
                    }}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function RoomCard({
  room,
  isSelected,
  onSelect,
}: {
  room: Room;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const roomType = room.room_type ? roomTypeLabels[room.room_type] : 'Unknown';
  const dimensions = room.length_feet && room.width_feet
    ? `${room.length_feet} × ${room.width_feet} ft`
    : 'No dimensions';

  return (
    <Card className={`relative overflow-hidden transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      {/* Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
          className="bg-card"
        />
      </div>

      {/* Room Image/Placeholder */}
      <div className="relative h-32 bg-gradient-to-br from-primary/20 to-accent/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <Home className="h-12 w-12 text-primary/30" />
        </div>
        {room.selected_style && (
          <Badge className="absolute bottom-3 right-3 bg-card/90">
            {room.selected_style}
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Room Info */}
        <div>
          <h3 className="font-semibold text-foreground">
            {room.room_name || `Room ${room.room_number}`}
          </h3>
          <p className="text-sm text-muted-foreground">{roomType}</p>
          <p className="text-xs text-muted-foreground mt-1">{dimensions}</p>
        </div>

        {/* Phase Circles */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((phase) => {
            const phaseKey = `phase_${phase}_completed` as keyof Room;
            const isCompleted = room[phaseKey] as boolean;
            const isCurrent = phase === room.current_phase;

            return (
              <div
                key={phase}
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  isCompleted
                    ? 'bg-success text-success-foreground'
                    : isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
                title={phaseLabels[phase - 1]}
              >
                {isCompleted ? <CheckCircle className="h-3.5 w-3.5" /> : phase}
              </div>
            );
          })}
        </div>

        {/* View Room Button */}
        <Link to={`/projects/${room.project_id}/rooms/${room.id}`}>
          <Button variant="outline" className="w-full" size="sm">
            View Room
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function ProjectDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-32" />
      
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="flex gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-5 w-24" />
            ))}
          </div>
          <Skeleton className="h-2 w-full" />
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-6 w-6 rounded-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      <RoomsGridSkeleton />
    </div>
  );
}

function RoomsGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-32 rounded-none" />
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((j) => (
                <Skeleton key={j} className="h-6 w-6 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-9 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
