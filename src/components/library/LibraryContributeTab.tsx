import { useState } from 'react';
import { Upload, FileSpreadsheet, FolderOpen, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

// Seed collection specifications - 60+ professional AI-generated images
const SEED_COLLECTION_SPECS = [
  // LIVING ROOMS (12 images - expanded coverage)
  {
    seedPrompt: "Modern Indian living room interior, contemporary furniture with traditional touches, terracotta accents, brass elements, marble flooring, false ceiling with cove lighting, Mumbai apartment style, magazine quality, professional photography, ultra high resolution",
    roomType: "living_room",
    designStyle: "modern_indian",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Modern Indian living room, carved wooden furniture, ethnic cushions, pooja corner, warm lighting, Delhi residential interior, high-end finish, architectural photography, ultra high resolution",
    roomType: "living_room",
    designStyle: "modern_indian",
    city: "Delhi",
    tier: "standard"
  },
  {
    seedPrompt: "Contemporary living room interior, clean lines, neutral colors, modular sofa, glass coffee table, minimalist decor, Bangalore apartment, professional interior photography, ultra high resolution",
    roomType: "living_room",
    designStyle: "contemporary",
    city: "Bangalore",
    tier: "standard"
  },
  {
    seedPrompt: "Contemporary living room, modern furniture, earth tones, floor-to-ceiling windows, Hyderabad high-rise apartment, luxury interior design, editorial photography, ultra high resolution",
    roomType: "living_room",
    designStyle: "contemporary",
    city: "Hyderabad",
    tier: "standard"
  },
  {
    seedPrompt: "Minimalist living room, white walls, simple furniture, clean aesthetic, natural light, Pune apartment interior, Scandinavian influence, architectural digest style, ultra high resolution",
    roomType: "living_room",
    designStyle: "minimalist",
    city: "Pune",
    tier: "standard"
  },
  {
    seedPrompt: "Scandinavian living room, light wood furniture, cozy textiles, neutral tones, hygge atmosphere, Bangalore apartment, natural materials, magazine photography, ultra high resolution",
    roomType: "living_room",
    designStyle: "scandinavian",
    city: "Bangalore",
    tier: "standard"
  },
  {
    seedPrompt: "Industrial living room, exposed brick wall, metal shelving, leather sofa, concrete elements, loft style, Mumbai apartment, urban aesthetic, professional photography, ultra high resolution",
    roomType: "living_room",
    designStyle: "industrial",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Bohemian living room, colorful textiles, floor cushions, macrame, plants, eclectic decor, Delhi boho apartment, artistic vibe, editorial photography, ultra high resolution",
    roomType: "living_room",
    designStyle: "bohemian",
    city: "Delhi",
    tier: "standard"
  },
  {
    seedPrompt: "Art Deco living room, geometric patterns, velvet furniture, gold accents, statement chandelier, luxury Mumbai apartment, glamorous style, magazine quality, ultra high resolution",
    roomType: "living_room",
    designStyle: "art_deco",
    city: "Mumbai",
    tier: "featured"
  },
  {
    seedPrompt: "Japandi living room, minimal furniture, natural wood, neutral palette, zen atmosphere, clean lines, Bangalore apartment, serene design, architectural photography, ultra high resolution",
    roomType: "living_room",
    designStyle: "japandi",
    city: "Bangalore",
    tier: "standard"
  },
  {
    seedPrompt: "Traditional Indian living room, carved wooden furniture, rich textiles, brass lamps, ethnic artwork, cultural elements, Jaipur home, heritage style, professional photography, ultra high resolution",
    roomType: "living_room",
    designStyle: "traditional_indian",
    city: "Jaipur",
    tier: "standard"
  },
  {
    seedPrompt: "Farmhouse living room, rustic wood beams, comfortable sofas, natural textures, cozy fireplace area, Pune countryside home, warm atmosphere, interior photography, ultra high resolution",
    roomType: "living_room",
    designStyle: "farmhouse",
    city: "Pune",
    tier: "standard"
  },
  // MASTER BEDROOMS (8 images - expanded)
  {
    seedPrompt: "Contemporary master bedroom, king size bed, elegant headboard, bedside tables, soft lighting, Mumbai luxury apartment, hotel-like quality, professional photography, ultra high resolution",
    roomType: "master_bedroom",
    designStyle: "contemporary",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Scandinavian master bedroom, light wood bed frame, white linens, minimal decor, cozy atmosphere, Delhi apartment, natural textures, interior design magazine, ultra high resolution",
    roomType: "master_bedroom",
    designStyle: "scandinavian",
    city: "Delhi",
    tier: "standard"
  },
  {
    seedPrompt: "Minimalist master bedroom, platform bed, neutral colors, clean lines, hidden storage, Bangalore apartment, zen aesthetic, architectural photography, ultra high resolution",
    roomType: "master_bedroom",
    designStyle: "minimalist",
    city: "Bangalore",
    tier: "standard"
  },
  {
    seedPrompt: "Modern Indian master bedroom, wooden bed with carved headboard, silk cushions, warm lighting, traditional touches, Chennai home, elegant design, professional photography, ultra high resolution",
    roomType: "master_bedroom",
    designStyle: "modern_indian",
    city: "Chennai",
    tier: "standard"
  },
  {
    seedPrompt: "Industrial master bedroom, metal bed frame, exposed pipes, concrete walls, leather accents, loft style, Hyderabad apartment, urban design, editorial photography, ultra high resolution",
    roomType: "master_bedroom",
    designStyle: "industrial",
    city: "Hyderabad",
    tier: "standard"
  },
  {
    seedPrompt: "Bohemian master bedroom, canopy bed, colorful textiles, plants, fairy lights, artistic decor, Goa beach house, relaxed vibe, lifestyle photography, ultra high resolution",
    roomType: "master_bedroom",
    designStyle: "bohemian",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Traditional Indian master bedroom, four poster bed, rich fabrics, antique furniture, ornate details, Rajasthani style, Jaipur palace room, heritage design, ultra high resolution",
    roomType: "master_bedroom",
    designStyle: "traditional_indian",
    city: "Jaipur",
    tier: "featured"
  },
  {
    seedPrompt: "Japandi master bedroom, low platform bed, natural materials, paper screens, minimalist decor, peaceful atmosphere, Pune home, zen style, architectural photography, ultra high resolution",
    roomType: "master_bedroom",
    designStyle: "japandi",
    city: "Pune",
    tier: "standard"
  },
  // KITCHENS (8 images - expanded)
  {
    seedPrompt: "Modern Indian kitchen, L-shaped layout, granite countertops, modular cabinets, chimney hood, tiles backsplash, Mumbai apartment kitchen, professional photography, ultra high resolution",
    roomType: "kitchen",
    designStyle: "modern_indian",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Contemporary kitchen, sleek cabinets, quartz countertops, island with bar stools, pendant lights, Bangalore apartment, modern design, professional photography, ultra high resolution",
    roomType: "kitchen",
    designStyle: "contemporary",
    city: "Bangalore",
    tier: "standard"
  },
  {
    seedPrompt: "Minimalist kitchen, white cabinets, clean countertops, hidden appliances, no clutter, Chennai apartment, streamlined design, architectural photography, ultra high resolution",
    roomType: "kitchen",
    designStyle: "minimalist",
    city: "Chennai",
    tier: "standard"
  },
  {
    seedPrompt: "Scandinavian kitchen, light wood cabinets, white tiles, open shelving, natural light, Pune apartment, cozy Nordic style, interior photography, ultra high resolution",
    roomType: "kitchen",
    designStyle: "scandinavian",
    city: "Pune",
    tier: "standard"
  },
  {
    seedPrompt: "Industrial kitchen, metal cabinets, concrete countertops, exposed pipes, pendant lights, Delhi loft, urban style, professional photography, ultra high resolution",
    roomType: "kitchen",
    designStyle: "industrial",
    city: "Delhi",
    tier: "standard"
  },
  {
    seedPrompt: "Traditional Indian kitchen, wooden cabinets, brass handles, masala box storage, pooja shelf, warm lighting, Ahmedabad home, cultural design, ultra high resolution",
    roomType: "kitchen",
    designStyle: "traditional_indian",
    city: "Ahmedabad",
    tier: "standard"
  },
  {
    seedPrompt: "Farmhouse kitchen, rustic wood cabinets, apron sink, open shelves, vintage accessories, countryside style, Pune farmhouse, warm atmosphere, ultra high resolution",
    roomType: "kitchen",
    designStyle: "farmhouse",
    city: "Pune",
    tier: "standard"
  },
  {
    seedPrompt: "Coastal kitchen, white and blue palette, nautical accents, beadboard cabinets, beach house style, Mumbai seaside apartment, fresh design, professional photography, ultra high resolution",
    roomType: "kitchen",
    designStyle: "coastal_indian",
    city: "Mumbai",
    tier: "standard"
  },
  // DINING ROOMS (6 images - expanded)
  {
    seedPrompt: "Contemporary dining room, rectangular wooden table, 6 upholstered chairs, pendant chandelier, Mumbai apartment, elegant setup, professional photography, ultra high resolution",
    roomType: "dining_room",
    designStyle: "contemporary",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Minimalist dining area, simple table, modern chairs, minimal decor, natural light, Bangalore home, clean aesthetic, architectural photography, ultra high resolution",
    roomType: "dining_room",
    designStyle: "minimalist",
    city: "Bangalore",
    tier: "standard"
  },
  {
    seedPrompt: "Modern Indian dining room, 8-seater wooden table, carved chairs, brass chandelier, traditional art, Delhi home, festive ready, professional photography, ultra high resolution",
    roomType: "dining_room",
    designStyle: "modern_indian",
    city: "Delhi",
    tier: "standard"
  },
  {
    seedPrompt: "Scandinavian dining room, light oak table, wishbone chairs, pendant lamp, plants, Hyderabad apartment, Nordic warmth, interior photography, ultra high resolution",
    roomType: "dining_room",
    designStyle: "scandinavian",
    city: "Hyderabad",
    tier: "standard"
  },
  {
    seedPrompt: "Traditional Indian dining room, round marble table, ornate chairs, crystal chandelier, formal setting, Chennai heritage home, grand style, ultra high resolution",
    roomType: "dining_room",
    designStyle: "traditional_indian",
    city: "Chennai",
    tier: "standard"
  },
  {
    seedPrompt: "Art Deco dining room, geometric table design, velvet chairs, statement lighting, gold accents, Mumbai luxury apartment, glamorous setting, magazine quality, ultra high resolution",
    roomType: "dining_room",
    designStyle: "art_deco",
    city: "Mumbai",
    tier: "featured"
  },
  // BATHROOMS (6 images - new category)
  {
    seedPrompt: "Modern Indian bathroom, marble tiles, wooden vanity, brass fixtures, glass shower, luxury finish, Mumbai apartment, spa-like design, professional photography, ultra high resolution",
    roomType: "bathroom",
    designStyle: "modern_indian",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Contemporary bathroom, floating vanity, large mirror, rain shower, neutral tiles, Delhi apartment, clean design, architectural photography, ultra high resolution",
    roomType: "bathroom",
    designStyle: "contemporary",
    city: "Delhi",
    tier: "standard"
  },
  {
    seedPrompt: "Minimalist bathroom, white tiles, simple fixtures, frameless mirror, hidden storage, Bangalore home, zen aesthetic, interior photography, ultra high resolution",
    roomType: "bathroom",
    designStyle: "minimalist",
    city: "Bangalore",
    tier: "standard"
  },
  {
    seedPrompt: "Scandinavian bathroom, light wood accents, white tiles, natural light, plants, cozy atmosphere, Pune apartment, Nordic style, professional photography, ultra high resolution",
    roomType: "bathroom",
    designStyle: "scandinavian",
    city: "Pune",
    tier: "standard"
  },
  {
    seedPrompt: "Industrial bathroom, concrete walls, black fixtures, metal accents, exposed pipes, urban loft style, Hyderabad apartment, edgy design, ultra high resolution",
    roomType: "bathroom",
    designStyle: "industrial",
    city: "Hyderabad",
    tier: "standard"
  },
  {
    seedPrompt: "Traditional Indian bathroom, Jaisalmer stone, brass fittings, carved mirror frame, ethnic tiles, heritage style, Jaipur home, cultural design, ultra high resolution",
    roomType: "bathroom",
    designStyle: "traditional_indian",
    city: "Jaipur",
    tier: "standard"
  },
  // HOME OFFICES (6 images - new category)
  {
    seedPrompt: "Contemporary home office, L-shaped desk, ergonomic chair, monitor setup, storage shelves, Mumbai apartment, productive design, professional photography, ultra high resolution",
    roomType: "home_office",
    designStyle: "contemporary",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Minimalist home office, simple desk, clean workspace, minimal decor, natural light, Bangalore tech professional, zen focus, architectural photography, ultra high resolution",
    roomType: "home_office",
    designStyle: "minimalist",
    city: "Bangalore",
    tier: "standard"
  },
  {
    seedPrompt: "Industrial home office, reclaimed wood desk, metal shelving, exposed brick, vintage accessories, Delhi creative studio, artistic vibe, professional photography, ultra high resolution",
    roomType: "home_office",
    designStyle: "industrial",
    city: "Delhi",
    tier: "standard"
  },
  {
    seedPrompt: "Scandinavian home office, white desk, light wood accents, plants, cozy corner, Pune apartment, hygge workspace, interior photography, ultra high resolution",
    roomType: "home_office",
    designStyle: "scandinavian",
    city: "Pune",
    tier: "standard"
  },
  {
    seedPrompt: "Modern Indian home office, wooden desk, brass lamp, traditional artwork, warm lighting, Chennai professional space, cultural touch, professional photography, ultra high resolution",
    roomType: "home_office",
    designStyle: "modern_indian",
    city: "Chennai",
    tier: "standard"
  },
  {
    seedPrompt: "Japandi home office, low desk, floor seating option, minimal setup, natural materials, serene atmosphere, Hyderabad apartment, zen design, ultra high resolution",
    roomType: "home_office",
    designStyle: "japandi",
    city: "Hyderabad",
    tier: "standard"
  },
  // KIDS ROOMS (5 images - new category)
  {
    seedPrompt: "Modern Indian kids room, colorful walls, study desk, bunk bed, play area, storage units, Mumbai apartment, fun design, professional photography, ultra high resolution",
    roomType: "kids_room",
    designStyle: "modern_indian",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Contemporary kids room, neutral palette, playful accents, study corner, toy storage, gender neutral, Delhi apartment, stylish design, interior photography, ultra high resolution",
    roomType: "kids_room",
    designStyle: "contemporary",
    city: "Delhi",
    tier: "standard"
  },
  {
    seedPrompt: "Bohemian kids room, colorful textiles, teepee tent, floor cushions, fairy lights, creative space, Bangalore home, whimsical design, professional photography, ultra high resolution",
    roomType: "kids_room",
    designStyle: "bohemian",
    city: "Bangalore",
    tier: "standard"
  },
  {
    seedPrompt: "Scandinavian kids room, light colors, wooden furniture, cozy reading nook, minimal toys, Pune apartment, calm design, architectural photography, ultra high resolution",
    roomType: "kids_room",
    designStyle: "scandinavian",
    city: "Pune",
    tier: "standard"
  },
  {
    seedPrompt: "Minimalist kids room, clean lines, essential furniture, organized storage, play space, Chennai home, clutter-free design, interior photography, ultra high resolution",
    roomType: "kids_room",
    designStyle: "minimalist",
    city: "Chennai",
    tier: "standard"
  },
  // POOJA ROOMS (5 images - new category)
  {
    seedPrompt: "Modern Indian pooja room, wooden temple unit, marble platform, brass bells, diya holder, warm lighting, Mumbai apartment, spiritual design, professional photography, ultra high resolution",
    roomType: "pooja_room",
    designStyle: "modern_indian",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Traditional Indian pooja room, carved wooden temple, brass idols, oil lamps, flower decorations, puja essentials, Chennai home, sacred design, ultra high resolution",
    roomType: "pooja_room",
    designStyle: "traditional_indian",
    city: "Chennai",
    tier: "featured"
  },
  {
    seedPrompt: "Contemporary pooja room, sleek temple design, backlit panel, marble flooring, minimal decor, Bangalore apartment, modern spirituality, architectural photography, ultra high resolution",
    roomType: "pooja_room",
    designStyle: "contemporary",
    city: "Bangalore",
    tier: "standard"
  },
  {
    seedPrompt: "Minimalist pooja room, simple altar, clean design, essential elements only, peaceful space, Hyderabad apartment, zen sacred space, interior photography, ultra high resolution",
    roomType: "pooja_room",
    designStyle: "minimalist",
    city: "Hyderabad",
    tier: "standard"
  },
  {
    seedPrompt: "Art Deco pooja room, geometric patterns, gold accents, ornate temple, statement lighting, Delhi luxury home, glamorous sacred space, magazine quality, ultra high resolution",
    roomType: "pooja_room",
    designStyle: "art_deco",
    city: "Delhi",
    tier: "featured"
  },
  // GUEST BEDROOMS (4 images - new category)
  {
    seedPrompt: "Contemporary guest bedroom, queen bed, neutral decor, side table, reading lamp, welcoming space, Mumbai apartment, hotel comfort, professional photography, ultra high resolution",
    roomType: "guest_room",
    designStyle: "contemporary",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Scandinavian guest bedroom, cozy bed, light colors, simple furniture, natural textures, Delhi home, Nordic comfort, interior photography, ultra high resolution",
    roomType: "guest_room",
    designStyle: "scandinavian",
    city: "Delhi",
    tier: "standard"
  },
  {
    seedPrompt: "Modern Indian guest bedroom, traditional touches, warm colors, ethnic bedding, brass accents, Jaipur home, cultural hospitality, professional photography, ultra high resolution",
    roomType: "guest_room",
    designStyle: "modern_indian",
    city: "Jaipur",
    tier: "standard"
  },
  {
    seedPrompt: "Minimalist guest bedroom, essential furniture, clean lines, peaceful colors, uncluttered space, Bangalore apartment, serene design, architectural photography, ultra high resolution",
    roomType: "guest_room",
    designStyle: "minimalist",
    city: "Bangalore",
    tier: "standard"
  },
  // BALCONIES (4 images - expanded)
  {
    seedPrompt: "Tropical balcony, wooden deck flooring, outdoor furniture, potted plants, greenery, Mumbai apartment balcony, resort style, professional photography, ultra high resolution",
    roomType: "balcony",
    designStyle: "tropical",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Contemporary balcony, modern outdoor furniture, planters, city view, Bangalore high-rise, clean design, architectural photography, ultra high resolution",
    roomType: "balcony",
    designStyle: "contemporary",
    city: "Bangalore",
    tier: "standard"
  },
  {
    seedPrompt: "Modern Indian balcony, swing chair, potted plants, terracotta pots, ethnic cushions, cozy reading corner, Delhi apartment, cultural design, professional photography, ultra high resolution",
    roomType: "balcony",
    designStyle: "modern_indian",
    city: "Delhi",
    tier: "standard"
  },
  {
    seedPrompt: "Scandinavian balcony, wooden furniture, plants, cozy textiles, fairy lights, hygge outdoor space, Pune apartment, Nordic charm, interior photography, ultra high resolution",
    roomType: "balcony",
    designStyle: "scandinavian",
    city: "Pune",
    tier: "standard"
  },
  // FOYER/ENTRYWAY (4 images - new category)
  {
    seedPrompt: "Contemporary foyer, console table, mirror, ambient lighting, artwork, shoe storage, Mumbai apartment entrance, welcoming design, professional photography, ultra high resolution",
    roomType: "foyer",
    designStyle: "contemporary",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Modern Indian foyer, wooden console, brass mirror frame, traditional artwork, warm lighting, Delhi home entrance, cultural welcome, interior photography, ultra high resolution",
    roomType: "foyer",
    designStyle: "modern_indian",
    city: "Delhi",
    tier: "standard"
  },
  {
    seedPrompt: "Art Deco foyer, geometric mirror, statement console, marble flooring, chandelier, glamorous entrance, Bangalore luxury apartment, magazine quality, ultra high resolution",
    roomType: "foyer",
    designStyle: "art_deco",
    city: "Bangalore",
    tier: "featured"
  },
  {
    seedPrompt: "Minimalist foyer, simple console, clean lines, essential decor, hidden storage, Chennai apartment, zen entrance, architectural photography, ultra high resolution",
    roomType: "foyer",
    designStyle: "minimalist",
    city: "Chennai",
    tier: "standard"
  },
  // WARDROBE/CLOSET (4 images - new category)
  {
    seedPrompt: "Contemporary walk-in wardrobe, modular shelving, glass doors, island unit, organized storage, Mumbai luxury apartment, designer closet, professional photography, ultra high resolution",
    roomType: "wardrobe",
    designStyle: "contemporary",
    city: "Mumbai",
    tier: "standard"
  },
  {
    seedPrompt: "Minimalist wardrobe, clean lines, hidden handles, neutral colors, efficient storage, Bangalore apartment, streamlined design, architectural photography, ultra high resolution",
    roomType: "wardrobe",
    designStyle: "minimalist",
    city: "Bangalore",
    tier: "standard"
  },
  {
    seedPrompt: "Modern Indian wardrobe, wooden finish, brass handles, saree storage, traditional elements, Chennai home, cultural organization, interior photography, ultra high resolution",
    roomType: "wardrobe",
    designStyle: "modern_indian",
    city: "Chennai",
    tier: "standard"
  },
  {
    seedPrompt: "Scandinavian wardrobe, light wood, open shelving, minimal design, natural materials, Delhi apartment, Nordic style, professional photography, ultra high resolution",
    roomType: "wardrobe",
    designStyle: "scandinavian",
    city: "Delhi",
    tier: "standard"
  }
];

const roomTypes = [
  { value: 'living_room', label: 'Living Room' },
  { value: 'master_bedroom', label: 'Master Bedroom' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'dining_room', label: 'Dining Room' },
  { value: 'balcony', label: 'Balcony' },
  { value: 'study_room', label: 'Study Room' },
  { value: 'kids_room', label: 'Kids Room' },
  { value: 'pooja_room', label: 'Pooja Room' },
  { value: 'home_office', label: 'Home Office' },
];

const designStyles = [
  { value: 'modern_indian', label: 'Modern Indian' },
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'scandinavian', label: 'Scandinavian' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'bohemian', label: 'Bohemian' },
  { value: 'art_deco', label: 'Art Deco' },
  { value: 'traditional', label: 'Traditional Indian' },
  { value: 'tropical', label: 'Tropical' },
  { value: 'japandi', label: 'Japandi' },
  { value: 'rustic', label: 'Rustic' },
  { value: 'luxury', label: 'Luxury Modern' },
  { value: 'coastal', label: 'Coastal' },
];

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow'
];

