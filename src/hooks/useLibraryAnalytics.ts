import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Types
export interface LibraryStats {
  totalImages: number;
  featuredCount: number;
  standardCount: number;
  learningCount: number;
  unverifiedCount: number;
  archivedCount: number;
  avgApprovalRate: number;
  totalSelections: number;
  totalApprovals: number;
  totalRejections: number;
  userUploadCount: number;
  houspireGeneratedCount: number;
}

export interface TopPerformer {
  id: string;
  image_url: string;
  thumbnail_url: string | null;
  room_type: string;
  design_style: string;
  tier: string;
  approval_rate: number;
  times_selected: number;
  times_led_to_approval: number;
  source_type: string;
  city: string | null;
}

export interface PoorPerformer {
  id: string;
  image_url: string;
  room_type: string;
  design_style: string;
  approval_rate: number;
  times_selected: number;
  times_led_to_rejection: number;
  source_type: string;
}

export interface CoverageGap {
  room_type: string;
  design_style: string;
  count: number;
  priority: 'high' | 'medium' | 'low';
}

export interface GrowthDataPoint {
  date: string;
  total: number;
  user_uploads: number;
  houspire_generated: number;
}

// Fetch library statistics
export function useLibraryStats() {
  return useQuery({
    queryKey: ['library-stats'],
    queryFn: async (): Promise<LibraryStats> => {
      // Get all images with counts
      const { data: allImages, error: allError } = await supabase
        .from('style_library')
        .select('tier, status, source_type, approval_rate, times_selected, times_led_to_approval, times_led_to_rejection');

      if (allError) throw allError;

      const images = allImages || [];
      const activeImages = images.filter(img => img.status === 'active');

      const stats: LibraryStats = {
        totalImages: activeImages.length,
        featuredCount: activeImages.filter(img => img.tier === 'featured').length,
        standardCount: activeImages.filter(img => img.tier === 'standard').length,
        learningCount: activeImages.filter(img => img.tier === 'learning').length,
        unverifiedCount: activeImages.filter(img => img.tier === 'unverified').length,
        archivedCount: images.filter(img => img.status === 'archived').length,
        avgApprovalRate: 0,
        totalSelections: 0,
        totalApprovals: 0,
        totalRejections: 0,
        userUploadCount: activeImages.filter(img => img.source_type === 'user_upload').length,
        houspireGeneratedCount: activeImages.filter(img => img.source_type === 'houspire_generated').length,
      };

      // Calculate aggregates
      let ratedCount = 0;
      activeImages.forEach(img => {
        stats.totalSelections += img.times_selected || 0;
        stats.totalApprovals += img.times_led_to_approval || 0;
        stats.totalRejections += img.times_led_to_rejection || 0;
        if (img.approval_rate !== null) {
          stats.avgApprovalRate += img.approval_rate;
          ratedCount++;
        }
      });

      if (ratedCount > 0) {
        stats.avgApprovalRate = stats.avgApprovalRate / ratedCount;
      }

      return stats;
    },
    staleTime: 30000, // 30 seconds
  });
}

// Fetch top performers
export function useTopPerformers(limit = 10) {
  return useQuery({
    queryKey: ['library-top-performers', limit],
    queryFn: async (): Promise<TopPerformer[]> => {
      const { data, error } = await supabase
        .from('style_library')
        .select('id, image_url, thumbnail_url, room_type, design_style, tier, approval_rate, times_selected, times_led_to_approval, source_type, city')
        .eq('status', 'active')
        .gte('times_selected', 5)
        .gte('approval_rate', 0.7)
        .order('approval_rate', { ascending: false })
        .order('times_selected', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return (data || []) as TopPerformer[];
    },
    staleTime: 60000, // 1 minute
  });
}

// Fetch poor performers (archive candidates)
export function usePoorPerformers(limit = 10) {
  return useQuery({
    queryKey: ['library-poor-performers', limit],
    queryFn: async (): Promise<PoorPerformer[]> => {
      const { data, error } = await supabase
        .from('style_library')
        .select('id, image_url, room_type, design_style, approval_rate, times_selected, times_led_to_rejection, source_type')
        .eq('status', 'active')
        .gte('times_selected', 10)
        .lt('approval_rate', 0.6)
        .order('approval_rate', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return (data || []) as PoorPerformer[];
    },
    staleTime: 60000,
  });
}

// Analyze coverage gaps
export function useCoverageGaps() {
  return useQuery({
    queryKey: ['library-coverage-gaps'],
    queryFn: async (): Promise<CoverageGap[]> => {
      // Define all room types and design styles
      const roomTypes = [
        'living_room', 'master_bedroom', 'bedroom', 'kitchen', 'dining_room',
        'balcony', 'study_room', 'kids_room', 'guest_room', 'pooja_room',
        'home_office', 'gym', 'entertainment_room', 'utility_room'
      ];
      
      const designStyles = [
        'modern', 'contemporary', 'minimalist', 'traditional', 'scandinavian',
        'industrial', 'bohemian', 'rustic', 'art_deco', 'mid_century_modern'
      ];

      // Get current counts
      const { data: images, error } = await supabase
        .from('style_library')
        .select('room_type, design_style')
        .eq('status', 'active');

      if (error) throw error;

      // Count per combination
      const counts: Record<string, number> = {};
      (images || []).forEach(img => {
        const key = `${img.room_type}|${img.design_style}`;
        counts[key] = (counts[key] || 0) + 1;
      });

      // Find gaps
      const gaps: CoverageGap[] = [];
      roomTypes.forEach(roomType => {
        designStyles.forEach(designStyle => {
          const key = `${roomType}|${designStyle}`;
          const count = counts[key] || 0;
          
          if (count < 20) {
            let priority: 'high' | 'medium' | 'low' = 'low';
            if (count <= 5) priority = 'high';
            else if (count <= 10) priority = 'medium';

            gaps.push({
              room_type: roomType,
              design_style: designStyle,
              count,
              priority
            });
          }
        });
      });

      // Sort by priority (high first) then by count
      gaps.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return a.count - b.count;
      });

      return gaps.slice(0, 50); // Top 50 gaps
    },
    staleTime: 300000, // 5 minutes
  });
}

