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
  useApproveAllAnalysis,
  useApproveAllCleaned,
  useBulkGenerateRenders,
  useBulkDownloadRenders,
} from '@/hooks/useBulkOperations';
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
  Upload,
  Play,
} from 'lucide-react';
import { format } from 'date-fns';
import { Library } from 'lucide-react';
import { AddRoomForm } from '@/components/projects/AddRoomForm';
import { BulkUpload } from '@/components/rooms/BulkUpload';
import { BatchCleanup } from '@/components/rooms/BatchCleanup';
import { Eraser } from 'lucide-react';

type ProjectStatus = 'draft' | 'in_progress' | 'review' | 'approved' | 'completed' | 'cancelled';
type RoomType = 'living_room' | 'master_bedroom' | 'bedroom' | 'kitchen' | 'dining_room' | 'bathroom' | 'balcony' | 'study_room' | 'kids_room' | 'guest_room' | 'pooja_room' | 'home_office' | 'gym' | 'entertainment_room' | 'utility_room' | 'foyer' | 'walk_in_closet';

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
  bathroom: 'Bathroom',
  balcony: 'Balcony',
  study_room: 'Study Room',
  kids_room: "Kids Room",
  guest_room: 'Guest Room',
  pooja_room: 'Pooja Room',
  home_office: 'Home Office',
  gym: 'Gym',
  entertainment_room: 'Entertainment Room',
  utility_room: 'Utility Room',
  foyer: 'Entrance/Foyer',
  walk_in_closet: 'Walk-in Closet',
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
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [batchCleanupOpen, setBatchCleanupOpen] = useState(false);
  
  const isAdmin = profile?.role === 'admin';
  
  // Bulk operation hooks
  const bulkApproveAnalysis = useApproveAllAnalysis();
  const bulkApproveCleaned = useApproveAllCleaned();
  const bulkGenerateRenders = useBulkGenerateRenders();
  const bulkDownloadRenders = useBulkDownloadRenders();
  
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

  const handleBulkApproveAnalysis = () => {
    if (!project || !profile?.id) return;
    bulkApproveAnalysis.mutate({
      projectId: project.id,
      userId: profile.id,
    });
    setSelectedRooms(new Set());
  };

  const handleBulkApproveCleaned = () => {
    if (!project) return;
    const roomIds = Array.from(selectedRooms);
    bulkApproveCleaned.mutate({
      projectId: project.id,
      roomIds,
    });
    setSelectedRooms(new Set());
  };

  const handleBulkGenerateRenders = () => {
    const roomIds = Array.from(selectedRooms);
    bulkGenerateRenders.mutate({ roomIds });
  };

  const handleBulkDownloadRenders = () => {
    if (!project) return;
    const roomIds = Array.from(selectedRooms);
    bulkDownloadRenders.mutate({
      roomIds,
      projectName: project.name,
    });
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
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleBulkApproveAnalysis}
                  disabled={bulkApproveAnalysis.isPending}
                >
                  {bulkApproveAnalysis.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FileCheck className="mr-2 h-4 w-4" />
                  )}
                  {bulkApproveAnalysis.isPending ? 'Approving...' : 'Approve All Analysis'}
                </Button>
              )}
              {project.current_phase === 3 && (
                <>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setBatchCleanupOpen(true)}
                  >
                    <Eraser className="mr-2 h-4 w-4" />
                    Clean All Rooms
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleBulkApproveCleaned}
                    disabled={bulkApproveCleaned.isPending}
                  >
                    {bulkApproveCleaned.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    {bulkApproveCleaned.isPending ? 'Approving...' : 'Approve All Cleaned'}
                  </Button>
                </>
              )}
              {project.current_phase === 4 && (
                <Button size="sm" variant="outline" onClick={() => handleBulkPhaseAction(4)}>
                  <Palette className="mr-2 h-4 w-4" />
                  Apply Style to All
                </Button>
              )}
              {project.current_phase === 5 && (
                <>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleBulkGenerateRenders}
                    disabled={bulkGenerateRenders.isPending}
                  >
                    {bulkGenerateRenders.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    {bulkGenerateRenders.isPending ? 'Generating...' : 'Generate All Renders'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkPhaseAction(5)}>
                    <Image className="mr-2 h-4 w-4" />
                    Approve All Renders
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleBulkDownloadRenders}
                    disabled={bulkDownloadRenders.isPending}
                  >
                    {bulkDownloadRenders.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    {bulkDownloadRenders.isPending ? 'Preparing...' : 'Download All'}
                  </Button>
                </>
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

            {/* Bulk Upload Card */}
            {rooms.length < project.max_rooms && (
              <Card 
                className="border-dashed cursor-pointer transition-colors hover:border-primary hover:bg-muted/50"
                onClick={() => setIsBulkUploadOpen(true)}
              >
                <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] text-center">
                  <div className="rounded-full bg-muted p-4">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="mt-3 font-medium">Bulk Upload</p>
                  <p className="text-sm text-muted-foreground">
                    Upload multiple rooms at once
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Bulk Upload Dialog */}
            <BulkUpload
              projectId={project.id}
              maxRooms={project.max_rooms}
              currentRoomCount={rooms.length}
              open={isBulkUploadOpen}
              onOpenChange={setIsBulkUploadOpen}
            />

            {/* Batch Cleanup Dialog */}
            <BatchCleanup
              projectId={project.id}
              rooms={rooms.map(r => ({
                id: r.id,
                room_name: r.room_name,
                room_type: r.room_type,
                phase_2_completed: r.phase_2_completed,
                phase_3_completed: r.phase_3_completed
              }))}
              open={batchCleanupOpen}
              onOpenChange={setBatchCleanupOpen}
            />
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
  const [renderStatus, setRenderStatus] = useState<'idle' | 'pending' | 'generating' | 'completed' | 'failed'>('idle');
  const [latestRender, setLatestRender] = useState<{ image_url: string; approval_status: string } | null>(null);
  const [bestAvailableImage, setBestAvailableImage] = useState<string | null>(null);
  const [isInLibrary, setIsInLibrary] = useState(false);
  
  const roomType = room.room_type ? roomTypeLabels[room.room_type] : 'Unknown';
  const dimensions = room.length_feet && room.width_feet
    ? `${room.length_feet} × ${room.width_feet} ft`
    : 'No dimensions';

  // Fetch best available image from room_images table
  useEffect(() => {
    const fetchBestImage = async () => {
      // Priority: render > styled > cleaned > analysis > original
      const imageTypePriority = ['render', 'styled', 'cleaned', 'analysis', 'original'];
      
      const { data: roomImages } = await supabase
        .from('room_images')
        .select('image_type, storage_path')
        .eq('room_id', room.id)
        .in('image_type', imageTypePriority);
      
      if (roomImages && roomImages.length > 0) {
        // Find highest priority image
        for (const type of imageTypePriority) {
          const match = roomImages.find(img => img.image_type === type);
          if (match) {
            const { data: signedUrl } = await supabase.storage
              .from('room-images')
              .createSignedUrl(match.storage_path, 3600);
            
            if (signedUrl?.signedUrl) {
              setBestAvailableImage(signedUrl.signedUrl);
              return;
            }
          }
        }
      }
    };
    
    fetchBestImage();
  }, [room.id]);

  // Check if room is in library
  useEffect(() => {
    const checkLibraryStatus = async () => {
      const { data } = await supabase
        .from('style_library')
        .select('id')
        .eq('source_room_id', room.id)
        .limit(1)
        .maybeSingle();
      
      setIsInLibrary(!!data);
    };
    
    checkLibraryStatus();
  }, [room.id]);

  // Subscribe to render status changes
  useEffect(() => {
    // Fetch initial render status
    const fetchLatestRender = async () => {
      const { data } = await supabase
        .from('renders')
        .select('image_url, approval_status')
        .eq('room_id', room.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (data) {
        setLatestRender(data);
        if (data.approval_status === 'approved') {
          setRenderStatus('completed');
        } else if (data.approval_status === 'pending') {
          setRenderStatus('pending');
        }
      }
    };
    
    fetchLatestRender();

    // Subscribe to real-time changes
    const channel = supabase
      .channel(`room-renders-${room.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'renders',
          filter: `room_id=eq.${room.id}`,
        },
        (payload) => {
          if (payload.new) {
            const render = payload.new as { image_url: string; approval_status: string };
            setLatestRender(render);
            if (render.approval_status === 'approved') {
              setRenderStatus('completed');
            } else if (render.approval_status === 'pending') {
              setRenderStatus('pending');
            } else if (render.approval_status === 'rejected') {
              setRenderStatus('failed');
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [room.id]);

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
        {latestRender?.image_url || bestAvailableImage ? (
          <img 
            src={latestRender?.image_url || bestAvailableImage!} 
            alt={room.room_name || `Room ${room.room_number}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Home className="h-12 w-12 text-primary/30" />
          </div>
        )}
        
        {/* Render Status Overlay */}
        {renderStatus === 'generating' && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-xs font-medium">Generating...</span>
            </div>
          </div>
        )}
        
        {renderStatus === 'completed' && (
          <div className="absolute top-3 right-3 flex gap-1">
            {isInLibrary && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="bg-green-600 text-white p-1 rounded-full">
                      <Library className="h-3 w-3" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>In Library</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
        )}
        
        {/* Needs Analysis Badge - show when phase 1 done but phase 2 not done */}
        {room.phase_1_completed && !room.phase_2_completed && (
          <Badge className="absolute top-3 right-3 bg-warning/90 text-warning-foreground">
            Needs Analysis
          </Badge>
        )}
        
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
