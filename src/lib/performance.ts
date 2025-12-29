import { supabase } from '@/integrations/supabase/client';

// Cache for frequently accessed data
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (!cached) return null;
  
  const age = Date.now() - cached.timestamp;
  if (age > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }
  
  return cached.data as T;
}

export function setCache(key: string, data: unknown): void {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

export function clearCache(pattern?: string): void {
  if (!pattern) {
    cache.clear();
    return;
  }
  
  // Clear keys matching pattern
  Array.from(cache.keys())
    .filter(key => key.includes(pattern))
    .forEach(key => cache.delete(key));
}

// Get cache statistics
export function getCacheStats(): { size: number; keys: string[] } {
  return {
    size: cache.size,
    keys: Array.from(cache.keys())
  };
}

// Optimized project fetching with selective fields
export async function fetchProjectOptimized(projectId: string) {
  const cacheKey = `project_${projectId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;
  
  const { data, error } = await supabase
    .from('projects')
    .select(`
      id,
      name,
      status,
      city,
      budget_tier,
      current_phase,
      created_at,
      updated_at,
      total_rooms,
      estimated_budget
    `)
    .eq('id', projectId)
    .single();
  
  if (error) throw error;
  
  setCache(cacheKey, data);
  return data;
}

// Optimized room fetching with only needed fields
export async function fetchRoomOptimized(roomId: string) {
  const cacheKey = `room_${roomId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;
  
  const { data, error } = await supabase
    .from('rooms')
    .select(`
      id,
      room_type,
      room_name,
      room_number,
      selected_style,
      current_phase,
      phase_1_completed,
      phase_2_completed,
      phase_3_completed,
      phase_4_completed,
      phase_5_completed,
      smart_default_id,
      quality_score,
      project_id
    `)
    .eq('id', roomId)
    .single();
  
  if (error) throw error;
  
  setCache(cacheKey, data);
  return data;
}

// Fetch rooms for a project with caching
export async function fetchProjectRooms(projectId: string) {
  const cacheKey = `project_rooms_${projectId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;
  
  const { data, error } = await supabase
    .from('rooms')
    .select(`
      id,
      room_type,
      room_name,
      room_number,
      selected_style,
      current_phase,
      quality_score
    `)
    .eq('project_id', projectId)
    .order('room_number', { ascending: true });
  
  if (error) throw error;
  
  setCache(cacheKey, data);
  return data || [];
}

// Batch fetch renders for multiple rooms
export async function fetchRendersBatch(roomIds: string[]) {
  if (roomIds.length === 0) return [];
  
  const cacheKey = `renders_batch_${roomIds.sort().join('_')}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;
  
  const { data, error } = await supabase
    .from('renders')
    .select('id, room_id, image_url, version_number, quality_score, approval_status, created_at')
    .in('room_id', roomIds)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  setCache(cacheKey, data);
  return data || [];
}

// Prefetch data for better UX
export async function prefetchProjectData(projectId: string): Promise<void> {
  try {
    // Fetch project first
    await fetchProjectOptimized(projectId);
    
    // Prefetch rooms data
    const rooms = await fetchProjectRooms(projectId) as Array<{ id: string }>;
    
    // Prefetch renders in background if we have rooms
    if (rooms && rooms.length > 0) {
      const roomIds = rooms.map((r) => r.id);
      fetchRendersBatch(roomIds).catch(console.error);
    }
  } catch (error) {
    console.error('Prefetch failed:', error);
  }
}

// Invalidate cache for a specific entity
export function invalidateProjectCache(projectId: string): void {
  clearCache(`project_${projectId}`);
  clearCache(`project_rooms_${projectId}`);
}

export function invalidateRoomCache(roomId: string): void {
  clearCache(`room_${roomId}`);
  // Also clear any renders batch that might contain this room
  Array.from(cache.keys())
    .filter(key => key.startsWith('renders_batch_') && key.includes(roomId))
    .forEach(key => cache.delete(key));
}

// Debounce function utility
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function utility
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