// Fetch growth data
export function useGrowthData(days = 30) {
  return useQuery({
    queryKey: ['library-growth', days],
    queryFn: async (): Promise<GrowthDataPoint[]> => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const { data, error } = await supabase
        .from('style_library')
        .select('created_at, source_type')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Group by date
      const dateMap: Record<string, { total: number; user_uploads: number; houspire_generated: number }> = {};
      
      (data || []).forEach(img => {
        const date = new Date(img.created_at!).toISOString().split('T')[0];
        if (!dateMap[date]) {
          dateMap[date] = { total: 0, user_uploads: 0, houspire_generated: 0 };
        }
        dateMap[date].total++;
        if (img.source_type === 'user_upload') {
          dateMap[date].user_uploads++;
        } else {
          dateMap[date].houspire_generated++;
        }
      });

      // Convert to array
      return Object.entries(dateMap).map(([date, counts]) => ({
        date,
        ...counts
      }));
    },
    staleTime: 60000,
  });
}

// Admin actions
export function useArchivePoorPerformers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc('auto_archive_poor_performers');
      if (error) throw error;
      return data as number;
    },
    onSuccess: (archivedCount) => {
      toast({
        title: 'Archive Complete',
        description: `Archived ${archivedCount} poor performing images.`,
      });
      queryClient.invalidateQueries({ queryKey: ['library-stats'] });
      queryClient.invalidateQueries({ queryKey: ['library-poor-performers'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Archive Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useForceRerank() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Update ranking scores for all active images
      const { data: images, error: fetchError } = await supabase
        .from('style_library')
        .select('id')
        .eq('status', 'active');

      if (fetchError) throw fetchError;

      // Update last_ranked_at for all images
      const { error: updateError } = await supabase
        .from('style_library')
        .update({ last_ranked_at: new Date().toISOString() })
        .eq('status', 'active');

      if (updateError) throw updateError;

      return images?.length || 0;
    },
    onSuccess: (count) => {
      toast({
        title: 'Re-rank Complete',
        description: `Updated ranking for ${count} images.`,
      });
      queryClient.invalidateQueries({ queryKey: ['library'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Re-rank Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useExportLibraryCsv() {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('style_library')
        .select('id, image_url, room_type, design_style, tier, source_type, approval_rate, times_selected, times_led_to_approval, times_led_to_rejection, city, created_at, status')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Convert to CSV
      const headers = ['ID', 'Image URL', 'Room Type', 'Design Style', 'Tier', 'Source', 'Approval Rate', 'Selections', 'Approvals', 'Rejections', 'City', 'Created', 'Status'];
      const rows = (data || []).map(img => [
        img.id,
        img.image_url,
        img.room_type,
        img.design_style,
        img.tier,
        img.source_type,
        img.approval_rate?.toFixed(2) || '',
        img.times_selected,
        img.times_led_to_approval,
        img.times_led_to_rejection,
        img.city || '',
        img.created_at,
        img.status
      ]);

      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

      // Download
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `library-export-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      return data?.length || 0;
    },
    onSuccess: (count) => {
      toast({
        title: 'Export Complete',
        description: `Exported ${count} library images to CSV.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Export Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
