import { useState, useEffect, useCallback, useMemo } from 'react';
import { Palette, Copy, Save, Sparkles, Check, ChevronDown, Compass, Library, Upload, ArrowLeft, MapPin, Star, Clock, CheckCircle2, AlertTriangle, Zap, Edit3, FileBox, Undo2, Redo2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { LibraryBrowser } from '@/components/library/LibraryBrowser';
import { UploadPermissionPrompt } from '@/components/library/UploadPermissionPrompt';
import { libraryService, LibraryImage } from '@/services/api/libraryService';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { GenerationPathsSelector, GenerationPath } from './GenerationPathsSelector';
import { SmartDefaultsDisplay } from './SmartDefaultsDisplay';
import { ManualPromptEditor } from './ManualPromptEditor';
import { PromptPreview } from './PromptPreview';
import { CopySettingsDialog, SaveTemplateDialog, UseTemplateDialog } from '@/components/dialogs';
import { useHistory } from '@/hooks/useHistory';
import { useEnhancedKeyboardShortcuts, getShortcutHint, SHORTCUTS } from '@/hooks/useEnhancedKeyboardShortcuts';
import { handleApiError } from '@/lib/api-error';

interface Room {
  id: string;
  current_phase: number;
  phase_4_completed: boolean;
  selected_style: string | null;
  room_type: string | null;
  smart_default_id: string | null;
  generation_path?: string | null;
  custom_prompt?: string | null;
}

interface PhaseCustomizeProps {
  room: Room;
  projectId: string;
}

type Mode = 'choose' | 'library' | 'upload' | 'confirmation' | 'customize';

interface DesignStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
  colors: string[];
}

const designStyles: DesignStyle[] = [
  { id: 'modern_indian', name: 'Modern Indian', description: 'Contemporary take on traditional Indian aesthetics', icon: '🏛️', colors: ['#C45D3E', '#E8D5B7', '#2D4A3E'] },
  { id: 'contemporary', name: 'Contemporary', description: 'Clean lines with current design trends', icon: '🔲', colors: ['#F5F5F5', '#333333', '#E58550'] },
  { id: 'minimalist', name: 'Minimalist', description: 'Less is more, focus on essentials', icon: '◻️', colors: ['#FFFFFF', '#F0F0F0', '#1A1A1A'] },
  { id: 'scandinavian', name: 'Scandinavian', description: 'Light woods, neutral colors, cozy vibes', icon: '🌲', colors: ['#F7F3EE', '#D4C4B0', '#5C6B73'] },
  { id: 'industrial', name: 'Industrial', description: 'Raw materials, exposed elements', icon: '🏭', colors: ['#4A4A4A', '#8B7355', '#C9C9C9'] },
  { id: 'bohemian', name: 'Bohemian', description: 'Eclectic, colorful, layered textures', icon: '🎨', colors: ['#D4A574', '#8B4B62', '#2D5A45'] },
  { id: 'art_deco', name: 'Art Deco', description: 'Glamorous geometric patterns', icon: '✨', colors: ['#C9A962', '#1E3A4C', '#FFFFFF'] },
  { id: 'traditional', name: 'Traditional Indian', description: 'Classic Indian craftsmanship and motifs', icon: '🪷', colors: ['#8B1A1A', '#DAA520', '#2F4F4F'] },
  { id: 'tropical', name: 'Tropical', description: 'Nature-inspired, lush greenery', icon: '🌴', colors: ['#228B22', '#F5DEB3', '#8B4513'] },
  { id: 'japandi', name: 'Japandi', description: 'Japanese minimalism meets Scandi warmth', icon: '🍵', colors: ['#E8DCC4', '#5C4033', '#9CAF88'] },
  { id: 'rustic', name: 'Rustic', description: 'Natural materials, earthy tones', icon: '🪵', colors: ['#8B7355', '#D4C4B0', '#556B2F'] },
  { id: 'luxury', name: 'Luxury Modern', description: 'High-end finishes, premium materials', icon: '💎', colors: ['#1E2238', '#C9A962', '#FFFFFF'] },
  { id: 'coastal', name: 'Coastal', description: 'Beach-inspired, breezy and light', icon: '🌊', colors: ['#87CEEB', '#F5F5DC', '#2F4F4F'] },
];

// Smart Default structure from database
interface SmartDefaultDB {
  id: string;
  style: string;
  room_type: string;
  style_slug: string;
  room_type_slug: string;
  specifications: Array<{ item: string; description?: string; quantity?: number }>;
  checklist: Array<string | { ITEM?: string; CATEGORY?: string }>;
  finishes: Array<{ type: string; value: string; color?: string }>;
}

