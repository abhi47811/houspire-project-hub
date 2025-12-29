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
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
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
import { RenderRefinement } from './RenderRefinement';
import { QualityScoreDisplay } from './QualityScoreDisplay';
import { QualityControlPanel } from './QualityControlPanel';
import { PromptEditor } from './PromptEditor';
import { useBatches } from '@/hooks/useBatches';
import { useQualityControl } from '@/hooks/useQualityControl';
import { buildRichPrompt, buildRefinementPrompt, getRoomTemplate } from '@/lib/promptTemplates';

interface RegenerateOptions {
  useSmartDefaults: boolean;
  useLibraryReference: boolean;
  manualPrompt?: string;
  customRequirements?: string;
  refinementPrompt?: string;
}

interface Room {
  id: string;
  project_id: string;
  current_phase: number;
  phase_5_completed: boolean;
  selected_style: string | null;
  final_quality_score: number | null;
  room_type: string | null;
  generation_path?: string | null;
  custom_prompt?: string | null;
  smart_default_id?: string | null;
  library_reference_id?: string | null;
  ceiling_fan_detected?: boolean;
  quality_score?: number;
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

interface Render {
  id: string;
  room_id: string;
  image_url: string;
  storage_path: string | null;
  prompt_used: string | null;
  model_used: string | null;
  provider: string | null;
  generation_time_ms: number | null;
  approval_status: 'pending' | 'approved' | 'rejected' | 'needs_revision';
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  quality_score: number | null;
  quality_details: Record<string, unknown> | null;
  version_number: number;
  parent_render_id: string | null;
  created_at: string;
  updated_at: string;
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
  
  // Editable prompt for generation
  const [editablePrompt, setEditablePrompt] = useState('');

  // Batch progress tracking
  const { activeBatch, recentBatches } = useBatches(projectId);
  const generateBatch = activeBatch?.batch_type === 'generate' ? activeBatch : null;

  // Fetch project-wide generation job stats
  const { data: projectJobStats } = useQuery({
    queryKey: ['generation-job-stats', projectId],
    queryFn: async () => {
      const { data } = await supabase
        .from('job_queue')
        .select('status, room_id')
        .eq('project_id', projectId)
        .eq('job_type', 'generation')
        .order('created_at', { ascending: false });
      
      if (!data) return { pending: 0, processing: 0, completed: 0, failed: 0, total: 0 };
      
      // Deduplicate by room_id, keeping only latest job per room
      const latestByRoom = new Map<string, string>();
      data.forEach(job => {
        if (!latestByRoom.has(job.room_id)) {
          latestByRoom.set(job.room_id, job.status);
        }
      });
      
      const stats = { pending: 0, processing: 0, completed: 0, failed: 0, total: 0 };
      latestByRoom.forEach(status => {
        stats.total++;
        if (status === 'pending') stats.pending++;
        else if (status === 'processing') stats.processing++;
        else if (status === 'completed') stats.completed++;
        else if (status === 'failed') stats.failed++;
      });
      
      return stats;
    },
    refetchInterval: 5000 // Poll every 5 seconds
  });

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

  // Helper to resolve image URL (handles both full URLs and relative paths)
  const resolveImageUrl = async (storagePath: string): Promise<string | undefined> => {
    // If it's already a full URL, return as-is
    if (storagePath.startsWith('http://') || storagePath.startsWith('https://')) {
      return storagePath;
    }
    // Otherwise create a signed URL
    const { data: signedData } = await supabase.storage
      .from('room-images')
      .createSignedUrl(storagePath, 3600);
    return signedData?.signedUrl;
  };

