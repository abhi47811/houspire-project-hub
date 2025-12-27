import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { TrendingUp, Palette, MapPin, Users, Zap } from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];
const PHASE_NAMES = ['Upload', 'Analyze', 'Clean', 'Customize', 'Generate'];

export function AnalyticsView() {
  // API costs by phase
  const { data: apiCostsByPhase, isLoading: costsLoading } = useQuery({
    queryKey: ['analytics-api-costs-phase'],
    queryFn: async () => {
      const { data } = await supabase
        .from('api_logs')
        .select('endpoint, cost_usd')
        .gte('created_at', new Date(new Date().setDate(new Date().getDate() - 30)).toISOString());

      const phaseMap: Record<string, number> = {
        'Phase 2 (Analyze)': 0,
        'Phase 3 (Clean)': 0,
        'Phase 5 (Generate)': 0,
        'Other': 0
      };

      data?.forEach(log => {
        const cost = Number(log.cost_usd || 0);
        if (log.endpoint?.includes('vision') || log.endpoint?.includes('analyze')) {
          phaseMap['Phase 2 (Analyze)'] += cost;
        } else if (log.endpoint?.includes('clean') || log.endpoint?.includes('lama')) {
          phaseMap['Phase 3 (Clean)'] += cost;
        } else if (log.endpoint?.includes('generate') || log.endpoint?.includes('render')) {
          phaseMap['Phase 5 (Generate)'] += cost;
        } else {
          phaseMap['Other'] += cost;
        }
      });

      return Object.entries(phaseMap).map(([name, value]) => ({
        name,
        value: Number(value.toFixed(2))
      })).filter(d => d.value > 0);
    }
  });

  // Success rate by phase
  const { data: successRateByPhase, isLoading: successLoading } = useQuery({
    queryKey: ['analytics-success-rate'],
    queryFn: async () => {
      const { data: rooms } = await supabase.from('rooms').select('phase_1_completed, phase_2_completed, phase_3_completed, phase_4_completed, phase_5_completed');

      const totalRooms = rooms?.length || 0;
      if (totalRooms === 0) return [];

      return [
        { phase: 'Phase 1', rate: Math.round((rooms?.filter(r => r.phase_1_completed).length || 0) / totalRooms * 100) },
        { phase: 'Phase 2', rate: Math.round((rooms?.filter(r => r.phase_2_completed).length || 0) / totalRooms * 100) },
        { phase: 'Phase 3', rate: Math.round((rooms?.filter(r => r.phase_3_completed).length || 0) / totalRooms * 100) },
        { phase: 'Phase 4', rate: Math.round((rooms?.filter(r => r.phase_4_completed).length || 0) / totalRooms * 100) },
        { phase: 'Phase 5', rate: Math.round((rooms?.filter(r => r.phase_5_completed).length || 0) / totalRooms * 100) },
      ];
    }
  });

  // Most popular design styles
  const { data: popularStyles, isLoading: stylesLoading } = useQuery({
    queryKey: ['analytics-popular-styles'],
    queryFn: async () => {
      const { data: rooms } = await supabase
        .from('rooms')
        .select('selected_style')
        .not('selected_style', 'is', null);

      const styleCount: Record<string, number> = {};
      rooms?.forEach(room => {
        if (room.selected_style) {
          styleCount[room.selected_style] = (styleCount[room.selected_style] || 0) + 1;
        }
      });

      return Object.entries(styleCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);
    }
  });

  // Revenue by city
  const { data: revenueByCity, isLoading: revenueLoading } = useQuery({
    queryKey: ['analytics-revenue-city'],
    queryFn: async () => {
      const { data: projects } = await supabase
        .from('projects')
        .select('city, actual_cost, estimated_budget');

      const cityRevenue: Record<string, number> = {};
      projects?.forEach(project => {
        if (project.city) {
          const revenue = Number(project.actual_cost || project.estimated_budget || 0);
          cityRevenue[project.city] = (cityRevenue[project.city] || 0) + revenue;
        }
      });

      return Object.entries(cityRevenue)
        .map(([name, value]) => ({ name, value: Math.round(value / 100000) })) // In lakhs
        .sort((a, b) => b.value - a.value);
    }
  });

  // Team performance
  const { data: teamPerformance, isLoading: teamLoading } = useQuery({
    queryKey: ['analytics-team-performance'],
    queryFn: async () => {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('role', 'renderer');

      const performance = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { count: projectCount } = await supabase
            .from('projects')
            .select('id', { count: 'exact' })
            .eq('assigned_to', profile.id);

          const { count: completedCount } = await supabase
            .from('projects')
            .select('id', { count: 'exact' })
            .eq('assigned_to', profile.id)
            .eq('status', 'completed');

          return {
            name: profile.full_name || 'Unknown',
            assigned: projectCount || 0,
            completed: completedCount || 0,
            rate: projectCount ? Math.round((completedCount || 0) / projectCount * 100) : 0
          };
        })
      );

      return performance.sort((a, b) => b.completed - a.completed).slice(0, 10);
    }
  });

  // Quality scores by style
  const { data: qualityByStyle, isLoading: qualityLoading } = useQuery({
    queryKey: ['analytics-quality-style'],
    queryFn: async () => {
      const { data: rooms } = await supabase
        .from('rooms')
        .select('selected_style, final_quality_score')
        .not('final_quality_score', 'is', null)
        .not('selected_style', 'is', null);

      const styleScores: Record<string, { total: number; count: number }> = {};
      rooms?.forEach(room => {
        if (room.selected_style && room.final_quality_score) {
          if (!styleScores[room.selected_style]) {
            styleScores[room.selected_style] = { total: 0, count: 0 };
          }
          styleScores[room.selected_style].total += Number(room.final_quality_score);
          styleScores[room.selected_style].count += 1;
        }
      });

      return Object.entries(styleScores)
        .map(([style, data]) => ({
          style,
          score: Number((data.total / data.count).toFixed(1))
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
    }
  });

  const isLoading = costsLoading || successLoading || stylesLoading || revenueLoading || teamLoading || qualityLoading;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Skeleton key={i} className="h-80" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Cost by Phase */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              API Costs by Phase
            </CardTitle>
            <CardDescription>Cost distribution across phases (last 30 days)</CardDescription>
          </CardHeader>
          <CardContent>
            {apiCostsByPhase && apiCostsByPhase.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={apiCostsByPhase}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name.split(' ')[0]} ${name.split(' ')[1]} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {apiCostsByPhase.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Success Rate by Phase */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Success Rate by Phase
            </CardTitle>
            <CardDescription>Completion percentage for each phase</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={successRateByPhase || []}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="phase" className="text-xs" />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} className="text-xs" />
                <Tooltip formatter={(value) => [`${value}%`, 'Success Rate']} />
                <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                  {successRateByPhase?.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Popular Design Styles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Most Popular Design Styles
            </CardTitle>
            <CardDescription>Styles selected by clients</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={popularStyles || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-xs" />
                <YAxis dataKey="name" type="category" width={100} className="text-xs" />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by City */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Revenue by City
            </CardTitle>
            <CardDescription>Project value in lakhs (₹)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueByCity || []}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis tickFormatter={(v) => `₹${v}L`} className="text-xs" />
                <Tooltip formatter={(value) => [`₹${value}L`, 'Revenue']} />
                <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quality Scores by Style */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quality Scores by Style
            </CardTitle>
            <CardDescription>Average final quality score per style</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={qualityByStyle || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" domain={[0, 100]} className="text-xs" />
                <YAxis dataKey="style" type="category" width={100} className="text-xs" />
                <Tooltip formatter={(value) => [`${value}`, 'Score']} />
                <Bar dataKey="score" fill="#F59E0B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Performance Leaderboard
            </CardTitle>
            <CardDescription>Projects assigned vs completed</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={teamPerformance || []}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" angle={-45} textAnchor="end" height={60} />
                <YAxis className="text-xs" />
                <Tooltip />
                <Legend />
                <Bar dataKey="assigned" fill="#6366F1" name="Assigned" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#10B981" name="Completed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