// Transformed for UI display
interface SmartDefault {
  id: string;
  furniture: string[];
  lighting: string;
  flooring: string;
  ceiling: string;
  colors: { name: string; hex: string }[];
  checklist: string[];
  raw: SmartDefaultDB | null;
}

// Fallback mock data for when database is empty
const fallbackSmartDefaults: Record<string, Omit<SmartDefault, 'id' | 'raw'>> = {
  modern_indian: {
    furniture: ['L-shaped sofa with ethnic cushions', 'Carved wooden coffee table', 'Brass accent pieces', 'Jharokha-style mirror'],
    lighting: 'Chandelier with brass finish + recessed LEDs',
    flooring: 'Italian marble with border design',
    ceiling: 'False ceiling with cove lighting (8" drop)',
    colors: [{ name: 'Terracotta', hex: '#C45D3E' }, { name: 'Ivory', hex: '#E8D5B7' }, { name: 'Forest', hex: '#2D4A3E' }, { name: 'Gold', hex: '#DAA520' }],
    checklist: ['Ethnic cushions', 'Brass accents', 'Traditional artwork'],
  },
  contemporary: {
    furniture: ['Modular sectional sofa', 'Glass-top center table', 'Floating TV unit', 'Accent armchair'],
    lighting: 'Track lighting + pendant over dining',
    flooring: 'Engineered wood in oak finish',
    ceiling: 'Simple false ceiling with profile lights (6" drop)',
    colors: [{ name: 'Off-white', hex: '#F5F5F5' }, { name: 'Charcoal', hex: '#333333' }, { name: 'Terracotta', hex: '#E58550' }, { name: 'Sage', hex: '#9CAF88' }],
    checklist: ['Clean lines', 'Minimal decor', 'Statement lighting'],
  },
  minimalist: {
    furniture: ['Low-profile platform sofa', 'Minimal coffee table', 'Built-in storage', 'Single statement piece'],
    lighting: 'Hidden LED strips + minimal downlights',
    flooring: 'Polished concrete or light wood',
    ceiling: 'Flush ceiling with recessed fixtures (no drop)',
    colors: [{ name: 'Pure White', hex: '#FFFFFF' }, { name: 'Light Gray', hex: '#F0F0F0' }, { name: 'Black', hex: '#1A1A1A' }, { name: 'Natural', hex: '#E8DCC4' }],
    checklist: ['No clutter', 'Functional pieces only', 'Neutral palette'],
  },
};

interface VastuPreference {
  id: string;
  label: string;
  description: string;
}

const vastuPreferences: VastuPreference[] = [
  { id: 'tv_east', label: 'TV on East wall', description: 'Ideal placement as per Vastu' },
  { id: 'pooja_northeast', label: 'Pooja space in Northeast', description: 'Sacred corner placement' },
  { id: 'bed_south', label: 'Bed head towards South', description: 'Better sleep orientation' },
  { id: 'entrance_north', label: 'Main entrance facing North/East', description: 'Auspicious entry direction' },
];

