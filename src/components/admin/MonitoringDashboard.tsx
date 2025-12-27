import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBusinessMetrics, useCostAlerts } from '@/hooks/useBusinessMetrics';
import { getRecentErrors, getGroupedErrors, getErrorCounts } from '@/lib/error-tracking';
import { getEventCounts, getUniqueUserCount, getUniqueSessionCount } from '@/hooks/useAnalytics';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  FunnelChart,
  Funnel,
  LabelList,
} from 'recharts';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Users,
  Zap,
  RefreshCcw,
  Server,
  Database,
  Cloud,
} from 'lucide-react';
import { format } from 'date-fns';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export function MonitoringDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: metrics, isLoading, refetch } = useBusinessMetrics(30);
  const costAlerts = useCostAlerts(10); // $10 daily threshold

  // Health check
  const { data: healthStatus, refetch: refetchHealth } = useQuery({
    queryKey: ['health-check'],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/health-check`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
          }
        );
        return response.json();
      } catch {
        return { status: 'unknown', checks: {} };
      }
    },
    refetchInterval: 60000, // Check every minute
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refetch(), refetchHealth()]);
    setIsRefreshing(false);
  };

  // Get local tracking data
  const errorCounts = getErrorCounts();
  const eventCounts = getEventCounts();
  const groupedErrors = getGroupedErrors().slice(0, 5);
  const uniqueUsers = getUniqueUserCount();
  const uniqueSessions = getUniqueSessionCount();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Production Monitoring</h2>
          <p className="text-muted-foreground">Real-time system health and business metrics</p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline">
          <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Cost Alert Banner */}
      {costAlerts.isOverBudget && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="flex items-center gap-4 py-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <div>
              <p className="font-semibold text-destructive">Daily Cost Threshold Exceeded</p>
              <p className="text-sm text-muted-foreground">
                Today's API cost: ${costAlerts.currentCost.toFixed(2)} / ${costAlerts.threshold} ({costAlerts.percentUsed.toFixed(0)}%)
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {healthStatus?.status === 'healthy' ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold text-green-600">Healthy</span>
                </>
              ) : healthStatus?.status === 'degraded' ? (
                <>
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-yellow-600">Degraded</span>
                </>
              ) : (
                <>
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">Checking...</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Response: {healthStatus?.metrics?.responseTime || 0}ms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API Cost Today</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics?.apiCostToday.toFixed(2) || '0.00'}</div>
            <p className="text-xs text-muted-foreground">
              Total: ${metrics?.totalApiCost.toFixed(2) || '0.00'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalActiveProjects || 0}</div>
            <p className="text-xs text-muted-foreground">
              +{metrics?.projectsCreatedToday || 0} today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{errorCounts.error || 0}</div>
            <p className="text-xs text-muted-foreground">
              {errorCounts.warning || 0} warnings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Service Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(healthStatus?.checks || {}).map(([service, check]: [string, any]) => (
              <div key={service} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Database className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium capitalize">{service}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      check?.status === 'pass' ? 'default' :
                      check?.status === 'warn' ? 'secondary' : 'destructive'
                    }>
                      {check?.status || 'unknown'}
                    </Badge>
                    {check?.latency && (
                      <span className="text-xs text-muted-foreground">{check.latency}ms</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="costs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="costs">Cost Tracking</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="errors">Error Tracking</TabsTrigger>
          <TabsTrigger value="analytics">User Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="costs" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Daily API Costs */}
            <Card>
              <CardHeader>
                <CardTitle>Daily API Costs (30 days)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={metrics?.dailyApiCosts || []}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(v) => format(new Date(v), 'MMM d')}
                      className="text-xs"
                    />
                    <YAxis tickFormatter={(v) => `$${v.toFixed(2)}`} className="text-xs" />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toFixed(4)}`, 'Cost']}
                      labelFormatter={(label) => format(new Date(label), 'MMM d, yyyy')}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary) / 0.2)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cost by Service */}
            <Card>
              <CardHeader>
                <CardTitle>Cost by Service</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart 
                    data={Object.entries(metrics?.costByService || {}).map(([name, value]) => ({ 
                      name, 
                      value: Number(value.toFixed(4)) 
                    }))}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" tickFormatter={(v) => `$${v}`} className="text-xs" />
                    <YAxis dataKey="name" type="category" width={100} className="text-xs" />
                    <Tooltip formatter={(value: number) => [`$${value.toFixed(4)}`, 'Cost']} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                      {Object.entries(metrics?.costByService || {}).map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Cost Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Total (30 days)</p>
                  <p className="text-2xl font-bold">${metrics?.totalApiCost.toFixed(2) || '0.00'}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Avg per Project</p>
                  <p className="text-2xl font-bold">${metrics?.averageCostPerProject.toFixed(2) || '0.00'}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Daily Average</p>
                  <p className="text-2xl font-bold">${((metrics?.totalApiCost || 0) / 30).toFixed(2)}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="text-2xl font-bold">${metrics?.apiCostToday.toFixed(2) || '0.00'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Room Processing Funnel</CardTitle>
              <CardDescription>Conversion rates through each phase</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics?.conversionFunnel || []}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="phase" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'count' ? value : `${value}%`,
                      name === 'count' ? 'Rooms' : 'Conversion Rate'
                    ]}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                    {metrics?.conversionFunnel?.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {metrics?.conversionFunnel?.map((step, index) => (
              <Card key={step.phase}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">{step.phase}</p>
                    <p className="text-3xl font-bold">{step.count}</p>
                    <Badge variant={step.rate >= 80 ? 'default' : step.rate >= 50 ? 'secondary' : 'destructive'}>
                      {index === 0 ? `${step.rate}% of total` : `${step.rate}% conversion`}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">{errorCounts.error || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Warnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">{errorCounts.warning || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{errorCounts.info || 0}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Grouped Errors</CardTitle>
              <CardDescription>Similar errors grouped by fingerprint</CardDescription>
            </CardHeader>
            <CardContent>
              {groupedErrors.length > 0 ? (
                <div className="space-y-3">
                  {groupedErrors.map((group) => (
                    <div key={group.fingerprint} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{group.latest.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {group.latest.context.component || 'Unknown'} • {format(new Date(group.latest.timestamp), 'MMM d, HH:mm')}
                        </p>
                      </div>
                      <Badge variant="destructive">{group.count}x</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No errors recorded</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Active Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{uniqueSessions}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Unique Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{uniqueUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Page Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{eventCounts.page_view || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{Object.values(eventCounts).reduce((a, b) => a + b, 0)}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={Object.entries(eventCounts)
                    .filter(([name]) => name !== 'page_view')
                    .map(([name, count]) => ({ name: name.replace(/_/g, ' '), count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 10)
                  }
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="name" type="category" width={150} className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
