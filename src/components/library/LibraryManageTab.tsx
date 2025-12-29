import { useState, forwardRef } from 'react';
import { Trash2, Archive, RefreshCw, Download, MoreHorizontal, Check, X, Eye, Loader2, BookmarkPlus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface LibraryImage {
  id: string;
  image_url: string;
  thumbnail_url: string | null;
  room_type: string;
  design_style: string;
  source_type: 'user_upload' | 'houspire_generated';
  tier: 'featured' | 'standard' | 'learning' | 'unverified' | null;
  status: 'active' | 'archived' | 'flagged' | 'pending_review' | null;
  quality_score: number | null;
  approval_rate: number | null;
  times_selected: number;
  city: string | null;
  created_at: string;
}

export const LibraryManageTab = forwardRef<HTMLDivElement>(function LibraryManageTab(props, ref) {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [filters, setFilters] = useState({
    source: 'all',
    tier: 'all',
    status: 'active',
  });

  // Query to check for missing library entries
  const { data: syncStats, refetch: refetchSyncStats } = useQuery({
    queryKey: ['library-sync-stats'],
    queryFn: async () => {
      // Get count of approved renders not in library
      const { data: approvedRenders } = await supabase
        .from('renders')
        .select('room_id')
        .eq('approval_status', 'approved');
      
      if (!approvedRenders) return { missing: 0, total: 0 };

      const roomIds = approvedRenders.map(r => r.room_id);
      
      // Get library entries that already exist for these rooms
      const { data: existingEntries } = await supabase
        .from('style_library')
        .select('source_room_id')
        .in('source_room_id', roomIds);
      
      const existingRoomIds = new Set(existingEntries?.map(e => e.source_room_id) || []);
      const missingCount = roomIds.filter(id => !existingRoomIds.has(id)).length;
      
      return { missing: missingCount, total: approvedRenders.length };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Sync approved renders to library
  const handleSyncToLibrary = async () => {
    setIsSyncing(true);
    try {
      // Get approved renders not in library
      const { data: approvedRenders, error: renderError } = await supabase
        .from('renders')
        .select(`
          id, room_id, image_url, storage_path, quality_score,
          rooms!inner(room_type, selected_style, final_quality_score, project_id),
          rooms!inner(projects!inner(city))
        `)
        .eq('approval_status', 'approved');

      if (renderError) throw renderError;
      if (!approvedRenders || approvedRenders.length === 0) {
        toast({ title: 'No Renders to Sync', description: 'All approved renders are already in the library.' });
        return;
      }

      // Get existing library entries
      const roomIds = approvedRenders.map((r: any) => r.room_id);
      const { data: existingEntries } = await supabase
        .from('style_library')
        .select('source_room_id')
        .in('source_room_id', roomIds);
      
      const existingRoomIds = new Set(existingEntries?.map(e => e.source_room_id) || []);
      
      // Filter to only renders that need syncing
      const rendersToSync = approvedRenders.filter((r: any) => !existingRoomIds.has(r.room_id));
      
      if (rendersToSync.length === 0) {
        toast({ title: 'All Synced', description: 'All approved renders are already in the library.' });
        return;
      }

      // Insert into library
      let successCount = 0;
      for (const render of rendersToSync) {
        const roomData = (render as any).rooms;
        const projectData = roomData?.projects;
        
        const { error: insertError } = await supabase
          .from('style_library')
          .insert({
            image_url: render.image_url,
            thumbnail_url: render.image_url,
            storage_path: render.storage_path,
            source_type: 'houspire_generated',
            source_room_id: render.room_id,
            room_type: roomData?.room_type || 'living_room',
            design_style: roomData?.selected_style || 'contemporary',
            city: projectData?.city || null,
            quality_score: roomData?.final_quality_score || render.quality_score || 80,
            tier: 'unverified',
            status: 'active',
            curator_verified: false,
            tags: [roomData?.room_type || 'living_room', roomData?.selected_style || 'contemporary', 'approved', 'auto-synced']
          });
        
        if (!insertError) successCount++;
      }

      toast({ 
        title: 'Sync Complete', 
        description: `Added ${successCount} renders to the library for curation.` 
      });
      
      queryClient.invalidateQueries({ queryKey: ['library-manage'] });
      queryClient.invalidateQueries({ queryKey: ['library-curate'] });
      refetchSyncStats();
      
    } catch (error: any) {
      console.error('Sync error:', error);
      toast({ 
        title: 'Sync Failed', 
        description: error.message || 'Failed to sync renders to library.',
        variant: 'destructive'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const { data: images, isLoading } = useQuery({
    queryKey: ['library-manage', filters],
    queryFn: async () => {
      let query = supabase
        .from('style_library')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (filters.status !== 'all') {
        query = query.eq('status', filters.status as 'active' | 'archived' | 'flagged' | 'pending_review');
      }
      if (filters.source !== 'all') {
        query = query.eq('source_type', filters.source as 'user_upload' | 'houspire_generated');
      }
      if (filters.tier !== 'all') {
        query = query.eq('tier', filters.tier as 'featured' | 'standard' | 'learning' | 'unverified');
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as LibraryImage[];
    },
  });

  const archiveMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from('style_library')
        .update({ status: 'archived' })
        .in('id', ids);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Archived', description: `${selected.length} images archived.` });
      setSelected([]);
      queryClient.invalidateQueries({ queryKey: ['library-manage'] });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to archive images.', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from('style_library')
        .delete()
        .in('id', ids);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Deleted', description: `${selected.length} images deleted.` });
      setSelected([]);
      queryClient.invalidateQueries({ queryKey: ['library-manage'] });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete images.', variant: 'destructive' });
    },
  });

  const toggleSelect = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === images?.length) {
      setSelected([]);
    } else {
      setSelected(images?.map(i => i.id) || []);
    }
  };

  const formatRoomType = (type: string) => type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const formatStyle = (style: string) => style.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const getTierBadge = (tier: string | null) => {
    switch (tier) {
      case 'featured':
        return <Badge className="bg-yellow-500 text-yellow-950">⭐ Featured</Badge>;
      case 'standard':
        return <Badge variant="secondary">Standard</Badge>;
      case 'learning':
        return <Badge variant="outline">Learning</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">Unverified</Badge>;
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300">Active</Badge>;
      case 'archived':
        return <Badge variant="outline" className="text-muted-foreground">Archived</Badge>;
      case 'flagged':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300">Flagged</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div ref={ref} className="space-y-6">
      {/* Sync Stats Alert */}
      {syncStats && syncStats.missing > 0 && (
        <Card className="border-amber-500/50 bg-amber-500/10">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-sm">Missing Library Entries</p>
                  <p className="text-xs text-muted-foreground">
                    {syncStats.missing} approved render(s) not yet in the library
                  </p>
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={handleSyncToLibrary}
                disabled={isSyncing}
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    Sync to Library
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-muted-foreground">
            Manage library images, bulk operations, and status changes
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSyncToLibrary}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <BookmarkPlus className="h-4 w-4 mr-2" />
            )}
            Sync Renders
          </Button>
          <Button variant="outline" size="sm" onClick={() => queryClient.invalidateQueries({ queryKey: ['library-manage'] })}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Source</label>
              <Select
                value={filters.source}
                onValueChange={(value) => setFilters({ ...filters, source: value })}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="houspire_generated">✨ Houspire</SelectItem>
                  <SelectItem value="user_upload">📌 User Upload</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tier</label>
              <Select
                value={filters.tier}
                onValueChange={(value) => setFilters({ ...filters, tier: value })}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="featured">⭐ Featured</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="pending_review">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selected.length > 0 && (
              <div className="flex items-end gap-2 ml-auto">
                <Badge variant="outline">{selected.length} selected</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => archiveMutation.mutate(selected)}
                  disabled={archiveMutation.isPending}
                >
                  <Archive className="h-4 w-4 mr-1" />
                  Archive
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(selected)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selected.length === images?.length && images.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-24">Preview</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {images?.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(image.id)}
                        onCheckedChange={() => toggleSelect(image.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <img
                        src={image.thumbnail_url || image.image_url}
                        alt=""
                        className="w-20 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{formatRoomType(image.room_type)}</p>
                        <p className="text-xs text-muted-foreground">{formatStyle(image.design_style)}</p>
                        {image.city && (
                          <p className="text-xs text-muted-foreground">{image.city}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {image.source_type === 'houspire_generated' ? (
                        <Badge variant="secondary">✨ Houspire</Badge>
                      ) : (
                        <Badge variant="outline">📌 Upload</Badge>
                      )}
                    </TableCell>
                    <TableCell>{getTierBadge(image.tier)}</TableCell>
                    <TableCell>{getStatusBadge(image.status)}</TableCell>
                    <TableCell>
                      <div className="space-y-1 text-xs">
                        {image.quality_score && <p>{image.quality_score}%</p>}
                        {image.approval_rate && (
                          <p className="text-green-600">{Math.round(image.approval_rate * 100)}% success</p>
                        )}
                        <p className="text-muted-foreground">{image.times_selected} uses</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => archiveMutation.mutate([image.id])}>
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => deleteMutation.mutate([image.id])}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
});

export default LibraryManageTab;