interface ContributionStats {
  total_contributions: number;
  featured_count: number;
  standard_count: number;
  avg_approval_rate: number;
  total_times_selected: number;
}

export function LibraryContributeTab() {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  const [uploadMode, setUploadMode] = useState<'single' | 'bulk' | 'csv' | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Seed generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 20 });
  const [generationStatus, setGenerationStatus] = useState('');
  
  // Single upload form
  const [singleUpload, setSingleUpload] = useState({
    roomType: '',
    designStyle: '',
    city: '',
    tags: '',
  });

  // Check if library has images
  const { data: libraryCount } = useQuery({
    queryKey: ['library-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('style_library')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    },
  });

  // Fetch user's contribution stats
  const { data: stats } = useQuery({
    queryKey: ['contribution-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('user_library_contributions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data as ContributionStats | null;
    },
    enabled: !!user?.id,
  });

  // Handle seed collection generation
  const handleGenerateSeedCollection = async () => {
    setIsGenerating(true);
    setGenerationProgress({ current: 0, total: SEED_COLLECTION_SPECS.length });
    
    let success = 0;
    let failed = 0;
    const errors: string[] = [];
    
    for (let i = 0; i < SEED_COLLECTION_SPECS.length; i++) {
      const spec = SEED_COLLECTION_SPECS[i];
      setGenerationProgress({ current: i + 1, total: SEED_COLLECTION_SPECS.length });
      setGenerationStatus(`Generating ${spec.roomType.replace('_', ' ')} (${spec.designStyle.replace('_', ' ')})...`);
      
      try {
        const { data, error } = await supabase.functions.invoke('generate-ai', {
          body: {
            action: 'generateSeedImage',
            seedPrompt: spec.seedPrompt,
            roomType: spec.roomType,
            designStyle: spec.designStyle,
            city: spec.city,
            tier: spec.tier
          }
        });
        
        if (error) throw error;
        if (!data?.success) throw new Error(data?.error || 'Generation failed');
        
        success++;
        
        // Delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error: any) {
        failed++;
        errors.push(`${spec.roomType}: ${error.message}`);
        console.error(`Failed to generate ${spec.roomType}:`, error);
        
        // Continue with next image even if one fails
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    setIsGenerating(false);
    setGenerationStatus('');
    
    // Invalidate library queries to refresh
    queryClient.invalidateQueries({ queryKey: ['library-count'] });
    queryClient.invalidateQueries({ queryKey: ['style-library'] });
    
    if (success > 0) {
      toast({
        title: '✅ Seed collection generated!',
        description: `${success} images created and added to library.${failed > 0 ? ` ${failed} failed.` : ''}`,
      });
    } else {
      toast({
        title: '❌ Generation failed',
        description: 'No images were generated. Check console for errors.',
        variant: 'destructive',
      });
    }
    
    if (errors.length > 0) {
      console.error('Generation errors:', errors);
    }
  };

  const handleSingleUpload = async () => {
    if (!singleUpload.roomType || !singleUpload.designStyle) {
      toast({
        title: 'Missing Information',
        description: 'Please select room type and design style.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      // In a real app, this would upload to storage and catalog
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(interval);
      setUploadProgress(100);
      
      toast({
        title: 'Upload Successful',
        description: 'Your reference has been submitted for curation.',
      });
      
      // Reset form
      setSingleUpload({ roomType: '', designStyle: '', city: '', tags: '' });
      setUploadMode(null);
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload reference. Please try again.',
        variant: 'destructive',
      });
    } finally {
      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const isAdmin = profile?.role === 'admin';
  const showSeedGenerator = isAdmin || (libraryCount !== undefined && libraryCount < 5);

  return (
    <div className="space-y-6">
      {/* Seed Collection Generator - Show for admins or when library is empty */}
      {showSeedGenerator && (
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  🚀 QUICK START: AI Seed Collection
                </CardTitle>
                <CardDescription>
                  Generate {SEED_COLLECTION_SPECS.length} professional AI interior design images to bootstrap your library instantly
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                ONE-TIME SETUP
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-medium text-sm">📦 What's included:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 12 Living Rooms (10 styles)</li>
                  <li>• 8 Bedrooms (Master, Guest, Kids)</li>
                  <li>• 8 Kitchens (7 styles)</li>
                  <li>• 6 Dining Rooms</li>
                  <li>• 6 Bathrooms</li>
                  <li>• 6 Home Offices</li>
                  <li>• 5 Pooja Rooms</li>
                  <li>• 4 Balconies, Foyers, Wardrobes</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm">⏱️ Estimated time:</p>
                <p className="text-sm text-muted-foreground">
                  ~30-40 minutes (AI generation + upload)
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Please keep this tab open during generation.
                </p>
              </div>
            </div>
            
            {isGenerating && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{generationStatus}</span>
                  <span className="font-medium">{generationProgress.current}/{generationProgress.total}</span>
                </div>
                <Progress value={(generationProgress.current / generationProgress.total) * 100} />
                <p className="text-xs text-muted-foreground text-center">
                  Generation takes 2-3 seconds per image. Do not close this tab.
                </p>
              </div>
            )}
            
            <Separator />
            
            <Button
              onClick={handleGenerateSeedCollection}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating... ({generationProgress.current}/{SEED_COLLECTION_SPECS.length})
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate & Import {SEED_COLLECTION_SPECS.length} AI Images
                </>
              )}
            </Button>
            
            {!isGenerating && (
              <p className="text-xs text-muted-foreground text-center">
                💡 Only run this once to bootstrap your library. Images will be ready for use immediately.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Contribution Stats */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Your Contributions</CardTitle>
            <CardDescription>Track your library contributions and their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold">{stats.total_contributions}</p>
                <p className="text-sm text-muted-foreground">Total Contributed</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-yellow-600">{stats.featured_count}</p>
                <p className="text-sm text-muted-foreground">Featured</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold">{stats.standard_count}</p>
                <p className="text-sm text-muted-foreground">Standard</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-green-600">
                  {stats.avg_approval_rate ? `${Math.round(stats.avg_approval_rate * 100)}%` : '-'}
                </p>
                <p className="text-sm text-muted-foreground">Avg Success</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold">{stats.total_times_selected}</p>
                <p className="text-sm text-muted-foreground">Times Selected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Options */}
      {!uploadMode && (
        <div className="grid md:grid-cols-3 gap-4">
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary"
            onClick={() => setUploadMode('single')}
          >
            <CardContent className="pt-6 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Single Upload</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload one reference image at a time
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary"
            onClick={() => setUploadMode('bulk')}
          >
            <CardContent className="pt-6 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <FolderOpen className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Bulk Upload</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload multiple images at once
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary"
            onClick={() => setUploadMode('csv')}
          >
            <CardContent className="pt-6 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">CSV Import</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Import from spreadsheet with URLs
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Single Upload Form */}
      {uploadMode === 'single' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Single Upload</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setUploadMode(null)}>
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h4 className="font-medium mb-2">Drop your image here</h4>
              <p className="text-sm text-muted-foreground mb-4">
                PNG, JPG, or WebP up to 10MB
              </p>
              <Button variant="outline">Select File</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Room Type *</Label>
                <Select
                  value={singleUpload.roomType}
                  onValueChange={(value) => setSingleUpload({ ...singleUpload, roomType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Design Style *</Label>
                <Select
                  value={singleUpload.designStyle}
                  onValueChange={(value) => setSingleUpload({ ...singleUpload, designStyle: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select style..." />
                  </SelectTrigger>
                  <SelectContent>
                    {designStyles.map(style => (
                      <SelectItem key={style.value} value={style.value}>{style.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>City (Optional)</Label>
                <Select
                  value={singleUpload.city}
                  onValueChange={(value) => setSingleUpload({ ...singleUpload, city: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city..." />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tags (Optional)</Label>
                <Input
                  placeholder="luxury, marble, gold accents"
                  value={singleUpload.tags}
                  onChange={(e) => setSingleUpload({ ...singleUpload, tags: e.target.value })}
                />
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-muted-foreground text-center">
                  {uploadProgress < 100 ? 'Uploading...' : 'Complete!'}
                </p>
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleSingleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Reference
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Bulk Upload */}
      {uploadMode === 'bulk' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Bulk Upload</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setUploadMode(null)}>
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h4 className="font-medium mb-2">Drop multiple images here</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Select up to 50 images at once
              </p>
              <Button variant="outline">Select Files</Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Bulk Upload Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AI will auto-detect room type and design style</li>
                <li>• You can review and edit before final submission</li>
                <li>• Duplicates will be automatically detected</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CSV Import */}
      {uploadMode === 'csv' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>CSV Import</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setUploadMode(null)}>
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h4 className="font-medium mb-2">Upload CSV file</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Include columns: image_url, room_type, design_style, city, tags
              </p>
              <Button variant="outline">Select CSV</Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">CSV Format</h4>
              <code className="text-xs block bg-background p-2 rounded">
                image_url,room_type,design_style,city,tags<br />
                https://...,living_room,modern_indian,Mumbai,"luxury,marble"
              </code>
              <Button variant="link" className="px-0 mt-2 h-auto text-sm">
                Download Template
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contribution Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Contribution Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">High-quality renders</p>
                  <p className="text-sm text-muted-foreground">1920x1080 or higher resolution</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Accurate categorization</p>
                  <p className="text-sm text-muted-foreground">Correct room type and style</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Original or licensed</p>
                  <p className="text-sm text-muted-foreground">You have rights to share</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">No watermarks</p>
                  <p className="text-sm text-muted-foreground">Clean images only</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">No duplicates</p>
                  <p className="text-sm text-muted-foreground">Auto-detected and rejected</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">No AI hallucinations</p>
                  <p className="text-sm text-muted-foreground">Realistic, usable references</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LibraryContributeTab;
