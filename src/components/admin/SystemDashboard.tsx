import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Building2, Users, FolderKanban, IndianRupee, Zap, Clock, TrendingUp, Award } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const PHASE_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
const API_COLORS = ['#6366F1', '#EC4899', '#14B8A6', '#F97316', '#84CC16'];

export function SystemDashboard() {
  // Fetch system stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [projectsRes, roomsRes, usersRes, apiLogsRes] = await Promise.all([
        supabase.from('projects').select('id, status, created_at', { count: 'exact' }),
        supabase.from('rooms').select('id, current_phase, final_quality_score', { count: 'exact' }),
        supabase.from('profiles').select('id, role', { count: 'exact' }),
        supabase.from('api_logs').select('service, cost_usd, status, created_at')
          .gte('created_at', new Date(new Date().setDate(1)).toISOString()) // This month
      ]);

      const projects = projectsRes.data || [];
      const rooms = roomsRes.data || [];
      const users = usersRes.data || [];
      const apiLogs = apiLogsRes.data || [];

      // Calculate API costs by service
      const costsByService: Record<string, number> = {};
      apiLogs.forEach(log => {
        costsByService[log.service] = (costsByService[log.service] || 0) + Number(log.cost_usd || 0);
      });

      // Calculate success rates by phase
      const phaseSuccessRates = [1, 2, 3, 4, 5].map(phase => {
        const phaseRooms = rooms.filter(r => r.current_phase >= phase);
        const successCount = phaseRooms.length;
        return {
          phase: `Phase ${phase}`,
          rate: rooms.length > 0 ? Math.round((successCount / rooms.length) * 100) : 0
        };
      });

      // Calculate completion times (mock - would need timestamp data)
      const completedProjects = projects.filter(p => p.status === 'completed');

      return {
        totalProjects: projects.length,
        totalRooms: rooms.length,
        totalUsers: users.length,
        completedProjects: completedProjects.length,
        totalApiCost: apiLogs.reduce((sum, log) => sum + Number(log.cost_usd || 0), 0),
        costsByService: Object.entries(costsByService).map(([name, value]) => ({ name, value: Number(value.toFixed(2)) })),
        phaseSuccessRates,
        usersByRole: users.reduce((acc, u) => {
          acc[u.role || 'renderer'] = (acc[u.role || 'renderer'] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      };
    }
  });

  // Fetch top renderers
  const { data: topRenderers, isLoading: renderersLoading } = useQuery({
    queryKey: ['top-renderers'],
    queryFn: async () => {
      const { data: renderers } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('role', 'renderer');

      if (!renderers) return [];

      // Get projects assigned to each renderer
      const rendererStats = await Promise.all(
        renderers.slice(0, 5).map(async (renderer) => {
          const { count } = await supabase
            .from('projects')
            .select('id', { count: 'exact' })
            .eq('assigned_to', renderer.id);

          const { data: completedRooms } = await supabase
            .from('rooms')
            .select('final_quality_score, project_id')
            .not('final_quality_score', 'is', null);

          // Filter rooms for projects assigned to this renderer
          const { data: assignedProjects } = await supabase
            .from('projects')
            .select('id')
            .eq('assigned_to', renderer.id);

          const projectIds = assignedProjects?.map(p => p.id) || [];
          const rendererRooms = completedRooms?.filter(r => projectIds.includes(r.project_id)) || [];
          const avgScore = rendererRooms.length > 0
            ? rendererRooms.reduce((sum, r) => sum + Number(r.final_quality_score), 0) / rendererRooms.length
            : 0;

          return {
            name: renderer.full_name || 'Unknown',
            projects: count || 0,
            avgScore: avgScore.toFixed(1)
          };
        })
      );

      return rendererStats.sort((a, b) => b.projects - a.projects);
    }
  });

  if (statsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalProjects || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.completedProjects || 0} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalRooms || 0}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.usersByRole?.admin || 0} admins, {stats?.usersByRole?.renderer || 0} renderers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API Costs (Month)</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{((stats?.totalApiCost || 0) * 83).toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">
              ${(stats?.totalApiCost || 0).toFixed(2)} USD
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Costs Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5" />
              API Costs Breakdown
            </CardTitle>
            <CardDescription>Costs by service this month</CardDescription>
          </CardHeader>
          <CardContent>
            {stats?.costsByService && stats.costsByService.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={stats.costsByService}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.costsByService.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={API_COLORS[index % API_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                No API usage data this month
              </div>
            )}
          </CardContent>
        </Card>

        {/* Phase Success Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Success Rate by Phase
            </CardTitle>
            <CardDescription>Completion rate for each phase</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats?.phaseSuccessRates || []}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="phase" className="text-xs" />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} className="text-xs" />
                <Tooltip formatter={(value) => [`${value}%`, 'Success Rate']} />
                <Bar dataKey="rate" fill="hsl(var(--primary))">
                  {stats?.phaseSuccessRates?.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PHASE_COLORS[index % PHASE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Renderers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Top Performing Renderers
          </CardTitle>
          <CardDescription>Ranked by projects completed</CardDescription>
        </CardHeader>
        <CardContent>
          {renderersLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12" />)}
            </div>
          ) : topRenderers && topRenderers.length > 0 ? (
            <div className="space-y-4">
              {topRenderers.map((renderer, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-700' : 'bg-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium">{renderer.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold">{renderer.projects}</div>
                      <div className="text-muted-foreground text-xs">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{renderer.avgScore}</div>
                      <div className="text-muted-foreground text-xs">Avg Score</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No renderers found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
