import { useState, useEffect } from 'react';
import { Palette, Copy, Save, Sparkles, Check, ChevronDown, Compass, Library, Upload, ArrowLeft, MapPin, Star, Clock, CheckCircle2 } from 'lucide-react';
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
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { LibraryBrowser } from '@/components/library/LibraryBrowser';
import { UploadPermissionPrompt } from '@/components/library/UploadPermissionPrompt';
import { libraryService, LibraryImage } from '@/services/api/libraryService';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface Room {
  id: string;
  current_phase: number;
  phase_4_completed: boolean;
  selected_style: string | null;
  room_type: string | null;
  smart_default_id: string | null;
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

interface SmartDefault {
  furniture: string[];
  lighting: string;
  flooring: string;
  ceiling: string;
  colors: { name: string; hex: string }[];
}

const mockSmartDefaults: Record<string, SmartDefault> = {
  modern_indian: {
    furniture: ['L-shaped sofa with ethnic cushions', 'Carved wooden coffee table', 'Brass accent pieces', 'Jharokha-style mirror'],
    lighting: 'Chandelier with brass finish + recessed LEDs',
    flooring: 'Italian marble with border design',
    ceiling: 'False ceiling with cove lighting (8" drop)',
    colors: [{ name: 'Terracotta', hex: '#C45D3E' }, { name: 'Ivory', hex: '#E8D5B7' }, { name: 'Forest', hex: '#2D4A3E' }, { name: 'Gold', hex: '#DAA520' }],
  },
  contemporary: {
    furniture: ['Modular sectional sofa', 'Glass-top center table', 'Floating TV unit', 'Accent armchair'],
    lighting: 'Track lighting + pendant over dining',
    flooring: 'Engineered wood in oak finish',
    ceiling: 'Simple false ceiling with profile lights (6" drop)',
    colors: [{ name: 'Off-white', hex: '#F5F5F5' }, { name: 'Charcoal', hex: '#333333' }, { name: 'Terracotta', hex: '#E58550' }, { name: 'Sage', hex: '#9CAF88' }],
  },
  minimalist: {
    furniture: ['Low-profile platform sofa', 'Minimal coffee table', 'Built-in storage', 'Single statement piece'],
    lighting: 'Hidden LED strips + minimal downlights',
    flooring: 'Polished concrete or light wood',
    ceiling: 'Flush ceiling with recessed fixtures (no drop)',
    colors: [{ name: 'Pure White', hex: '#FFFFFF' }, { name: 'Light Gray', hex: '#F0F0F0' }, { name: 'Black', hex: '#1A1A1A' }, { name: 'Natural', hex: '#E8DCC4' }],
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
  
  // Customize mode states (for upload path)
  const [selectedStyle, setSelectedStyle] = useState<string>(room.selected_style || '');
  const [falseCeilingDrop, setFalseCeilingDrop] = useState([8]);
  const [selectedVastu, setSelectedVastu] = useState<string[]>([]);
  const [customRequirements, setCustomRequirements] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [isGeneratingMoodboard, setIsGeneratingMoodboard] = useState(false);
  const [moodboardImages, setMoodboardImages] = useState<string[]>([]);

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

  // Fetch smart defaults based on room type and style
  const { data: smartDefaults } = useQuery({
    queryKey: ['smart-defaults', room.room_type, selectedStyle],
    queryFn: async () => {
      if (!selectedStyle) return null;
      return mockSmartDefaults[selectedStyle] || mockSmartDefaults.contemporary;
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
    if (!selectedStyle) {
      toast({
        title: 'Select a Style',
        description: 'Please select a design style before continuing.',
        variant: 'destructive',
      });
      return;
    }

    setIsApplying(true);
    try {
      const { error } = await supabase
        .from('rooms')
        .update({
          selected_style: selectedStyle,
          phase_4_completed: true,
          current_phase: Math.max(room.current_phase, 5),
        })
        .eq('id', room.id);

      if (error) throw error;

      toast({
        title: 'Style Applied',
        description: 'Design customizations saved. Moving to Phase 5.',
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
  // RENDER: CHOICE SCREEN (DEFAULT)
  // ============================================================================
  if (mode === 'choose') {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Phase 4: Style Reference</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {roomType.replace('_', ' ')} • {userCity}
          </p>
        </div>

        <h4 className="text-xl font-bold text-center">Choose your style reference</h4>

        <div className="grid grid-cols-1 gap-4">
          {/* Library Button */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0"
            onClick={() => setMode('library')}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-3xl">📚</div>
                <Badge className="bg-yellow-500 text-yellow-950 font-bold text-xs">
                  ⭐ RECOMMENDED
                </Badge>
              </div>
              
              <div>
                <h3 className="text-lg font-bold">BROWSE LIBRARY →</h3>
                <p className="text-primary-foreground/80 text-sm">Pre-tested proven references</p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm pt-1">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
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

          {/* Upload Button */}
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:bg-muted/50 border-2 border-dashed"
            onClick={() => setMode('upload')}
          >
            <CardContent className="p-4 space-y-3">
              <div className="text-3xl">🆕</div>
              
              <div>
                <h3 className="text-lg font-bold">UPLOAD OWN</h3>
                <p className="text-muted-foreground text-sm">Pinterest or your own image</p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-yellow-500">⚠️</span>
                  <span className="truncate">Unverified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">~4 min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tip Box */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-medium text-foreground">Library references are pre-tested and proven to work.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Using library saves ~15 minutes per room and increases success rate by 9%!
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

      {/* Smart Defaults Preview */}
      {selectedStyle && smartDefaults && (
        <div className="space-y-3 p-4 rounded-lg border bg-muted/30">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h4 className="font-medium text-sm">Smart Defaults for {selectedStyleData?.name}</h4>
          </div>
          
          {/* Color Palette */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Color Palette</p>
            <div className="flex gap-2">
              {smartDefaults.colors.map((color, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="h-8 w-8 rounded-lg border border-border/50 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[10px] text-muted-foreground">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Furniture */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Furniture</p>
            <ul className="text-xs space-y-0.5">
              {smartDefaults.furniture.map((item, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Lighting & Flooring */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Lighting</p>
              <p className="text-xs">{smartDefaults.lighting}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Flooring</p>
              <p className="text-xs">{smartDefaults.flooring}</p>
            </div>
          </div>

          {/* Ceiling */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Ceiling</p>
            <p className="text-xs">{smartDefaults.ceiling}</p>
          </div>
        </div>
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
                  value={falseCeilingDrop}
                  onValueChange={setFalseCeilingDrop}
                  min={6}
                  max={10}
                  step={0.5}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-16 text-right">{falseCeilingDrop[0]}" drop</span>
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
                        setSelectedVastu(prev =>
                          checked
                            ? [...prev, pref.id]
                            : prev.filter(id => id !== pref.id)
                        );
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
        <Button
          className="w-full"
          onClick={handleApplyAndContinue}
          disabled={!selectedStyle || isApplying || room.phase_4_completed}
        >
          {room.phase_4_completed ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Customization Complete
            </>
          ) : isApplying ? (
            'Applying...'
          ) : (
            'Apply & Continue to Phase 5'
          )}
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => toast({ title: 'Copy Settings', description: 'Select a room to copy settings from.' })}
          >
            <Copy className="mr-1 h-3 w-3" />
            Copy from Room
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => toast({ title: 'Template Saved', description: 'Current settings saved as a reusable template.' })}
          >
            <Save className="mr-1 h-3 w-3" />
            Save Template
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PhaseCustomize;
