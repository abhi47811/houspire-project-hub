import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Check, 
  X, 
  Eye, 
  RefreshCw, 
  Star, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface PendingRender {
  id: string;
  room_id: string;
  image_url: string;
  quality_score: number | null;
  quality_details: Record<string, unknown> | null;
  created_at: string;
  prompt_used: string | null;
  model_used: string | null;
  room: {
    room_type: string | null;
    room_name: string | null;
    project: {
      id: string;
      name: string;
      client_name: string | null;
    };
  };
}

export default function ApprovalDashboard() {
  const queryClient = useQueryClient();
  const [selectedRenders, setSelectedRenders] = useState<string[]>([]);
  const [previewRender, setPreviewRender] = useState<PendingRender | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [filterProject, setFilterProject] = useState<string>('all');
  const [page, setPage] = useState(0);
  const pageSize = 12;

  // Fetch pending renders
  const { data: pendingRenders, isLoading, refetch } = useQuery({
    queryKey: ['pending-renders', page, filterProject],
    queryFn: async (): Promise<PendingRender[]> => {
      let query = supabase
        .from('renders')
        .select(`
          id,
          room_id,
          image_url,
          quality_score,
          quality_details,
          created_at,
          prompt_used,
          model_used,
          room:rooms (
            room_type,
            room_name,
            project:projects (
              id,
              name,
              client_name
            )
          )
        `)
        .eq('approval_status', 'pending')
        .order('created_at', { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1);

      const { data, error } = await query;
      if (error) throw error;

      // Filter by project if needed
      let filtered = (data || []) as unknown as PendingRender[];
      if (filterProject !== 'all') {
        filtered = filtered.filter(r => r.room?.project?.id === filterProject);
      }

      return filtered;
    },
  });

  // Fetch projects for filter
  const { data: projects } = useQuery({
    queryKey: ['projects-filter'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async (renderIds: string[]) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('renders')
        .update({
          approval_status: 'approved',
          approved_by: user?.id,
          approved_at: new Date().toISOString(),
        })
        .in('id', renderIds);

      if (error) throw error;
      return renderIds.length;
    },
    onSuccess: (count) => {
      toast({ title: 'Approved', description: `${count} render(s) approved successfully` });
      setSelectedRenders([]);
      queryClient.invalidateQueries({ queryKey: ['pending-renders'] });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to approve renders', variant: 'destructive' });
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ renderIds, reason }: { renderIds: string[]; reason: string }) => {
      const { error } = await supabase
        .from('renders')
        .update({
          approval_status: 'rejected',
          rejection_reason: reason,
        })
        .in('id', renderIds);

      if (error) throw error;
      return renderIds.length;
    },
    onSuccess: (count) => {
      toast({ title: 'Rejected', description: `${count} render(s) rejected` });
      setSelectedRenders([]);
      setRejectDialogOpen(false);
      setRejectReason('');
      queryClient.invalidateQueries({ queryKey: ['pending-renders'] });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to reject renders', variant: 'destructive' });
    },
  });

  // Score render mutation
  const scoreMutation = useMutation({
    mutationFn: async (renderId: string) => {
      const { data, error } = await supabase.functions.invoke('score-render', {
        body: { renderId },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast({ 
        title: 'Scored', 
        description: `Quality score: ${data.score?.overall || 'N/A'}/100` 
      });
      queryClient.invalidateQueries({ queryKey: ['pending-renders'] });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to score render', variant: 'destructive' });
    },
  });

  const toggleSelect = (id: string) => {
    setSelectedRenders(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedRenders.length === pendingRenders?.length) {
      setSelectedRenders([]);
    } else {
      setSelectedRenders(pendingRenders?.map(r => r.id) || []);
    }
  };

  const handleBulkApprove = () => {
    if (selectedRenders.length === 0) return;
    approveMutation.mutate(selectedRenders);
  };

  const handleBulkReject = () => {
    if (selectedRenders.length === 0) return;
    setRejectDialogOpen(true);
  };

  const confirmReject = () => {
    rejectMutation.mutate({ renderIds: selectedRenders, reason: rejectReason });
  };

  const getQualityBadge = (score: number | null) => {
    if (score === null) return <Badge variant="outline">Unscored</Badge>;
    const percentage = Math.round(score * 100);
    if (percentage >= 90) return <Badge className="bg-green-500">{percentage}%</Badge>;
    if (percentage >= 70) return <Badge className="bg-yellow-500">{percentage}%</Badge>;
    return <Badge className="bg-red-500">{percentage}%</Badge>;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Render Approval Dashboard</h1>
          <p className="text-muted-foreground">Review and approve pending renders</p>
        </div>
        <Button variant="outline" onClick={() => refetch()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters and Bulk Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={selectedRenders.length === pendingRenders?.length && pendingRenders.length > 0}
                onCheckedChange={selectAll}
              />
              <span className="text-sm text-muted-foreground">
                {selectedRenders.length} selected
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterProject} onValueChange={setFilterProject}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Projects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects?.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1" />

            <Button 
              variant="outline" 
              onClick={handleBulkReject}
              disabled={selectedRenders.length === 0 || rejectMutation.isPending}
            >
              <X className="h-4 w-4 mr-2" />
              Reject Selected
            </Button>
            <Button 
              onClick={handleBulkApprove}
              disabled={selectedRenders.length === 0 || approveMutation.isPending}
            >
              <Check className="h-4 w-4 mr-2" />
              Approve Selected
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Render Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : pendingRenders?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Pending Renders</h3>
            <p className="text-muted-foreground">All renders have been reviewed</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pendingRenders?.map((render) => (
            <Card 
              key={render.id}
              className={cn(
                "overflow-hidden cursor-pointer transition-all",
                selectedRenders.includes(render.id) && "ring-2 ring-primary"
              )}
            >
              <div className="relative">
                <img 
                  src={render.image_url} 
                  alt="Render"
                  className="w-full h-48 object-cover"
                  onClick={() => setPreviewRender(render)}
                />
                <div className="absolute top-2 left-2">
                  <Checkbox 
                    checked={selectedRenders.includes(render.id)}
                    onCheckedChange={() => toggleSelect(render.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="absolute top-2 right-2">
                  {getQualityBadge(render.quality_score)}
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm truncate">
                    {render.room?.project?.name || 'Unknown Project'}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {render.room?.room_type?.replace('_', ' ') || 'Unknown'}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="flex-1"
                    onClick={() => setPreviewRender(render)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => scoreMutation.mutate(render.id)}
                    disabled={scoreMutation.isPending}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-green-600"
                    onClick={() => approveMutation.mutate([render.id])}
                    disabled={approveMutation.isPending}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-red-600"
                    onClick={() => {
                      setSelectedRenders([render.id]);
                      setRejectDialogOpen(true);
                    }}
                    disabled={rejectMutation.isPending}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pendingRenders && pendingRenders.length > 0 && (
        <div className="flex items-center justify-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">Page {page + 1}</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setPage(p => p + 1)}
            disabled={pendingRenders.length < pageSize}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!previewRender} onOpenChange={() => setPreviewRender(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Render Preview</DialogTitle>
            <DialogDescription>
              {previewRender?.room?.project?.name} - {previewRender?.room?.room_type?.replace('_', ' ')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <img 
              src={previewRender?.image_url} 
              alt="Render Preview"
              className="w-full rounded-lg"
            />
            {previewRender?.quality_details && (
              <div className="grid grid-cols-3 gap-2 text-sm">
                {Object.entries((previewRender.quality_details as { breakdown?: Record<string, number> })?.breakdown || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-2 bg-muted rounded">
                    <span className="capitalize">{key.replace('_', ' ')}</span>
                    <span className="font-medium">{value as number}%</span>
                  </div>
                ))}
              </div>
            )}
            {previewRender?.prompt_used && (
              <div className="p-3 bg-muted rounded text-sm">
                <strong>Prompt:</strong> {previewRender.prompt_used.slice(0, 200)}...
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewRender(null)}>
              Close
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                setSelectedRenders([previewRender!.id]);
                setRejectDialogOpen(true);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button onClick={() => {
              approveMutation.mutate([previewRender!.id]);
              setPreviewRender(null);
            }}>
              <Check className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Render(s)</DialogTitle>
            <DialogDescription>
              Provide a reason for rejection. This will be visible to the renderer.
            </DialogDescription>
          </DialogHeader>
          <Textarea 
            placeholder="Enter rejection reason..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={3}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmReject}
              disabled={!rejectReason.trim() || rejectMutation.isPending}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
