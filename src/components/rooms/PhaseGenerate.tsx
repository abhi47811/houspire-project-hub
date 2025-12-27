import { useState } from 'react';
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
  ChevronLeft,
  ChevronRight
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
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface Room {
  id: string;
  project_id: string;
  current_phase: number;
  phase_5_completed: boolean;
  selected_style: string | null;
  final_quality_score: number | null;
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

export function PhaseGenerate({ room, projectId }: PhaseGenerateProps) {
  const queryClient = useQueryClient();
  const [isApproving, setIsApproving] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [changeRequestOpen, setChangeRequestOpen] = useState(false);
  const [changeRequest, setChangeRequest] = useState('');
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [comparisonSlider, setComparisonSlider] = useState([50]);
  const [comparisonView, setComparisonView] = useState<'original' | 'cleaned' | 'final'>('final');

  // Determine generation status based on room state
  const getGenerationStatus = (): GenerationStatus => {
    if (room.phase_5_completed) return 'completed';
    if (room.final_quality_score && room.final_quality_score < 50) return 'failed';
    return 'pending';
  };
  
  const generationStatus = getGenerationStatus();
  const progressPercent = generationStatus === 'completed' ? 100 : 0;
  const estimatedTime = '2 min remaining';
  const generationParams = { model: 'Stable Diffusion XL', resolution: '2048×2048' };

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

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      // Update room
      const { error: roomError } = await supabase
        .from('rooms')
        .update({
          phase_5_completed: true,
          final_quality_score: overallScore,
        })
        .eq('id', room.id);

      if (roomError) throw roomError;

      // Check if all rooms in project are complete
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

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    // Mock regeneration
    setTimeout(() => {
      setIsRegenerating(false);
      toast({
        title: 'Regeneration Started',
        description: 'New render is being generated.',
      });
    }, 1500);
  };

  const handleSubmitChangeRequest = () => {
    toast({
      title: 'Change Request Submitted',
      description: 'Your feedback has been recorded.',
    });
    setChangeRequestOpen(false);
    setChangeRequest('');
  };

  const handleDownload = () => {
    toast({
      title: 'Download Started',
      description: 'High-resolution image is being prepared.',
    });
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
              {generationStatus === 'processing' && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
            {generationStatus === 'processing' && (
              <span className="text-xs text-muted-foreground">{estimatedTime}</span>
            )}
          </div>
          
          {generationStatus !== 'pending' && (
            <Progress value={progressPercent} className="h-2" />
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
            <div className="aspect-video rounded-lg bg-muted border flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Original Room Photo</span>
            </div>
          </TabsContent>
          <TabsContent value="cleaned" className="mt-3">
            <div className="aspect-video rounded-lg bg-primary/5 border flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Cleaned Room</span>
            </div>
          </TabsContent>
          <TabsContent value="final" className="mt-3">
            <div className="relative aspect-video rounded-lg overflow-hidden border bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm text-primary">Final Staged Render</span>
              </div>
              
              {/* Action buttons overlay */}
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
            </div>
          </TabsContent>
        </Tabs>

        {/* Before/After Slider */}
        {comparisonView === 'final' && (
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

      {/* Quality Metrics */}
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

      {/* Validation Results */}
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

      {/* Actions */}
      <div className="pt-4 border-t space-y-2">
        <Button
          className="w-full h-12 text-base"
          onClick={handleApprove}
          disabled={!allValidationsPassed || isApproving || room.phase_5_completed}
        >
          <Check className="mr-2 h-5 w-5" />
          {room.phase_5_completed ? 'Already Approved' : 'Approve Final Render'}
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            onClick={handleRegenerate}
            disabled={isRegenerating}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRegenerating ? 'animate-spin' : ''}`} />
            Regenerate
          </Button>
          <Dialog open={changeRequestOpen} onOpenChange={setChangeRequestOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
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
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Hi-Res
          </Button>
          <Button variant="outline" onClick={handleAddToBudget}>
            <DollarSign className="mr-2 h-4 w-4" />
            Add to Budget
          </Button>
        </div>
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
          <div className="relative w-full h-[90vh] bg-black flex items-center justify-center">
            <div className="text-white text-lg">Final Staged Render (2K)</div>
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
