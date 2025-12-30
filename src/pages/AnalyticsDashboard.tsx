import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  Users,
  FolderKanban,
  Image,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  PieChart,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatIndianCurrency } from '@/services/budgetCalculatorService';

interface AnalyticsData {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalRooms: number;
  totalRenders: number;
  approvedRenders: number;
  totalRevenue: number;
  avgProjectValue: number;
  usersByRole: { [key: string]: number };
  projectsByStatus: { [key: string]: number };
  rendersByQuality: { [key: string]: number };
  topPerformingStyles: Array<{ style: string; count: number }>;
  recentActivity: Array<{
    type: string;
    message: string;
    timestamp: string;
  }>;
  preservationStats: {
    totalWithPreservation: number;
    successRate: number;
    avgDoorsPreserved: number;
    avgWindowsPreserved: number;
  };
}

export default function AnalyticsDashboard() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics-dashboard'],
    queryFn: fetchAnalytics,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading || !analytics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Clock className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time insights and performance metrics
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <TrendingUp className="w-4 h-4" />
          Live Data
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Projects"
          value={analytics.totalProjects}
          change="+12%"
          icon={<FolderKanban className="w-5 h-5" />}
          color="blue"
        />
        <MetricCard
          title="Active Projects"
          value={analytics.activeProjects}
          subtitle={`${analytics.completedProjects} completed`}
          icon={<Clock className="w-5 h-5" />}
          color="orange"
        />
        <MetricCard
          title="Total Renders"
          value={analytics.totalRenders}
          subtitle={`${analytics.approvedRenders} approved`}
          icon={<Image className="w-5 h-5" />}
          color="green"
        />
        <MetricCard
          title="Total Revenue"
          value={formatIndianCurrency(analytics.totalRevenue)}
          subtitle={`Avg: ${formatIndianCurrency(analytics.avgProjectValue)}`}
          icon={<DollarSign className="w-5 h-5" />}
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects by Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Projects by Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(analytics.projectsByStatus).map(([status, count]) => (
              <div key={status} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize">{status.replace('_', ' ')}</span>
                  <span className="font-medium">{count}</span>
                </div>
                <Progress
                  value={(count / analytics.totalProjects) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Users by Role */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Users by Role
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(analytics.usersByRole).map(([role, count]) => (
              <div key={role} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="capitalize">{role.replace('_', ' ')}</span>
                </div>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Architectural Preservation Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Architectural Preservation Performance
          </CardTitle>
          <CardDescription>
            How well we're preserving doors and windows in renders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-3xl font-bold text-green-600">
                {(analytics.preservationStats.successRate * 100).toFixed(1)}%
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total with Preservation</p>
              <p className="text-3xl font-bold">
                {analytics.preservationStats.totalWithPreservation}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Avg Doors Preserved</p>
              <p className="text-3xl font-bold">
                {analytics.preservationStats.avgDoorsPreserved.toFixed(1)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Avg Windows Preserved</p>
              <p className="text-3xl font-bold">
                {analytics.preservationStats.avgWindowsPreserved.toFixed(1)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Styles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Top Performing Styles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topPerformingStyles.map((item, index) => (
              <div key={item.style} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{item.style}</span>
                    <span className="text-sm text-muted-foreground">{item.count} renders</span>
                  </div>
                  <Progress
                    value={(item.count / analytics.totalRenders) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                <div className="flex-shrink-0">
                  {activity.type === 'success' && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                  {activity.type === 'warning' && (
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  )}
                  {activity.type === 'info' && <Clock className="w-5 h-5 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Metric Card Component
function MetricCard({
  title,
  value,
  subtitle,
  change,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'orange' | 'purple';
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
            {change && (
              <Badge variant="secondary" className="mt-2">
                {change}
              </Badge>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// Fetch Analytics Data
async function fetchAnalytics(): Promise<AnalyticsData> {
  // Fetch projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*, rooms(*)');

  // Fetch renders
  const { data: renders } = await supabase
    .from('renders')
    .select('*');

  // Fetch users
  const { data: users } = await supabase
    .from('profiles')
    .select('role');

  const totalProjects = projects?.length || 0;
  const activeProjects = projects?.filter((p) => p.status === 'in_progress').length || 0;
  const completedProjects = projects?.filter((p) => p.status === 'completed').length || 0;
  const totalRenders = renders?.length || 0;
  const approvedRenders = renders?.filter((r) => r.approved).length || 0;

  // Calculate preservation stats
  const rendersWithPreservation = renders?.filter(
    (r) => r.doors_preserved !== null || r.windows_preserved !== null
  ) || [];
  const preservationStats = {
    totalWithPreservation: rendersWithPreservation.length,
    successRate: rendersWithPreservation.length > 0
      ? rendersWithPreservation.filter((r) => r.doors_preserved && r.windows_preserved).length /
        rendersWithPreservation.length
      : 0,
    avgDoorsPreserved: rendersWithPreservation.length > 0
      ? rendersWithPreservation.reduce((sum, r) => sum + (r.doors_preserved || 0), 0) /
        rendersWithPreservation.length
      : 0,
    avgWindowsPreserved: rendersWithPreservation.length > 0
      ? rendersWithPreservation.reduce((sum, r) => sum + (r.windows_preserved || 0), 0) /
        rendersWithPreservation.length
      : 0,
  };

  // Calculate revenue (dummy data - would come from actual budget table)
  const totalRevenue = projects?.reduce((sum, p) => sum + (p.estimated_budget || 0), 0) || 0;
  const avgProjectValue = totalProjects > 0 ? totalRevenue / totalProjects : 0;

  // Group by role
  const usersByRole = users?.reduce((acc: any, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {}) || {};

  // Group by status
  const projectsByStatus = projects?.reduce((acc: any, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {}) || {};

  // Top styles
  const styleCount: { [key: string]: number } = {};
  projects?.forEach((p) => {
    p.rooms?.forEach((r: any) => {
      if (r.selected_style) {
        styleCount[r.selected_style] = (styleCount[r.selected_style] || 0) + 1;
      }
    });
  });

  const topPerformingStyles = Object.entries(styleCount)
    .map(([style, count]) => ({ style, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Recent activity (dummy data)
  const recentActivity = [
    {
      type: 'success',
      message: 'New project "Modern Mumbai Apartment" created',
      timestamp: '2 hours ago',
    },
    {
      type: 'success',
      message: 'Render approved for Living Room in Project XYZ',
      timestamp: '4 hours ago',
    },
    {
      type: 'warning',
      message: 'Budget exceeded in Project ABC',
      timestamp: '6 hours ago',
    },
    {
      type: 'info',
      message: 'New user registered as Renderer',
      timestamp: '8 hours ago',
    },
  ];

  return {
    totalProjects,
    activeProjects,
    completedProjects,
    totalRooms: projects?.reduce((sum, p) => sum + (p.rooms?.length || 0), 0) || 0,
    totalRenders,
    approvedRenders,
    totalRevenue,
    avgProjectValue,
    usersByRole,
    projectsByStatus,
    rendersByQuality: {},
    topPerformingStyles,
    recentActivity,
    preservationStats,
  };
}