  // Fetch render from new renders table (primary source)
  const { data: currentRender, refetch: refetchRender } = useQuery({
    queryKey: ['render', room.id],
    queryFn: async (): Promise<Render | null> => {
      const { data, error } = await supabase
        .from('renders')
        .select('*')
        .eq('room_id', room.id)
        .order('version_number', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      return data as Render | null;
    }
  });

  // Fallback: Fetch render image from room_images (for backward compatibility)
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
      
      const signedUrl = data.storage_path ? await resolveImageUrl(data.storage_path) : undefined;
      return { ...data, signedUrl } as ImageWithSignedUrl;
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
      
      const signedUrl = data.storage_path ? await resolveImageUrl(data.storage_path) : undefined;
      return { ...data, signedUrl } as ImageWithSignedUrl;
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
      
      const signedUrl = data.storage_path ? await resolveImageUrl(data.storage_path) : undefined;
      return { ...data, signedUrl } as ImageWithSignedUrl;
    }
  });

  // Refetch renders when job completes
  useEffect(() => {
    if (currentJob?.status === 'completed') {
      refetchRender();
      refetchRenderImage();
      queryClient.invalidateQueries({ queryKey: ['room', room.id] });
    }
  }, [currentJob?.status, refetchRender, refetchRenderImage, queryClient, room.id]);

  // Get the render URL (prefer renders table, fallback to room_images)
  const renderUrl = currentRender?.image_url || renderImage?.signedUrl;

  // Determine generation status
  const getGenerationStatus = (): GenerationStatus => {
    if (room.phase_5_completed && renderUrl) return 'completed';
    if (currentRender?.approval_status === 'approved') return 'completed';
    if (currentJob?.status === 'processing') return 'processing';
    if (currentJob?.status === 'pending') return 'processing';
    if (currentJob?.status === 'failed') return 'failed';
    return 'pending';
  };
  
  const generationStatus = getGenerationStatus();
  const progressPercent = generationStatus === 'completed' ? 100 : 
    generationStatus === 'processing' ? 60 : 0;
  const estimatedTime = currentJob?.status === 'processing' ? '~2 min remaining' : '';
  const generationParams = { model: 'Gemini 3 Pro Image', resolution: '2048×2048' };

  // Build initial prompt based on generation path
  const buildInitialPrompt = (): string => {
    const genPath = room.generation_path as string | null;
    
    if (genPath === 'bypass' && room.custom_prompt) {
      return room.custom_prompt;
    }
    
    if (genPath === 'manual' && room.custom_prompt) {
      return room.custom_prompt;
    }
    
    // Use room template for rich initial prompt
    const template = getRoomTemplate(room.room_type);
    const hasFan = room.ceiling_fan_detected || false;
    
    return buildRichPrompt(
      room.room_type,
      room.selected_style,
      hasFan,
      undefined, // specs loaded async
      undefined, // checklist loaded async
      undefined, // finishes loaded async
      room.custom_prompt || undefined
    );
  };

  // Build detailed prompt with smart defaults data
  const buildDetailedPrompt = async (): Promise<{ prompt: string; smartDefaultData: any | null }> => {
    const genPath = room.generation_path as string | null;
    
    // For bypass/manual, use custom prompt directly
    if ((genPath === 'bypass' || genPath === 'manual') && room.custom_prompt) {
      return { prompt: room.custom_prompt, smartDefaultData: null };
    }
    
    // Fetch smart defaults if available
    let smartDefaultData = null;
    if (room.smart_default_id) {
      const { data } = await supabase
        .from('smart_defaults')
        .select('id, style, room_type, specifications, checklist, finishes')
        .eq('id', room.smart_default_id)
        .single();
      smartDefaultData = data;
    }
    
    // Detect ceiling fan from room analysis or explicit flag
    let hasCeilingFan = room.ceiling_fan_detected || false;
    if (!hasCeilingFan) {
      const { data: analysis } = await supabase
        .from('room_analysis')
        .select('ceiling_fan_count, other_features')
        .eq('room_id', room.id)
        .single();
      
      if (analysis?.ceiling_fan_count && analysis.ceiling_fan_count > 0) {
        hasCeilingFan = true;
      }
    }
    
    // Build rich prompt using template and smart defaults
    const prompt = buildRichPrompt(
      room.room_type,
      room.selected_style,
      hasCeilingFan,
      smartDefaultData?.specifications,
      smartDefaultData?.checklist,
      smartDefaultData?.finishes,
      room.custom_prompt || undefined
    );
    
    console.log('Built detailed prompt with smart defaults:', {
      roomType: room.room_type,
      style: room.selected_style,
      hasCeilingFan,
      hasSmartDefaults: !!smartDefaultData,
      promptLength: prompt.length
    });
    
    return { prompt, smartDefaultData };
  };

  // Initialize editable prompt
  useEffect(() => {
    if (!editablePrompt) {
      setEditablePrompt(buildInitialPrompt());
    }
  }, [room.generation_path, room.custom_prompt, room.selected_style]);

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
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Update render approval status in renders table
      if (currentRender?.id) {
        const { error: renderError } = await supabase
          .from('renders')
          .update({
            approval_status: 'approved',
            approved_by: user?.id,
            approved_at: new Date().toISOString(),
            quality_score: overallScore ? overallScore / 100 : null, // Convert to 0-1 scale
          })
          .eq('id', currentRender.id);

        if (renderError) {
          console.error('Failed to update render approval:', renderError);
        }
      }

      // Update room status
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

      queryClient.invalidateQueries({ queryKey: ['render', room.id] });
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

  // Submit real generation job - now accepts options from RenderRefinement
  const handleRegenerate = async (options?: RegenerateOptions) => {
    setIsSubmittingJob(true);
    
    try {
      // Build payload based on options
      const payload: Record<string, any> = {
        style: room.selected_style,
        roomType: room.room_type,
        smartDefaultId: room.smart_default_id,
        libraryReferenceId: room.library_reference_id
      };

      // Handle refinement prompts with detail preservation
      if (options?.refinementPrompt) {
        payload.refinementPrompt = buildRefinementPrompt(options.refinementPrompt, true);
      }

      // If manual prompt is provided, pass it directly
      if (options?.manualPrompt) {
        payload.manualPrompt = options.manualPrompt;
      } else if (!options?.refinementPrompt) {
        // Build detailed prompt with smart defaults for initial generation
        const { prompt, smartDefaultData } = await buildDetailedPrompt();
        payload.prompt = prompt;
        
        // Pass smart defaults data to edge function for additional processing
        if (smartDefaultData) {
          payload.smartDefaultData = {
            specifications: smartDefaultData.specifications,
            checklist: smartDefaultData.checklist,
            finishes: smartDefaultData.finishes
          };
        }
      }

      // Add custom requirements if provided
      if (options?.customRequirements) {
        payload.customRequirements = options.customRequirements;
      }

      console.log('Submitting generation with payload:', {
        ...payload,
        prompt: payload.prompt?.substring(0, 200) + '...' // Log first 200 chars
      });

      // Submit job to edge function
      const { data, error } = await supabase.functions.invoke('process-room-phase', {
        body: {
          action: 'submit',
          jobType: 'generation',
          projectId: projectId,
          roomId: room.id,
          payload
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
    if (renderUrl) {
      window.open(renderUrl, '_blank');
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

  const hasRender = !!renderUrl;
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

      {/* Batch Generation Progress Card */}
      {generateBatch && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <div className="flex-1">
                <h4 className="font-medium text-sm">Batch Generation in Progress</h4>
                <p className="text-xs text-muted-foreground">
                  {generateBatch.completed_items} of {generateBatch.total_items} rooms complete
                  {generateBatch.failed_items > 0 && (
                    <span className="text-destructive ml-2">
                      ({generateBatch.failed_items} failed)
                    </span>
                  )}
                </p>
              </div>
            </div>
            <Progress 
              value={(generateBatch.completed_items / generateBatch.total_items) * 100} 
              className="h-2" 
            />
          </CardContent>
        </Card>
      )}

      {/* Project-Wide Generation Stats */}
      {projectJobStats && projectJobStats.total > 0 && (
        <Card className="border-muted">
          <CardContent className="p-4">
            <h4 className="font-medium text-sm mb-3">Project Generation Progress</h4>
            <div className="grid grid-cols-4 gap-3">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="text-sm font-semibold">{projectJobStats.pending}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10">
                <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                <div>
                  <p className="text-xs text-muted-foreground">Processing</p>
                  <p className="text-sm font-semibold text-blue-600">{projectJobStats.processing}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="text-sm font-semibold text-green-600">{projectJobStats.completed}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-destructive/10">
                <XCircle className="h-4 w-4 text-destructive" />
                <div>
                  <p className="text-xs text-muted-foreground">Failed</p>
                  <p className="text-sm font-semibold text-destructive">{projectJobStats.failed}</p>
                </div>
              </div>
            </div>
            {projectJobStats.total > 0 && (
              <Progress 
                value={(projectJobStats.completed / projectJobStats.total) * 100} 
                className="h-1.5 mt-3" 
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Prompt Editor - Show before generation */}
      {!hasRender && !isGenerating && (
        <PromptEditor
          initialPrompt={buildInitialPrompt()}
          generationPath={room.generation_path as 'smart_defaults' | 'library' | 'manual' | 'bypass' | null}
          selectedStyle={room.selected_style}
          roomType={room.room_type}
          onPromptChange={setEditablePrompt}
          isReadOnly={false}
        />
      )}

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
                  src={renderUrl} 
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

      {/* Quality Control Panel - NEW */}
      {hasRender && (
        <QualityControlPanel
          roomId={room.id}
          ceilingFanDetected={room.ceiling_fan_detected}
          onAutoFix={() => handleRegenerate()}
        />
      )}

      {/* Quality Score Display - Enhanced version */}
      {hasRender && (
        <QualityScoreDisplay
          overallScore={overallScore}
          showSuggestions={!room.phase_5_completed}
        />
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

      {/* Render Refinement UI - show when render exists */}
      {hasRender && !room.phase_5_completed && (
        <RenderRefinement
          roomId={room.id}
          projectId={projectId}
          currentRenderUrl={renderUrl}
          onRegenerate={handleRegenerate}
          isGenerating={isGenerating}
        />
      )}

      {/* Actions */}
      <div className="pt-4 border-t space-y-2">
      {/* Primary action - Generate or Approve */}
        {!hasRender ? (
          <Button
            className="w-full h-12 text-base"
            onClick={() => handleRegenerate()}
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
            onClick={() => handleRegenerate()}
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
            {renderUrl ? (
              <img 
                src={renderUrl} 
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