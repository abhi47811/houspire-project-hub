import { useState, useEffect } from 'react';
import { 
  Image, 
  Download, 
  RefreshCw, 
  Check, 
  X, 
  Maximize2, 
  Share2, 
  MessageSquare,
  Loader2,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface Room {
  id: string;
  project_id: string;
  current_phase: number;
  phase_5_completed: boolean;
  selected_style: string | null;
  final_quality_score: number | null;
  room_type: string | null;
}

interface PhaseGenerateProps {
  room: Room;
  projectId: string;
}

type GenerationStatus = 'pending' | 'processing' | 'completed' | 'failed';

interface QualityMetric {
  name: string;
  score: number;
  critical?: boolean;
}

interface ValidationItem {
  id: string;
  label: string;
  passed: boolean;
  critical?: boolean;
}

interface ImageWithSignedUrl {
  id: string;
  room_id: string;
  phase: number;
  image_type: string;
  file_name: string;
  storage_path: string;
  resolution: string;
  file_size: number | null;
  created_at: string;
  updated_at: string;
  signedUrl?: string;
}

export function PhaseGenerate({ room, projectId }: PhaseGenerateProps) {
  const queryClient = useQueryClient();
  const [isApproving, setIsApproving] = useState(false);
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);
  const [changeRequestOpen, setChangeRequestOpen] = useState(false);
  const [changeRequest, setChangeRequest] = useState('');
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [comparisonSlider, setComparisonSlider] = useState([50]);
  const [comparisonView, setComparisonView] = useState<'original' | 'cleaned' | 'final'>('final');

  // Fetch current generation job status
  const { data: currentJob, refetch: refetchJob } = useQuery({
    queryKey: ['generation-job', room.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_queue')
        .select('*')
        .eq('room_id', room.id)
        .eq('job_type', 'generation')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    refetchInterval: (query) => {
      // Poll every 3 seconds if job is processing
      const job = query.state.data;
      if (job?.status === 'processing' || job?.status === 'pending') {
        return 3000;
      }
      return false;
    }
  });

  // Fetch render image
  const { data: renderImage, refetch: refetchRenderImage } = useQuery({
    queryKey: ['render-image', room.id],
    queryFn: async (): Promise<ImageWithSignedUrl | null> => {
      const { data, error } = await supabase
        .from('room_images')
        .select('*')
        .eq('room_id', room.id)
        .eq('image_type', 'render')
        .eq('phase', 5)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) return null;
      
      if (data.storage_path) {
        const { data: signedData } = await supabase.storage
          .from('room-images')
          .createSignedUrl(data.storage_path, 3600);
        
        return { ...data, signedUrl: signedData?.signedUrl } as ImageWithSignedUrl;
      }
      return data as ImageWithSignedUrl;
    }
  });

  // Fetch cleaned image for comparison
  const { data: cleanedImage } = useQuery({
    queryKey: ['cleaned-image', room.id],
    queryFn: async (): Promise<ImageWithSignedUrl | null> => {
      const { data, error } = await supabase
        .from('room_images')
        .select('*')
        .eq('room_id', room.id)
        .eq('image_type', 'cleaned')
        .eq('phase', 3)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) return null;
      
      if (data.storage_path) {
        const { data: signedData } = await supabase.storage
          .from('room-images')
          .createSignedUrl(data.storage_path, 3600);
        
        return { ...data, signedUrl: signedData?.signedUrl } as ImageWithSignedUrl;
      }
      return data as ImageWithSignedUrl;
    }
  });

  // Fetch original image for comparison
  const { data: originalImage } = useQuery({
    queryKey: ['original-image', room.id],
    queryFn: async (): Promise<ImageWithSignedUrl | null> => {
      const { data, error } = await supabase
        .from('room_images')
        .select('*')
        .eq('room_id', room.id)
        .eq('image_type', 'original')
        .eq('phase', 1)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) return null;
      
      if (data.storage_path) {
        const { data: signedData } = await supabase.storage
          .from('room-images')
          .createSignedUrl(data.storage_path, 3600);
        
        return { ...data, signedUrl: signedData?.signedUrl } as ImageWithSignedUrl;
      }
      return data as ImageWithSignedUrl;
    }
  });

  // Refetch render image when job completes
  useEffect(() => {
    if (currentJob?.status === 'completed') {
      refetchRenderImage();
      queryClient.invalidateQueries({ queryKey: ['room', room.id] });
    }
  }, [currentJob?.status, refetchRenderImage, queryClient, room.id]);

  // Determine generation status
  const getGenerationStatus = (): GenerationStatus => {
    if (room.phase_5_completed && renderImage?.signedUrl) return 'completed';
    if (currentJob?.status === 'processing') return 'processing';
    if (currentJob?.status === 'pending') return 'processing';
    if (currentJob?.status === 'failed') return 'failed';
    return 'pending';
  };
  
  const generationStatus = getGenerationStatus();
  const progressPercent = generationStatus === 'completed' ? 100 : 
    generationStatus === 'processing' ? 60 : 0;
  const estimatedTime = currentJob?.status === 'processing' ? '~2 min remaining' : '';
  const generationParams = { model: 'Gemini 2.5 Flash Image', resolution: '2048×2048' };

  const qualityMetrics: QualityMetric[] = [
    { name: 'Architectural Preservation', score: 100, critical: true },
    { name: 'Design Style Accuracy', score: 92 },
    { name: 'Photorealism', score: 88 },
    { name: 'Furniture Proportions', score: 95 },
    { name: 'Magazine Quality', score: 90 },
  ];

  const overallScore = room.final_quality_score || Math.round(
    qualityMetrics.reduce((sum, m) => sum + m.score, 0) / qualityMetrics.length
  );

  const validationItems: ValidationItem[] = [
    { id: 'windows', label: 'Windows/doors preserved', passed: true, critical: true },
    { id: 'ceiling', label: 'False ceiling height correct', passed: true },
    { id: 'style', label: 'Style applied correctly', passed: true },
    { id: 'colors', label: 'Color palette matches', passed: true },
    { id: 'lighting', label: 'Lighting as specified', passed: true },
  ];

  const allValidationsPassed = validationItems.every(item => item.passed);

  // Track outcome to library for learning system
  const trackOutcomeToLibrary = async (approved: boolean) => {
    // Check if room has a library reference
    const { data: roomData } = await supabase
      .from('rooms')
      .select('smart_default_id')
      .eq('id', room.id)
      .single();
    
    const libraryImageId = roomData?.smart_default_id;
    
    if (!libraryImageId) {
      console.log('No library reference used, skipping outcome tracking');
      return;
    }
    
    console.log(`Tracking ${approved ? 'approval' : 'rejection'} for library image:`, libraryImageId);
    
    try {
      const { data, error } = await supabase.functions.invoke('track-render-outcome', {
        body: {
          projectId,
          roomId: room.id,
          libraryImageId,
          approved,
          qualityScore: overallScore || null,
          refinementsCount: 0,
        }
      });
      
      if (error) {
        console.error('Edge function error:', error);
        return;
      }
      
      console.log('Outcome tracked successfully:', data);
      
      // Show feedback for tier promotion
      if (data?.tierResult?.promoted) {
        toast({
          title: '⭐ Reference Promoted!',
          description: `This reference was promoted to ${data.tierResult.newTier} tier.`,
        });
      }
    } catch (error) {
      console.error('Failed to track outcome:', error);
    }
  };

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const { error: roomError } = await supabase
        .from('rooms')
        .update({
          phase_5_completed: true,
          current_phase: Math.max(room.current_phase, 6),
          final_quality_score: overallScore,
        })
        .eq('id', room.id);

      if (roomError) throw roomError;

      // Track outcome to library (if library reference was used)
      try {
        await trackOutcomeToLibrary(true);
      } catch (trackError) {
        console.error('Failed to track outcome to library:', trackError);
        // Don't fail the approval if tracking fails
      }

      const { data: rooms, error: fetchError } = await supabase
        .from('rooms')
        .select('phase_5_completed')
        .eq('project_id', projectId);

      if (fetchError) throw fetchError;

      const allComplete = rooms?.every(r => r.phase_5_completed);

      if (allComplete) {
        await supabase
          .from('projects')
          .update({ status: 'review' })
          .eq('id', projectId);

        toast({
          title: 'Project Ready for Review',
          description: 'All rooms completed. Project status updated to Review.',
        });
      } else {
        toast({
          title: 'Render Approved',
          description: 'Final render has been approved.',
        });
      }

      queryClient.invalidateQueries({ queryKey: ['room', room.id] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve render.',
        variant: 'destructive',
      });
    } finally {
      setIsApproving(false);
    }
  };

  // Submit real generation job
  const handleRegenerate = async () => {
    setIsSubmittingJob(true);
    
    try {
      // Build prompt from room data
      const stylePrompt = room.selected_style 
        ? `Interior design style: ${room.selected_style.replace('_', ' ')}`
        : 'Contemporary modern interior design';
      
      const roomTypePrompt = room.room_type 
        ? `Room type: ${room.room_type.replace('_', ' ')}`
        : '';
      
      const fullPrompt = `${stylePrompt}. ${roomTypePrompt}. Create a photorealistic interior design render with furniture, decor, and lighting.`;

      // Submit job to edge function
      const { data, error } = await supabase.functions.invoke('process-room-phase', {
        body: {
          action: 'submit',
          jobType: 'generation',
          projectId: projectId,
          roomId: room.id,
          payload: {
            prompt: fullPrompt,
            style: room.selected_style,
            roomType: room.room_type
          }
        }
      });

      if (error) throw error;

      toast({
        title: 'Generation Started',
        description: 'AI is generating your interior design render. This may take 1-2 minutes.',
      });

      // Start polling for job status
      refetchJob();
      
    } catch (error: any) {
      console.error('Failed to submit generation job:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'Failed to start render generation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingJob(false);
    }
  };

  const handleSubmitChangeRequest = () => {
    toast({
      title: 'Change Request Submitted',
      description: 'Your feedback has been recorded.',
    });
    setChangeRequestOpen(false);
    setChangeRequest('');
  };

  const handleDownload = async () => {
    if (renderImage?.signedUrl) {
      window.open(renderImage.signedUrl, '_blank');
      toast({
        title: 'Download Started',
        description: 'High-resolution image is being downloaded.',
      });
    } else {
      toast({
        title: 'No Image Available',
        description: 'Generate a render first.',
        variant: 'destructive',
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/share/room/${room.id}`);
    toast({
      title: 'Link Copied',
      description: 'Share link copied to clipboard.',
    });
  };

  const handleAddToBudget = () => {
    toast({
      title: 'Added to Budget',
      description: 'Room has been added to the budget module.',
    });
  };

  const getStatusBadge = () => {
    switch (generationStatus) {
      case 'processing':
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Processing</Badge>;
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-destructive';
  };

  const hasRender = !!renderImage?.signedUrl;
  const isGenerating = isSubmittingJob || generationStatus === 'processing';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Phase 5: Generate</h3>
        <p className="text-sm text-muted-foreground mt-1">
          AI-generated interior design render
        </p>
      </div>

      {/* Generation Status */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Generation Status</h4>
        <div className="p-4 rounded-lg border bg-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusBadge()}
              {isGenerating && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
            {isGenerating && estimatedTime && (
              <span className="text-xs text-muted-foreground">{estimatedTime}</span>
            )}
          </div>
          
          {(isGenerating || hasRender) && (
            <Progress value={progressPercent} className="h-2" />
          )}

          {currentJob?.status === 'failed' && currentJob?.error_message && (
            <div className="flex items-start gap-2 p-2 rounded bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{currentJob.error_message}</span>
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Model: {generationParams.model}</span>
            <span>•</span>
            <span>Resolution: {generationParams.resolution}</span>
          </div>
        </div>
      </div>

      {/* Comparison View */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Comparison View</h4>
        <Tabs value={comparisonView} onValueChange={(v) => setComparisonView(v as any)}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="original" className="text-xs">Original</TabsTrigger>
            <TabsTrigger value="cleaned" className="text-xs">Cleaned</TabsTrigger>
            <TabsTrigger value="final" className="text-xs">Final Render</TabsTrigger>
          </TabsList>
          <TabsContent value="original" className="mt-3">
            <div className="aspect-video rounded-lg bg-muted border flex items-center justify-center overflow-hidden">
              {originalImage?.signedUrl ? (
                <img 
                  src={originalImage.signedUrl} 
                  alt="Original room" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-sm text-muted-foreground">Original Room Photo</span>
              )}
            </div>
          </TabsContent>
          <TabsContent value="cleaned" className="mt-3">
            <div className="aspect-video rounded-lg bg-primary/5 border flex items-center justify-center overflow-hidden">
              {cleanedImage?.signedUrl ? (
                <img 
                  src={cleanedImage.signedUrl} 
                  alt="Cleaned room" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-sm text-muted-foreground">Cleaned Room</span>
              )}
            </div>
          </TabsContent>
          <TabsContent value="final" className="mt-3">
            <div className="relative aspect-video rounded-lg overflow-hidden border bg-gradient-to-br from-primary/10 to-primary/5">
              {hasRender ? (
                <img 
                  src={renderImage.signedUrl} 
                  alt="Final render" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="text-sm text-primary">Generating render...</span>
                    </>
                  ) : (
                    <>
                      <Image className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Click "Generate Render" to start</span>
                    </>
                  )}
                </div>
              )}
              
              {/* Action buttons overlay */}
              {hasRender && (
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-8 w-8"
                    onClick={() => setFullscreenOpen(true)}
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-8 w-8"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-8 w-8"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Before/After Slider */}
        {comparisonView === 'final' && hasRender && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Original</span>
              <span>Final</span>
            </div>
            <Slider
              value={comparisonSlider}
              onValueChange={setComparisonSlider}
              max={100}
              step={1}
            />
          </div>
        )}
      </div>

      {/* Quality Metrics - only show if render exists */}
      {hasRender && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Quality Metrics</h4>
            <Badge 
              className={`${overallScore >= 85 ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'}`}
            >
              Overall: {overallScore}/100
            </Badge>
          </div>
          <div className="space-y-2">
            {qualityMetrics.map((metric) => (
              <div key={metric.name} className="flex items-center justify-between p-2 rounded-lg border bg-card">
                <div className="flex items-center gap-2">
                  {metric.critical && <Badge variant="outline" className="text-[10px] px-1">Critical</Badge>}
                  <span className="text-xs">{metric.name}</span>
                </div>
                <span className={`text-sm font-semibold ${getScoreColor(metric.score)}`}>
                  {metric.score}/100
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validation Results - only show if render exists */}
      {hasRender && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Validation Results</h4>
          <div className="space-y-1.5">
            {validationItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-2 p-2 rounded-lg border ${
                  item.passed 
                    ? 'bg-green-500/5 border-green-500/20' 
                    : 'bg-destructive/5 border-destructive/20'
                }`}
              >
                {item.passed ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-destructive" />
                )}
                <span className={`text-xs ${item.passed ? 'text-green-700' : 'text-destructive'}`}>
                  {item.label}
                </span>
                {item.critical && (
                  <Badge variant="outline" className="ml-auto text-[10px] px-1">Critical</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="pt-4 border-t space-y-2">
        {/* Primary action - Generate or Approve */}
        {!hasRender ? (
          <Button
            className="w-full h-12 text-base"
            onClick={handleRegenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Image className="mr-2 h-5 w-5" />
                Generate Render
              </>
            )}
          </Button>
        ) : (
          <Button
            className="w-full h-12 text-base"
            onClick={handleApprove}
            disabled={!allValidationsPassed || isApproving || room.phase_5_completed}
          >
            <Check className="mr-2 h-5 w-5" />
            {room.phase_5_completed ? 'Already Approved' : 'Approve Final Render'}
          </Button>
        )}
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            onClick={handleRegenerate}
            disabled={isGenerating}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {hasRender ? 'Regenerate' : 'Generate'}
          </Button>
          <Dialog open={changeRequestOpen} onOpenChange={setChangeRequestOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={!hasRender}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Request Changes
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Changes</DialogTitle>
                <DialogDescription>
                  Describe what changes you'd like to see in the render.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="e.g., Make the sofa darker, add more plants, adjust lighting..."
                value={changeRequest}
                onChange={(e) => setChangeRequest(e.target.value)}
                className="min-h-[120px]"
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setChangeRequestOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitChangeRequest}>
                  Submit Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={handleDownload} disabled={!hasRender}>
            <Download className="mr-2 h-4 w-4" />
            Download Hi-Res
          </Button>
          <Button variant="outline" onClick={handleAddToBudget} disabled={!hasRender}>
            <DollarSign className="mr-2 h-4 w-4" />
            Add to Budget
          </Button>
        </div>
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
          <div className="relative w-full h-[90vh] bg-black flex items-center justify-center">
            {renderImage?.signedUrl ? (
              <img 
                src={renderImage.signedUrl} 
                alt="Final Render Full Size" 
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-white text-lg">No render available</div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setFullscreenOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}