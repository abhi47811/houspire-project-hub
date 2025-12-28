import { useState } from 'react';
import { Check, X, Star, ChevronLeft, ChevronRight, Flag, Eye, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';

interface CurationItem {
  id: string;
  image_url: string;
  thumbnail_url: string | null;
  room_type: string;
  design_style: string;
  source_type: 'user_upload' | 'houspire_generated';
  tier: 'featured' | 'standard' | 'learning' | 'unverified' | null;
  quality_score: number | null;
  approval_rate: number | null;
  times_selected: number;
  city: string | null;
  tags: string[] | null;
  curator_notes: string | null;
  created_at: string;
}

export function LibraryCurateTab() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [curatorNotes, setCuratorNotes] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('');

  // Fetch items needing curation (unverified tier or pending review)
  const { data: queue, isLoading } = useQuery({
    queryKey: ['curation-queue'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('style_library')
        .select('*')
        .eq('status', 'active')
        .or('tier.eq.unverified,curator_verified.eq.false')
        .order('created_at', { ascending: true })
        .limit(50);
      
      if (error) throw error;
      return data as CurationItem[];
    },
  });

  const currentItem = queue?.[currentIndex];

  const curateMutation = useMutation({
    mutationFn: async ({ id, tier, notes, approve }: { 
      id: string; 
      tier?: string; 
      notes?: string; 
      approve: boolean 
    }) => {
      const updateData: Record<string, unknown> = {
        curator_verified: true,
        curator_verified_at: new Date().toISOString(),
        curator_verified_by: user?.id,
      };

      if (tier) {
        updateData.tier = tier;
      }
      if (notes) {
        updateData.curator_notes = notes;
      }
      if (!approve) {
        updateData.status = 'archived';
      }

      const { error } = await supabase
        .from('style_library')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: (_, { approve }) => {
      toast({ 
        title: approve ? 'Approved' : 'Rejected', 
        description: approve ? 'Image curated and approved.' : 'Image archived.' 
      });
      setCuratorNotes('');
      setSelectedTier('');
      
      // Move to next item
      if (queue && currentIndex < queue.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
      
      queryClient.invalidateQueries({ queryKey: ['curation-queue'] });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to curate image.', variant: 'destructive' });
    },
  });

  const handleApprove = () => {
    if (!currentItem) return;
    curateMutation.mutate({
      id: currentItem.id,
      tier: selectedTier || 'standard',
      notes: curatorNotes,
      approve: true,
    });
  };

  const handleReject = () => {
    if (!currentItem) return;
    curateMutation.mutate({
      id: currentItem.id,
      notes: curatorNotes,
      approve: false,
    });
  };

  const handleFlag = () => {
    if (!currentItem) return;
    supabase
      .from('style_library')
      .update({ status: 'flagged' })
      .eq('id', currentItem.id)
      .then(() => {
        toast({ title: 'Flagged', description: 'Image flagged for review.' });
        if (queue && currentIndex < queue.length - 1) {
          setCurrentIndex(prev => prev + 1);
        }
        queryClient.invalidateQueries({ queryKey: ['curation-queue'] });
      });
  };

  const formatRoomType = (type: string) => type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const formatStyle = (style: string) => style.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!queue || queue.length === 0) {
    return (
      <Card className="bg-muted/50">
        <CardContent className="py-12 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-bold mb-2">Curation Queue Empty</h3>
          <p className="text-muted-foreground">
            All images have been reviewed. Great job!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">
            {queue.length} images awaiting curation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {queue.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentIndex(prev => Math.min(queue.length - 1, prev + 1))}
            disabled={currentIndex === queue.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {currentItem && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image Preview */}
          <Card className="overflow-hidden">
            <div className="aspect-video bg-muted">
              <img
                src={currentItem.image_url}
                alt={`${currentItem.room_type} ${currentItem.design_style}`}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge>{formatRoomType(currentItem.room_type)}</Badge>
                <Badge variant="outline">{formatStyle(currentItem.design_style)}</Badge>
                {currentItem.city && <Badge variant="secondary">{currentItem.city}</Badge>}
              </div>

              <div className="flex flex-wrap gap-2">
                {currentItem.source_type === 'houspire_generated' ? (
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Sparkles className="h-3 w-3" />
                    Houspire Render
                  </Badge>
                ) : (
                  <Badge variant="outline">📌 User Upload</Badge>
                )}
                
                {currentItem.tier && (
                  <Badge variant="outline">
                    {currentItem.tier === 'featured' ? '⭐ ' : ''}{currentItem.tier}
                  </Badge>
                )}
              </div>

              {currentItem.tags && currentItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {currentItem.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 text-sm">
                {currentItem.quality_score && (
                  <div>
                    <p className="text-muted-foreground">Quality</p>
                    <p className="font-medium">{currentItem.quality_score}%</p>
                  </div>
                )}
                {currentItem.approval_rate && (
                  <div>
                    <p className="text-muted-foreground">Success Rate</p>
                    <p className="font-medium text-green-600">
                      {Math.round(currentItem.approval_rate * 100)}%
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground">Uses</p>
                  <p className="font-medium">{currentItem.times_selected}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Curation Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Curation Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Assign Tier</label>
                <Select value={selectedTier} onValueChange={setSelectedTier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tier..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">⭐ Featured (Top 10%)</SelectItem>
                    <SelectItem value="standard">Standard (Quality verified)</SelectItem>
                    <SelectItem value="learning">Learning (Needs more data)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Curator Notes</label>
                <Textarea
                  placeholder="Add notes about this image..."
                  value={curatorNotes}
                  onChange={(e) => setCuratorNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleReject}
                  disabled={curateMutation.isPending}
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  onClick={handleFlag}
                  disabled={curateMutation.isPending}
                >
                  <Flag className="h-4 w-4" />
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleApprove}
                  disabled={curateMutation.isPending || !selectedTier}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Keyboard: ← Previous | → Next | A Approve | R Reject | F Flag
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default LibraryCurateTab;
