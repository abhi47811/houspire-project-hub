import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, History, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface CleaningVersion {
  version: number;
  imageUrl: string;
  prompt: string;
  timestamp: string;
}

interface Room {
  id: string;
  project_id: string;
  cleaning_versions?: CleaningVersion[];
}

interface CleaningRefinementProps {
  room: Room;
  originalImageUrl?: string;
  currentCleanedUrl?: string;
  onRefinementComplete?: () => void;
}

export function CleaningRefinement({
  room,
  originalImageUrl,
  currentCleanedUrl,
  onRefinementComplete,
}: CleaningRefinementProps) {
  const queryClient = useQueryClient();
  const [refinementPrompt, setRefinementPrompt] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  
  // Initialize versions from room data or create initial version
  const [versions, setVersions] = useState<CleaningVersion[]>(() => {
    const existingVersions = room.cleaning_versions as CleaningVersion[] | undefined;
    if (existingVersions && existingVersions.length > 0) {
      return existingVersions;
    }
    // Create initial version from current cleaned image
    if (currentCleanedUrl) {
      return [{
        version: 0,
        imageUrl: currentCleanedUrl,
        prompt: 'Initial AI cleaning',
        timestamp: new Date().toISOString(),
      }];
    }
    return [];
  });
  
  const [currentVersionIndex, setCurrentVersionIndex] = useState(versions.length - 1);

  // Update versions when room data changes
  useEffect(() => {
    const existingVersions = room.cleaning_versions as CleaningVersion[] | undefined;
    if (existingVersions && existingVersions.length > 0) {
      setVersions(existingVersions);
      setCurrentVersionIndex(existingVersions.length - 1);
    }
  }, [room.cleaning_versions]);

  const handleRefine = async () => {
    if (!refinementPrompt.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter refinement instructions.',
        variant: 'destructive',
      });
      return;
    }

    setIsRefining(true);

    try {
      // Get the base image for refinement (current version or original)
      const baseImageUrl = versions[currentVersionIndex]?.imageUrl || originalImageUrl;
      
      if (!baseImageUrl) {
        throw new Error('No base image available for refinement');
      }

      // Call the process-room-phase edge function with refinement mode
      const { data, error } = await supabase.functions.invoke('process-room-phase', {
        body: {
          action: 'submit',
          jobType: 'cleaning',
          projectId: room.project_id,
          roomId: room.id,
          payload: {
            mask: 'full_image',
            refinementPrompt: refinementPrompt,
            baseImageUrl: baseImageUrl,
          },
        },
      });

      if (error) throw error;

      // Create new version (the actual image URL will be updated when job completes)
      const newVersion: CleaningVersion = {
        version: versions.length,
        imageUrl: baseImageUrl, // Will be updated when job completes
        prompt: refinementPrompt,
        timestamp: new Date().toISOString(),
      };

      const updatedVersions = [...versions, newVersion];
      setVersions(updatedVersions);
      setCurrentVersionIndex(updatedVersions.length - 1);

      // Save versions to database
      await supabase
        .from('rooms')
        .update({
          cleaning_versions: JSON.parse(JSON.stringify(updatedVersions)),
        })
        .eq('id', room.id);

      setRefinementPrompt('');
      
      toast({
        title: 'Refinement Started',
        description: `Creating version ${newVersion.version}. Please wait for processing.`,
      });

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['room', room.id] });
      queryClient.invalidateQueries({ queryKey: ['room-image', room.id, 'cleaned'] });
      
      onRefinementComplete?.();
    } catch (error: any) {
      console.error('Refinement error:', error);
      toast({
        title: 'Refinement Failed',
        description: error.message || 'Failed to refine cleaning',
        variant: 'destructive',
      });
    } finally {
      setIsRefining(false);
    }
  };

  const handleVersionChange = async (versionIndex: number) => {
    setCurrentVersionIndex(versionIndex);
    
    // Optionally update the room's current cleaned image to this version
    const selectedVersion = versions[versionIndex];
    if (selectedVersion?.imageUrl) {
      // Update room_images table is complex - just update UI for now
      toast({
        title: 'Version Selected',
        description: `Viewing version ${selectedVersion.version}`,
      });
    }
  };

  const currentVersion = versions[currentVersionIndex];

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-primary" />
          Refine Cleaning
          {currentVersion && (
            <Badge variant="outline" className="ml-2">v{currentVersion.version}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image Comparison */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Original</p>
            <div className="aspect-video rounded-lg bg-muted border overflow-hidden">
              {originalImageUrl ? (
                <img
                  src={originalImageUrl}
                  alt="Original room"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                  No original image
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              Cleaned (v{currentVersion?.version ?? 0})
              {currentVersion?.version === versions.length - 1 && (
                <Badge variant="secondary" className="text-[10px]">Latest</Badge>
              )}
            </p>
            <div className="aspect-video rounded-lg bg-primary/5 border overflow-hidden">
              {currentVersion?.imageUrl ? (
                <img
                  src={currentVersion.imageUrl}
                  alt="Cleaned room"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                  No cleaned image
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Version History */}
        {versions.length > 1 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <History className="h-4 w-4" />
              Version History
            </div>
            <Tabs 
              value={currentVersionIndex.toString()} 
              onValueChange={(v) => handleVersionChange(parseInt(v))}
            >
              <TabsList className="w-full flex flex-wrap h-auto gap-1 p-1">
                {versions.map((version, index) => (
                  <TabsTrigger
                    key={index}
                    value={index.toString()}
                    className="text-xs px-2 py-1"
                  >
                    v{version.version}
                    {index === versions.length - 1 && (
                      <Star className="h-3 w-3 ml-1 text-amber-500" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {versions.map((version, index) => (
                <TabsContent key={index} value={index.toString()} className="mt-2">
                  <div className="bg-muted/50 rounded-md p-3 space-y-1">
                    <p className="text-xs font-medium">Prompt:</p>
                    <p className="text-xs text-muted-foreground">{version.prompt}</p>
                    <p className="text-[10px] text-muted-foreground mt-2">
                      {new Date(version.timestamp).toLocaleString()}
                    </p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        {/* Refinement Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Refinement Instructions</label>
          <Textarea
            value={refinementPrompt}
            onChange={(e) => setRefinementPrompt(e.target.value)}
            placeholder="E.g., Remove the shadow in the bottom left corner, straighten the window frame, fix the ceiling line..."
            rows={3}
            disabled={isRefining}
          />
        </div>

        {/* Action Buttons */}
        <Button
          onClick={handleRefine}
          disabled={isRefining || !refinementPrompt.trim()}
          className="w-full"
        >
          {isRefining ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refining...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refine Cleaning
            </>
          )}
        </Button>

        {/* Helper Text */}
        <p className="text-xs text-muted-foreground">
          Tip: Be specific about what needs to be fixed. All versions are saved and you can switch back to any previous version.
        </p>
      </CardContent>
    </Card>
  );
}
