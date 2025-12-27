import { useState, useEffect } from 'react';
import { Palette, Copy, Save, Sparkles, Check, ChevronDown, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

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
  const [selectedStyle, setSelectedStyle] = useState<string>(room.selected_style || '');
  const [falseCeilingDrop, setFalseCeilingDrop] = useState([8]);
  const [selectedVastu, setSelectedVastu] = useState<string[]>([]);
  const [customRequirements, setCustomRequirements] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [isGeneratingMoodboard, setIsGeneratingMoodboard] = useState(false);
  const [moodboardImages, setMoodboardImages] = useState<string[]>([]);

  // Fetch smart defaults based on room type and style
  const { data: smartDefaults } = useQuery({
    queryKey: ['smart-defaults', room.room_type, selectedStyle],
    queryFn: async () => {
      if (!selectedStyle) return null;
      // In a real app, this would fetch from supabase smart_defaults table
      return mockSmartDefaults[selectedStyle] || mockSmartDefaults.contemporary;
    },
    enabled: !!selectedStyle,
  });

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
    // Mock moodboard generation
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

  const handleCopyFromRoom = () => {
    toast({
      title: 'Copy Settings',
      description: 'Select a room to copy settings from.',
    });
  };

  const handleSaveAsTemplate = () => {
    toast({
      title: 'Template Saved',
      description: 'Current settings saved as a reusable template.',
    });
  };

  const selectedStyleData = designStyles.find(s => s.id === selectedStyle);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Phase 4: Customize</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Select design style and customize parameters
        </p>
      </div>

      {/* Design Style Selection */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Design Style</h4>
        <RadioGroup value={selectedStyle} onValueChange={setSelectedStyle}>
          <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
            {designStyles.map((style) => (
              <label
                key={style.id}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                  selectedStyle === style.id 
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/20' 
                    : 'bg-card'
                }`}
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
          <Check className="mr-2 h-4 w-4" />
          {room.phase_4_completed ? 'Already Applied' : 'Apply & Continue'}
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyFromRoom}>
            <Copy className="mr-2 h-3 w-3" />
            Copy from Room
          </Button>
          <Button variant="outline" size="sm" onClick={handleSaveAsTemplate}>
            <Save className="mr-2 h-3 w-3" />
            Save Template
          </Button>
        </div>
      </div>
    </div>
  );
}