export function PhaseCustomize({ room, projectId }: PhaseCustomizeProps) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>('choose');
  const [selectedLibraryImage, setSelectedLibraryImage] = useState<LibraryImage | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadAnalysis, setUploadAnalysis] = useState<{ room_type: string; design_style: string; confidence: number } | null>(null);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  
  // Customization state with undo/redo support
  interface CustomizationState {
    selectedStyle: string;
    falseCeilingDrop: number;
    selectedVastu: string[];
    customRequirements: string;
    generationPath: GenerationPath;
    manualPrompt: string;
    bypassPrompt: string;
  }
  
  const initialCustomizationState: CustomizationState = {
    selectedStyle: room.selected_style || '',
    falseCeilingDrop: 8,
    selectedVastu: [],
    customRequirements: '',
    generationPath: (room.generation_path as GenerationPath) || 'smart_defaults',
    manualPrompt: room.custom_prompt || '',
    bypassPrompt: '',
  };
  
  const {
    state: customization,
    setState: setCustomization,
    undo,
    redo,
    canUndo,
    canRedo,
    historyLength,
  } = useHistory<CustomizationState>(initialCustomizationState);
  
  // Helper functions to update individual fields
  const setSelectedStyle = useCallback((value: string) => {
    setCustomization(prev => ({ ...prev, selectedStyle: value }));
  }, [setCustomization]);
  
  const setFalseCeilingDrop = useCallback((value: number[]) => {
    setCustomization(prev => ({ ...prev, falseCeilingDrop: value[0] }));
  }, [setCustomization]);
  
  const setSelectedVastu = useCallback((value: string[]) => {
    setCustomization(prev => ({ ...prev, selectedVastu: value }));
  }, [setCustomization]);
  
  const setCustomRequirements = useCallback((value: string) => {
    setCustomization(prev => ({ ...prev, customRequirements: value }));
  }, [setCustomization]);
  
  const setGenerationPath = useCallback((value: GenerationPath) => {
    setCustomization(prev => ({ ...prev, generationPath: value }));
  }, [setCustomization]);
  
  const setManualPrompt = useCallback((value: string) => {
    setCustomization(prev => ({ ...prev, manualPrompt: value }));
  }, [setCustomization]);
  
  const setBypassPrompt = useCallback((value: string) => {
    setCustomization(prev => ({ ...prev, bypassPrompt: value }));
  }, [setCustomization]);
  
  // Extract values for easier access
  const { 
    selectedStyle, 
    falseCeilingDrop, 
    selectedVastu, 
    customRequirements, 
    generationPath, 
    manualPrompt, 
    bypassPrompt 
  } = customization;
  
  const [isApplying, setIsApplying] = useState(false);
  const [isGeneratingMoodboard, setIsGeneratingMoodboard] = useState(false);
  const [moodboardImages, setMoodboardImages] = useState<string[]>([]);
  const [showStyleDialog, setShowStyleDialog] = useState(false);
  
  // Dialog states
  const [showCopyDialog, setShowCopyDialog] = useState(false);
  const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false);
  const [showUseTemplateDialog, setShowUseTemplateDialog] = useState(false);
  
  // Keyboard shortcuts for customize phase
  useEnhancedKeyboardShortcuts({
    onUndo: () => {
      if (canUndo && mode === 'customize') {
        undo();
        toast({ title: 'Undo', description: 'Reverted to previous state' });
      }
    },
    onRedo: () => {
      if (canRedo && mode === 'customize') {
        redo();
        toast({ title: 'Redo', description: 'Restored next state' });
      }
    },
    onSave: () => {
      if (mode === 'customize') {
        setShowSaveTemplateDialog(true);
      }
    },
    onCopySettings: () => {
      if (mode === 'customize') {
        setShowCopyDialog(true);
      }
    },
    onContinue: () => {
      if (mode === 'customize' && !isApplying) {
        handleApplyAndContinue();
      }
    },
  });

  // Fetch rooms for copy dialog
  const { data: projectRooms } = useQuery({
    queryKey: ['rooms', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('id, room_name, room_number, room_type')
        .eq('project_id', projectId);
      if (error) throw error;
      return data;
    },
  });

  // Fetch project for city
  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('city')
        .eq('id', projectId)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const userCity = project?.city || 'Mumbai';
  const roomType = room.room_type || 'living_room';

  // Fetch smart defaults from database based on room type and style
  const { data: smartDefaults, isLoading: isLoadingDefaults } = useQuery({
    queryKey: ['smart-defaults-db', roomType, selectedStyle],
    queryFn: async (): Promise<SmartDefault | null> => {
      if (!selectedStyle) return null;
      
      // Convert style ID to style name for database lookup
      const styleData = designStyles.find(s => s.id === selectedStyle);
      const styleName = styleData?.name || selectedStyle;
      const roomTypeName = roomType?.replace('_', ' ') || 'living room';
      
      // Query the database using RPC function
      const { data, error } = await supabase.rpc('get_smart_default', {
        p_style: styleName,
        p_room_type: roomTypeName
      });
      
      if (error) {
        console.error('Error fetching smart defaults:', error);
      }
      
      // If database has data, transform it for UI
      if (data && data.length > 0) {
        const dbData = data[0] as SmartDefaultDB;
        
        // Extract furniture from specifications
        const furniture = dbData.specifications
          ?.filter((s: { item: string }) => s.item)
          .map((s: { item: string; description?: string }) => s.description ? `${s.item}: ${s.description}` : s.item) || [];
        
        // Extract finishes
        const lighting = dbData.finishes?.find((f: { type: string }) => f.type === 'lighting')?.value || 'LED recessed lighting';
        const flooring = dbData.finishes?.find((f: { type: string }) => f.type === 'flooring')?.value || 'Vitrified tiles';
        const ceiling = dbData.finishes?.find((f: { type: string }) => f.type === 'ceiling')?.value || 'False ceiling with cove lighting';
        
        // Extract colors from finishes or use defaults
        const colorFinishes = dbData.finishes?.filter((f: { type: string; color?: string }) => f.color) || [];
        const colors = colorFinishes.length > 0 
          ? colorFinishes.map((f: { value: string; color?: string }) => ({ name: f.value, hex: f.color || '#888888' }))
          : designStyles.find(s => s.id === selectedStyle)?.colors.map((c, i) => ({ name: `Color ${i+1}`, hex: c })) || [];
        
        // Transform checklist items to strings (handle both string and object formats)
        const checklist = (dbData.checklist || []).map(item => {
          if (typeof item === 'string') return item;
          return (item as { ITEM?: string })?.ITEM || '';
        }).filter(Boolean);
        
        return {
          id: dbData.id,
          furniture,
          lighting,
          flooring,
          ceiling,
          colors,
          checklist,
          raw: dbData
        };
      }
      
      // Fallback to hardcoded data if database is empty
      const fallback = fallbackSmartDefaults[selectedStyle] || fallbackSmartDefaults.contemporary;
      return {
        id: '',
        ...fallback,
        raw: null
      };
    },
    enabled: !!selectedStyle,
  });

  // Handle library image selection
  const handleLibrarySelect = async (image: LibraryImage) => {
    setSelectedLibraryImage(image);
    setSelectedStyle(image.design_style);
    
    // Track selection and persist style immediately
    if (user?.id) {
      await libraryService.trackSelection(image.id, projectId, room.id);
    }
    
    // Save style AND library_reference_id to database immediately
    try {
      await supabase
        .from('rooms')
        .update({ 
          selected_style: image.design_style,
          library_reference_id: image.id,  // CRITICAL: Save the library reference
          updated_at: new Date().toISOString()
        })
        .eq('id', room.id);
    } catch (error) {
      console.error('Failed to save style:', error);
    }
    
    setMode('confirmation');
  };

  // Handle library confirmation - skip to Phase 5
  const handleLibraryConfirm = async () => {
    if (!selectedLibraryImage) return;
    
    setIsApplying(true);
    try {
      const { error } = await supabase
        .from('rooms')
        .update({
          selected_style: selectedLibraryImage.design_style,
          library_reference_id: selectedLibraryImage.id,  // Ensure library reference is saved
          phase_4_completed: true,
          current_phase: Math.max(room.current_phase, 5),
        })
        .eq('id', room.id);

      if (error) throw error;

      toast({
        title: 'Library Reference Applied',
        description: 'Smart defaults applied. Moving to Phase 5.',
      });

      queryClient.invalidateQueries({ queryKey: ['room', room.id] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to apply library reference.',
        variant: 'destructive',
      });
    } finally {
      setIsApplying(false);
    }
  };

  // Handle upload analysis complete
  const handleUploadAnalysis = (analysis: { room_type: string; design_style: string; confidence: number }, imageUrl: string) => {
    setUploadAnalysis(analysis);
    setUploadedImageUrl(imageUrl);
    setSelectedStyle(analysis.design_style);
    setShowPermissionPrompt(true);
  };

  // Handle permission decision
  const handlePermissionDecision = async (share: boolean) => {
    setShowPermissionPrompt(false);
    
    if (share && uploadedImageUrl && uploadAnalysis) {
      // Catalog to library
      await libraryService.catalogUserUpload({
        imageUrl: uploadedImageUrl,
        roomType: uploadAnalysis.room_type,
        designStyle: uploadAnalysis.design_style,
        projectId: projectId,
        roomId: room.id,
        uploadSource: 'upload',
        userConsent: true,
        analysisData: uploadAnalysis,
      });
      
      toast({
        title: 'Thank you for sharing!',
        description: 'Your reference will help other designers.',
      });
    }
    
    // Save detected style to database immediately
    if (uploadAnalysis?.design_style) {
      try {
        await supabase
          .from('rooms')
          .update({ 
            selected_style: uploadAnalysis.design_style,
            updated_at: new Date().toISOString()
          })
          .eq('id', room.id);
      } catch (error) {
        console.error('Failed to save style:', error);
      }
    }
    
    // Continue to customize mode
    setMode('customize');
  };

  const handleApplyAndContinue = async () => {
    // For manual/bypass, we need the prompt
    if (generationPath === 'manual' && !manualPrompt.trim()) {
      toast({
        title: 'Prompt Required',
        description: 'Please enter a prompt for manual generation.',
        variant: 'destructive',
      });
      return;
    }
    
    if (generationPath === 'bypass' && !bypassPrompt.trim()) {
      toast({
        title: 'Prompt Required',
        description: 'Please enter a bypass prompt.',
        variant: 'destructive',
      });
      return;
    }

    // For smart_defaults and library, we need a style
    if ((generationPath === 'smart_defaults' || generationPath === 'library') && !selectedStyle) {
      toast({
        title: 'Select a Style',
        description: 'Please select a design style before continuing.',
        variant: 'destructive',
      });
      return;
    }

    setIsApplying(true);
    try {
      // Build update object based on generation path
      const updateData: Record<string, unknown> = {
        generation_path: generationPath,
        phase_4_completed: true,
        current_phase: Math.max(room.current_phase, 5),
      };
      
      // Add path-specific data
      if (generationPath === 'smart_defaults' || generationPath === 'library') {
        updateData.selected_style = selectedStyle;
        if (smartDefaults?.id) {
          updateData.smart_default_id = smartDefaults.id;
        }
      }
      
      if (generationPath === 'manual') {
        updateData.custom_prompt = manualPrompt;
        updateData.selected_style = selectedStyle || null;
      }
      
      if (generationPath === 'bypass') {
        updateData.custom_prompt = bypassPrompt;
        updateData.selected_style = null;
        updateData.smart_default_id = null;
        updateData.library_reference_id = null;
      }
      
      const { error } = await supabase
        .from('rooms')
        .update(updateData)
        .eq('id', room.id);

      if (error) throw error;

      const pathMessages: Record<string, string> = {
        smart_defaults: 'Smart defaults applied. Moving to Phase 5.',
        library: 'Library reference saved. Moving to Phase 5.',
        manual: 'Manual prompt saved. Moving to Phase 5.',
        bypass: 'Bypass mode enabled. Moving to Phase 5.',
      };

      toast({
        title: 'Configuration Saved',
        description: pathMessages[generationPath] || 'Moving to Phase 5.',
      });

      queryClient.invalidateQueries({ queryKey: ['room', room.id] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save customizations.',
        variant: 'destructive',
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleGenerateMoodboard = () => {
    setIsGeneratingMoodboard(true);
    setTimeout(() => {
      setMoodboardImages([
        `https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&h=200&fit=crop`,
        `https://images.unsplash.com/photo-1615529182904-14819c35db37?w=300&h=200&fit=crop`,
        `https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&h=200&fit=crop`,
      ]);
      setIsGeneratingMoodboard(false);
      toast({
        title: 'Moodboard Generated',
        description: 'Reference images for your selected style are ready.',
      });
    }, 1500);
  };

  const selectedStyleData = designStyles.find(s => s.id === selectedStyle);

  // ============================================================================
  // RENDER: CHOICE SCREEN (DEFAULT) - 3 Paths: Smart Defaults (Primary), Library, Manual
  // ============================================================================
  if (mode === 'choose') {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Phase 4: Style Reference</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {roomType?.replace('_', ' ') || 'Room'} • {userCity}
          </p>
        </div>

        <h4 className="text-xl font-bold text-center">Choose your approach</h4>

        <div className="grid grid-cols-1 gap-4">
          {/* Smart Defaults - PRIMARY RECOMMENDED */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 relative overflow-hidden"
            onClick={() => {
              setGenerationPath('smart_defaults');
              setMode('customize');
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-3xl">⭐</div>
                <Badge className="bg-yellow-400 text-yellow-950 font-bold text-xs border-0">
                  RECOMMENDED
                </Badge>
              </div>
              
              <div>
                <h3 className="text-lg font-bold">SMART DEFAULTS →</h3>
                <p className="text-primary-foreground/80 text-sm">Pre-configured style + specifications</p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm pt-1">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">168 combinations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">92% approval</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">~2 minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Furniture included</span>
                </div>
              </div>

              <div className="pt-2 border-t border-primary-foreground/20">
                <p className="text-xs text-primary-foreground/70">
                  Includes: Furniture list • Lighting specs • Color palette • Flooring & ceiling
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Library Button */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:bg-muted/50 border-2"
            onClick={() => setMode('library')}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-3xl">📚</div>
                <Badge variant="outline" className="text-xs">
                  Proven References
                </Badge>
              </div>
              
              <div>
                <h3 className="text-lg font-bold">BROWSE LIBRARY →</h3>
                <p className="text-muted-foreground text-sm">Select from tested design images</p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground pt-1">
                <div className="flex items-center gap-1.5">
                  <Library className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">547 references</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">87% approval</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{userCity}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">~3 min</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Manual Prompt - NEW */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:bg-muted/50 border-2 border-dashed"
            onClick={() => {
              setGenerationPath('manual');
              setMode('customize');
            }}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-3xl">✍️</div>
                <div className="flex gap-2">
                  <Badge className="bg-blue-500 text-white text-xs">NEW</Badge>
                  <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-500">
                    ⚠️ Unverified
                  </Badge>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold">MANUAL PROMPT →</h3>
                <p className="text-muted-foreground text-sm">Write your own AI generation prompt</p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground pt-1">
                <div className="flex items-center gap-1.5">
                  <Palette className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Full control</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">~5 min</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BYPASS - Emergency Mode */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg border-2 border-dashed border-destructive/50 hover:border-destructive"
            onClick={() => {
              setGenerationPath('bypass');
              setMode('customize');
            }}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-3xl">⚡</div>
                <div className="flex gap-2">
                  <Badge variant="destructive" className="text-xs">EMERGENCY</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-destructive">BYPASS MODE →</h3>
                <p className="text-muted-foreground text-sm">Direct prompt entry, skip all defaults</p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground pt-1">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-destructive" />
                  <span className="truncate">No guardrails</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Expert only</span>
                </div>
              </div>

              <p className="text-xs text-destructive/80 pt-2 border-t border-destructive/20">
                ⚠️ For emergencies when other methods fail. No style defaults applied.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tip Box */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-medium text-foreground">Smart Defaults are fastest & most consistent.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Pre-configured with furniture, lighting, colors, and finishes. Saves ~15 minutes per room!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: LIBRARY BROWSE
  // ============================================================================
  if (mode === 'library') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setMode('choose')}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h3 className="text-lg font-semibold">Browse Library</h3>
        </div>

        <LibraryBrowser
          roomType={roomType}
          designStyle={selectedStyle || 'contemporary'}
          userCity={userCity}
          onSelect={handleLibrarySelect}
          onUploadNew={() => setMode('upload')}
        />
      </div>
    );
  }

  // ============================================================================
  // RENDER: CONFIRMATION (after library selection)
  // ============================================================================
  if (mode === 'confirmation' && selectedLibraryImage) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setMode('library')}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h3 className="text-lg font-semibold">Confirm Selection</h3>
        </div>

        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle2 className="h-6 w-6" />
          <span className="text-lg font-semibold">Reference Selected</span>
        </div>

        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="aspect-video">
              <img
                src={selectedLibraryImage.thumbnail_url || selectedLibraryImage.image_url}
                alt="Selected reference"
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardContent className="p-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                {selectedLibraryImage.tier === 'featured' && (
                  <Badge className="bg-yellow-500 text-yellow-950 gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Featured Tier
                  </Badge>
                )}
                {selectedLibraryImage.source_type === 'houspire_generated' && (
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Sparkles className="h-3 w-3" />
                    Houspire Render
                  </Badge>
                )}
                {selectedLibraryImage.approval_rate && (
                  <Badge variant="outline" className="text-green-600 border-green-600 gap-1">
                    🟢 {Math.round(selectedLibraryImage.approval_rate * 100)}% success rate
                  </Badge>
                )}
                {selectedLibraryImage.city === userCity && (
                  <Badge variant="outline" className="gap-1">
                    <MapPin className="h-3 w-3" />
                    Matched to {userCity}
                  </Badge>
                )}
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {roomType.replace('_', ' ')} • {selectedLibraryImage.design_style.replace('_', ' ')}
                </p>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Good News Box */}
        <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <h4 className="font-bold text-green-800 dark:text-green-300">GOOD NEWS!</h4>
              <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                This reference has proven smart defaults. You can skip the customization step and go directly to Generate!
              </p>
              <ul className="text-sm text-green-700 dark:text-green-400 mt-2 space-y-1">
                <li>✓ Pre-configured furniture suggestions</li>
                <li>✓ Optimized color palette</li>
                <li>✓ Tested lighting setup</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setMode('customize');
              setSelectedStyle(selectedLibraryImage.design_style);
            }}
          >
            Customize Anyway
          </Button>
          <Button
            className="flex-1"
            onClick={handleLibraryConfirm}
            disabled={isApplying}
          >
            {isApplying ? 'Applying...' : 'Continue to Generate →'}
          </Button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: UPLOAD PATH
  // ============================================================================
  if (mode === 'upload') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setMode('choose')}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h3 className="text-lg font-semibold">Upload Reference Image</h3>
        </div>

        {/* Reminder to use library */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-medium text-foreground">
              Library references are pre-tested and proven to work.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Using library saves ~15 minutes per room and increases success rate by 9%!
            </p>
            <Button
              variant="link"
              className="px-0 mt-2 h-auto"
              onClick={() => setMode('library')}
            >
              Browse Library Instead →
            </Button>
          </div>
        </div>

        {/* Upload placeholder - in real app this would be ImageUpload component */}
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h4 className="font-medium mb-2">Upload your reference image</h4>
            <p className="text-sm text-muted-foreground mb-4">
              PNG, JPG, or WebP up to 10MB
            </p>
            <Button
              onClick={() => {
                // Simulate upload and analysis
                handleUploadAnalysis(
                  { room_type: roomType, design_style: 'contemporary', confidence: 0.85 },
                  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800'
                );
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Select File
            </Button>
          </CardContent>
        </Card>

        {/* Permission Prompt */}
        <UploadPermissionPrompt
          open={showPermissionPrompt}
          imageUrl={uploadedImageUrl || undefined}
          analysis={uploadAnalysis ? {
            room_type: uploadAnalysis.room_type,
            design_style: uploadAnalysis.design_style,
            confidence: uploadAnalysis.confidence
          } : undefined}
          onDecision={handlePermissionDecision}
        />
      </div>
    );
  }

  // ============================================================================
  // RENDER: CUSTOMIZE (for upload path or when user wants to customize library)
  // ============================================================================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setMode('choose')}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div>
          <h3 className="text-lg font-semibold">Phase 4: Customize</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Select design style and customize parameters
          </p>
        </div>
      </div>

      {/* Generation Paths Selector */}
      <GenerationPathsSelector 
        value={generationPath} 
        onChange={setGenerationPath} 
      />

      {/* Path-specific content */}
      {generationPath === 'smart_defaults' && (
        <>
          {/* Design Style Selection */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Design Style</h4>
            <RadioGroup value={selectedStyle} onValueChange={setSelectedStyle}>
              <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                {designStyles.map((style) => (
                  <label
                    key={style.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/50",
                      selectedStyle === style.id 
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20' 
                        : 'bg-card'
                    )}
                  >
                    <RadioGroupItem value={style.id} className="mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{style.icon}</span>
                        <span className="font-medium text-sm">{style.name}</span>
                        {selectedStyle === style.id && (
                          <Badge variant="secondary" className="ml-auto text-xs">Selected</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{style.description}</p>
                      <div className="flex gap-1 mt-2">
                        {style.colors.map((color, i) => (
                          <div
                            key={i}
                            className="h-4 w-4 rounded-full border border-border/50"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Enhanced Smart Defaults Display */}
          {selectedStyle && smartDefaults && (
            <SmartDefaultsDisplay
              smartDefaults={smartDefaults}
              styleName={selectedStyleData?.name || selectedStyle}
              roomType={roomType}
              showActions={false}
            />
          )}
        </>
      )}

      {generationPath === 'library' && (
        <LibraryBrowser
          roomType={roomType}
          designStyle={selectedStyle || 'contemporary'}
          userCity={userCity}
          onSelect={handleLibrarySelect}
          onUploadNew={() => setMode('upload')}
        />
      )}

      {generationPath === 'manual' && (
        <ManualPromptEditor
          value={manualPrompt}
          onChange={setManualPrompt}
          roomType={roomType}
          selectedStyle={selectedStyle}
        />
      )}

      {generationPath === 'bypass' && (
        <div className="space-y-4">
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-destructive">Bypass Mode - Emergency Only</h4>
              <p className="text-sm text-destructive/80 mt-1">
                This prompt will be sent directly to the AI with minimal processing. 
                No style defaults, smart defaults, or library references will be applied.
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-destructive" />
              Direct Prompt
            </Label>
            <Textarea
              placeholder="Enter your complete generation prompt here. Be as detailed as possible about the room type, style, furniture, lighting, colors, and materials..."
              value={bypassPrompt}
              onChange={(e) => setBypassPrompt(e.target.value)}
              className="min-h-[200px] font-mono text-sm border-destructive/30 focus:border-destructive"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{bypassPrompt.length} characters</span>
              <span>Recommended: 200-500 characters</span>
            </div>
          </div>
        </div>
      )}

      {/* Prompt Preview - show for all paths when we have data */}
      {(selectedStyle || manualPrompt || bypassPrompt) && generationPath !== 'bypass' && (
        <PromptPreview
          prompt={manualPrompt || `Create a photorealistic ${roomType.replace('_', ' ')} with ${selectedStyle?.replace('_', ' ') || 'contemporary'} design style. Include appropriate furniture, lighting, and decor elements.`}
          metadata={{
            style: selectedStyle || undefined,
            roomType: roomType,
            usingSmartDefaults: generationPath === 'smart_defaults',
            usingLibraryReference: generationPath === 'library',
          }}
        />
      )}

      {/* Customizations Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="customizations" className="border rounded-lg px-3">
          <AccordionTrigger className="text-sm font-medium py-3">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Customize Settings
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 space-y-4">
            {/* False Ceiling Drop */}
            <div className="space-y-2">
              <Label className="text-sm">False Ceiling Drop Height</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[falseCeilingDrop]}
                  onValueChange={setFalseCeilingDrop}
                  min={6}
                  max={10}
                  step={0.5}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-16 text-right">{falseCeilingDrop}" drop</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6" (Minimal)</span>
                <span>10" (Deep)</span>
              </div>
            </div>

            {/* Vastu Preferences */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Vastu Preferences</Label>
              </div>
              <div className="space-y-2">
                {vastuPreferences.map((pref) => (
                  <div
                    key={pref.id}
                    className="flex items-start gap-3 p-2 rounded-lg border bg-card"
                  >
                    <Checkbox
                      id={pref.id}
                      checked={selectedVastu.includes(pref.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedVastu([...selectedVastu, pref.id]);
                        } else {
                          setSelectedVastu(selectedVastu.filter(id => id !== pref.id));
                        }
                      }}
                    />
                    <div className="flex-1">
                      <label htmlFor={pref.id} className="text-xs font-medium cursor-pointer">
                        {pref.label}
                      </label>
                      <p className="text-[10px] text-muted-foreground">{pref.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Requirements */}
            <div className="space-y-2">
              <Label className="text-sm">Custom Requirements</Label>
              <Textarea
                placeholder="Add any specific requirements, preferences, or notes..."
                value={customRequirements}
                onChange={(e) => setCustomRequirements(e.target.value)}
                className="min-h-[80px] text-sm"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Moodboard Accordion */}
        <AccordionItem value="moodboard" className="border rounded-lg px-3 mt-2">
          <AccordionTrigger className="text-sm font-medium py-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Moodboard
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 space-y-3">
            {moodboardImages.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Generate reference images for your selected style
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateMoodboard}
                  disabled={!selectedStyle || isGeneratingMoodboard}
                >
                  <Sparkles className="mr-2 h-3 w-3" />
                  {isGeneratingMoodboard ? 'Generating...' : 'Generate Moodboard'}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {moodboardImages.map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden border">
                    <img
                      src={img}
                      alt={`Moodboard reference ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Actions */}
      <div className="pt-4 border-t space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={cn(
                "w-full",
                generationPath === 'bypass' && "bg-destructive hover:bg-destructive/90"
              )}
              onClick={handleApplyAndContinue}
              disabled={
                isApplying || 
                room.phase_4_completed || 
                ((generationPath === 'smart_defaults' || generationPath === 'library') && !selectedStyle) ||
                (generationPath === 'manual' && !manualPrompt.trim()) ||
                (generationPath === 'bypass' && !bypassPrompt.trim())
              }
            >
              {room.phase_4_completed ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Customization Complete
                </>
              ) : isApplying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Applying...
                </>
              ) : generationPath === 'bypass' ? (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Apply Bypass & Continue →
                </>
              ) : (
                'Apply & Continue to Phase 5'
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Continue to next phase {getShortcutHint(SHORTCUTS.continue)}</p>
          </TooltipContent>
        </Tooltip>

        {/* Undo/Redo and Quick Actions */}
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={!canUndo}
              >
                <Undo2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo ({getShortcutHint('Cmd+Z')})</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo ({getShortcutHint('Cmd+Shift+Z')})</p>
            </TooltipContent>
          </Tooltip>
          
          {historyLength > 0 && (
            <span className="text-xs text-muted-foreground self-center ml-1">
              {historyLength} change{historyLength !== 1 ? 's' : ''}
            </span>
          )}
          
          <div className="flex-1" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCopyDialog(true)}
              >
                <Copy className="mr-1 h-3 w-3" />
                Copy
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy from Room ({getShortcutHint('Cmd+C')})</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSaveTemplateDialog(true)}
              >
                <Save className="mr-1 h-3 w-3" />
                Save
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save Template ({getShortcutHint('Cmd+S')})</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowUseTemplateDialog(true)}
              >
                <FileBox className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Use Template</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Dialogs */}
      <CopySettingsDialog
        open={showCopyDialog}
        onOpenChange={setShowCopyDialog}
        sourceRoom={{ id: room.id, room_name: null, room_number: 1, room_type: room.room_type }}
        availableRooms={projectRooms || []}
      />
      <SaveTemplateDialog
        open={showSaveTemplateDialog}
        onOpenChange={setShowSaveTemplateDialog}
        settings={{
          selectedStyle,
          falseCeilingDrop,
          selectedVastu,
          customRequirements,
          generationPath,
        }}
        roomType={room.room_type}
      />
      <UseTemplateDialog
        open={showUseTemplateDialog}
        onOpenChange={setShowUseTemplateDialog}
        roomType={room.room_type}
        onApply={(settings) => {
          // Update all settings at once to create a single history entry
          setCustomization(prev => ({
            ...prev,
            selectedStyle: settings.selectedStyle || prev.selectedStyle,
            falseCeilingDrop: settings.falseCeilingDrop || prev.falseCeilingDrop,
            selectedVastu: settings.selectedVastu || prev.selectedVastu,
            customRequirements: settings.customRequirements || prev.customRequirements,
            generationPath: (settings.generationPath as GenerationPath) || prev.generationPath,
          }));
        }}
      />
    </div>
  );
}

export default PhaseCustomize;
