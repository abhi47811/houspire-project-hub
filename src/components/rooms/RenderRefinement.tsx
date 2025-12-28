import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Book, Edit3, Eye, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

interface RenderRefinementProps {
  roomId: string;
  projectId: string;
  currentRenderUrl?: string;
  onRegenerate: (options: RegenerateOptions) => void;
  isGenerating?: boolean;
}

interface RegenerateOptions {
  useSmartDefaults: boolean;
  useLibraryReference: boolean;
  manualPrompt?: string;
  customRequirements?: string;
}

interface RoomData {
  id: string;
  room_type: string;
  selected_style: string;
  smart_default_id: string | null;
  library_reference_id: string | null;
  custom_requirements?: string;
}

interface SmartDefaultData {
  id: string;
  style: string;
  room_type: string;
  specifications: any[];
  checklist: string[];
  finishes: any[];
}

interface LibraryImageData {
  id: string;
  image_url: string;
  design_style: string;
  room_type: string;
  color_palette?: any;
  analysis_data?: any;
}

export function RenderRefinement({
  roomId,
  projectId,
  currentRenderUrl,
  onRegenerate,
  isGenerating = false,
}: RenderRefinementProps) {
  const [activeTab, setActiveTab] = useState<'smart' | 'library' | 'manual'>('smart');
  const [manualPrompt, setManualPrompt] = useState('');
  const [customRequirements, setCustomRequirements] = useState('');
  const [showPromptPreview, setShowPromptPreview] = useState(false);
  const [promptPreview, setPromptPreview] = useState('');
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [smartDefault, setSmartDefault] = useState<SmartDefaultData | null>(null);
  const [libraryImage, setLibraryImage] = useState<LibraryImageData | null>(null);
  const [availableStyles, setAvailableStyles] = useState<string[]>([]);

  // Fetch room data and related references
  useEffect(() => {
    async function fetchData() {
      // Fetch room data
      const { data: room } = await supabase
        .from('rooms')
        .select('id, room_type, selected_style, smart_default_id, library_reference_id')
        .eq('id', roomId)
        .single();

      if (room) {
        setRoomData(room);

        // Fetch smart default if available
        if (room.smart_default_id) {
          const { data: sd } = await supabase
            .from('smart_defaults')
            .select('id, style, room_type, specifications, checklist, finishes')
            .eq('id', room.smart_default_id)
            .single();
          if (sd) setSmartDefault(sd as SmartDefaultData);
        }

        // Fetch library reference if available
        if (room.library_reference_id) {
          const { data: lib } = await supabase
            .from('style_library')
            .select('id, image_url, design_style, room_type, color_palette, analysis_data')
            .eq('id', room.library_reference_id)
            .single();
          if (lib) setLibraryImage(lib as LibraryImageData);
        }
      }

      // Fetch available styles
      const { data: styles } = await supabase
        .rpc('get_available_styles');
      if (styles) {
        setAvailableStyles(styles.map((s: { style: string }) => s.style));
      }
    }

    fetchData();
  }, [roomId]);

  // Build prompt preview
  const buildPromptPreview = async () => {
    setIsLoadingPreview(true);
    
    try {
      let preview = '';
      
      if (activeTab === 'manual') {
        preview = manualPrompt || '(Enter your custom prompt above)';
      } else {
        // Build preview based on selected sources
        preview = `Create a stunning ${roomData?.selected_style || 'Modern'} style ${roomData?.room_type || 'room'}.\n\n`;
        
        if (activeTab === 'smart' && smartDefault) {
          preview += `## Design Specifications:\n`;
          if (smartDefault.specifications?.length > 0) {
            preview += `\n### Furniture & Elements:\n`;
            for (const spec of smartDefault.specifications) {
              if (spec.category && spec.items) {
                preview += `- **${spec.category}**: ${spec.items.join(', ')}\n`;
              }
            }
          }
          if (smartDefault.checklist?.length > 0) {
            preview += `\n### Must-Have Items:\n`;
            preview += smartDefault.checklist.map((item: string) => `- ${item}`).join('\n') + '\n';
          }
          if (smartDefault.finishes?.length > 0) {
            preview += `\n### Finishes & Materials:\n`;
            for (const finish of smartDefault.finishes) {
              if (finish.type && finish.value) {
                preview += `- **${finish.type}**: ${finish.value}\n`;
              }
            }
          }
        }
        
        if (activeTab === 'library' && libraryImage) {
          preview += `## Reference Style:\n`;
          preview += `Using reference image as visual guide.\n`;
          if (libraryImage.color_palette) {
            const palette = libraryImage.color_palette;
            preview += `\n### Color Palette:\n`;
            if (palette.primary) preview += `- Primary: ${palette.primary}\n`;
            if (palette.secondary) preview += `- Secondary: ${palette.secondary}\n`;
            if (palette.accent) preview += `- Accent: ${palette.accent}\n`;
          }
        }
        
        if (customRequirements) {
          preview += `\n## Additional Requirements:\n${customRequirements}\n`;
        }
        
        preview += `\n## CRITICAL REQUIREMENTS:\n`;
        preview += `1. PRESERVE ALL ARCHITECTURAL ELEMENTS\n`;
        preview += `2. PHOTOREALISTIC QUALITY\n`;
        preview += `3. PROPER LIGHTING\n`;
        preview += `4. SCALE & PROPORTION\n`;
        preview += `5. STYLE CONSISTENCY\n`;
      }
      
      setPromptPreview(preview);
    } catch (error) {
      console.error('Error building preview:', error);
      setPromptPreview('Error building preview');
    } finally {
      setIsLoadingPreview(false);
    }
  };

  useEffect(() => {
    if (showPromptPreview) {
      buildPromptPreview();
    }
  }, [showPromptPreview, activeTab, manualPrompt, customRequirements, smartDefault, libraryImage]);

  const handleRegenerate = () => {
    const options: RegenerateOptions = {
      useSmartDefaults: activeTab === 'smart',
      useLibraryReference: activeTab === 'library',
      manualPrompt: activeTab === 'manual' ? manualPrompt : undefined,
      customRequirements: customRequirements || undefined,
    };

    onRegenerate(options);
  };

  const getTabDescription = (tab: string) => {
    switch (tab) {
      case 'smart':
        return smartDefault 
          ? `Using ${smartDefault.style} specifications for ${smartDefault.room_type}`
          : 'No smart defaults linked - select a style in Phase 4';
      case 'library':
        return libraryImage
          ? `Using ${libraryImage.design_style} reference image`
          : 'No library image selected - choose one in Phase 4';
      case 'manual':
        return 'Write your own prompt for full control';
      default:
        return '';
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-primary" />
          Refine & Regenerate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Source Selection Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="smart" className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Smart Defaults</span>
              <span className="sm:hidden">Smart</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-1.5">
              <Book className="h-4 w-4" />
              <span className="hidden sm:inline">Library</span>
              <span className="sm:hidden">Library</span>
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-1.5">
              <Edit3 className="h-4 w-4" />
              <span className="hidden sm:inline">Manual</span>
              <span className="sm:hidden">Manual</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-3 text-sm text-muted-foreground">
            {getTabDescription(activeTab)}
          </div>

          <TabsContent value="smart" className="mt-4 space-y-3">
            {smartDefault ? (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{smartDefault.style}</Badge>
                  <Badge variant="outline">{smartDefault.room_type}</Badge>
                  <Badge variant="outline">{smartDefault.specifications?.length || 0} specs</Badge>
                  <Badge variant="outline">{smartDefault.checklist?.length || 0} items</Badge>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Link a smart default in Phase 4 (Customize) to use this option.
              </p>
            )}
          </TabsContent>

          <TabsContent value="library" className="mt-4 space-y-3">
            {libraryImage ? (
              <div className="flex items-start gap-3">
                <img
                  src={libraryImage.image_url}
                  alt="Library reference"
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{libraryImage.design_style}</Badge>
                    <Badge variant="outline">{libraryImage.room_type}</Badge>
                  </div>
                  {libraryImage.color_palette && (
                    <p className="text-xs text-muted-foreground">Color palette available</p>
                  )}
                  {libraryImage.analysis_data && (
                    <p className="text-xs text-muted-foreground">Analysis data available</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Select a library reference in Phase 4 (Customize) to use this option.
              </p>
            )}
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-3">
            <div>
              <Label htmlFor="manual-prompt">Custom Prompt</Label>
              <Textarea
                id="manual-prompt"
                placeholder="Describe exactly what you want to see in the render..."
                value={manualPrompt}
                onChange={(e) => setManualPrompt(e.target.value)}
                rows={4}
                className="mt-1.5"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Custom Requirements (for all tabs except manual) */}
        {activeTab !== 'manual' && (
          <div>
            <Label htmlFor="custom-requirements">Additional Requirements (optional)</Label>
            <Textarea
              id="custom-requirements"
              placeholder="Add any specific requirements: colors, furniture, layout preferences..."
              value={customRequirements}
              onChange={(e) => setCustomRequirements(e.target.value)}
              rows={2}
              className="mt-1.5"
            />
          </div>
        )}

        {/* Prompt Preview Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between"
          onClick={() => setShowPromptPreview(!showPromptPreview)}
        >
          <span className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview Prompt
          </span>
          {showPromptPreview ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {showPromptPreview && (
          <div className="bg-muted/50 rounded-md p-3 max-h-48 overflow-y-auto">
            {isLoadingPreview ? (
              <p className="text-sm text-muted-foreground">Loading preview...</p>
            ) : (
              <pre className="text-xs whitespace-pre-wrap font-mono">{promptPreview}</pre>
            )}
          </div>
        )}

        {/* Regenerate Button */}
        <Button
          onClick={handleRegenerate}
          disabled={isGenerating || (activeTab === 'manual' && !manualPrompt.trim())}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate Render
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
