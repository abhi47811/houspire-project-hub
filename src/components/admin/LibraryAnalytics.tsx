import { useState } from 'react';
import { 
  Image, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Users, 
  Sparkles,
  Archive,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import {
  useLibraryStats,
  useTopPerformers,
  usePoorPerformers,
  useCoverageGaps,
  useGrowthData,
  useArchivePoorPerformers,
  useForceRerank,
  useExportLibraryCsv
} from '@/hooks/useLibraryAnalytics';

const COLORS = {
  featured: 'hsl(var(--chart-1))',
  standard: 'hsl(var(--chart-2))',
  learning: 'hsl(var(--chart-3))',
  unverified: 'hsl(var(--chart-4))',
  userUpload: 'hsl(var(--chart-5))',
  houspireGenerated: 'hsl(var(--primary))',
};

export function LibraryAnalytics() {
  const [timeRange, setTimeRange] = useState<'7' | '30' | '90' | 'all'>('30');
  
  const { data: stats, isLoading: statsLoading } = useLibraryStats();
  const { data: topPerformers, isLoading: topLoading } = useTopPerformers(10);
  const { data: poorPerformers, isLoading: poorLoading } = usePoorPerformers(10);
  const { data: coverageGaps, isLoading: gapsLoading } = useCoverageGaps();
  const { data: growthData, isLoading: growthLoading } = useGrowthData(parseInt(timeRange) || 365);

  const archiveMutation = useArchivePoorPerformers();
  const rerankMutation = useForceRerank();
  const exportMutation = useExportLibraryCsv();

  const formatRoomType = (type: string) => type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const formatStyle = (style: string) => style.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Tier distribution for pie chart
  const tierData = stats ? [
    { name: 'Featured', value: stats.featuredCount, color: COLORS.featured },
    { name: 'Standard', value: stats.standardCount, color: COLORS.standard },
    { name: 'Learning', value: stats.learningCount, color: COLORS.learning },
    { name: 'Unverified', value: stats.unverifiedCount, color: COLORS.unverified },
  ] : [];

  // Source distribution for pie chart
  const sourceData = stats ? [
    { name: 'User Uploads', value: stats.userUploadCount, color: COLORS.userUpload },
    { name: 'Houspire Generated', value: stats.houspireGeneratedCount, color: COLORS.houspireGenerated },
  ] : [];

  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">🔴 High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">🟡 Medium</Badge>;
      case 'low':
        return <Badge variant="outline">🟢 Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Library Analytics</h2>
          <p className="text-sm text-muted-foreground">Dual-Source Style Library Performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={(v) => setTimeRange(v as typeof timeRange)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
              <SelectItem value="90">90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => rerankMutation.mutate()}
            disabled={rerankMutation.isPending}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${rerankMutation.isPending ? 'animate-spin' : ''}`} />
            Re-rank
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => exportMutation.mutate()}
            disabled={exportMutation.isPending}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Total Images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? '...' : stats?.totalImages.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.archivedCount || 0} archived
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Featured Tier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? '...' : stats?.featuredCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.totalImages ? ((stats.featuredCount / stats.totalImages) * 100).toFixed(1) : 0}% of library
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Avg Approval Rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? '...' : `${((stats?.avgApprovalRate || 0) * 100).toFixed(1)}%`}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {stats?.totalSelections.toLocaleString() || 0} selections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Uploads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? '...' : stats?.userUploadCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.totalImages ? ((stats.userUploadCount / stats.totalImages) * 100).toFixed(1) : 0}% of library
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Library Growth</CardTitle>
            <CardDescription>New images added over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              {growthLoading ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">Loading...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(v) => new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      className="text-xs"
                    />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      labelFormatter={(v) => new Date(v).toLocaleDateString()}
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="user_uploads" name="User Uploads" stroke={COLORS.userUpload} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="houspire_generated" name="Houspire Generated" stroke={COLORS.houspireGenerated} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Distribution Charts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribution</CardTitle>
            <CardDescription>Tier and source breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Tier Distribution */}
              <div>
                <p className="text-xs text-center text-muted-foreground mb-2">By Tier</p>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tierData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={2}
                      >
                        {tierData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {tierData.map((t) => (
                    <div key={t.name} className="flex items-center gap-1 text-xs">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                      {t.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Source Distribution */}
              <div>
                <p className="text-xs text-center text-muted-foreground mb-2">By Source</p>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={2}
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {sourceData.map((s) => (
                    <div key={s.name} className="flex items-center gap-1 text-xs">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performers & Coverage Tabs */}
      <Tabs defaultValue="top" className="space-y-4">
        <TabsList>
          <TabsTrigger value="top" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Top Performers
          </TabsTrigger>
          <TabsTrigger value="poor" className="gap-2">
            <TrendingDown className="h-4 w-4" />
            Archive Candidates
          </TabsTrigger>
          <TabsTrigger value="gaps" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Coverage Gaps
          </TabsTrigger>
        </TabsList>

        <TabsContent value="top">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Top 10 Performers
              </CardTitle>
              <CardDescription>Highest approval rate with 5+ selections</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Room / Style</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Approval</TableHead>
                    <TableHead>Selections</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : topPerformers?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No top performers yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    topPerformers?.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div className="w-12 h-12 rounded bg-muted overflow-hidden">
                            <img 
                              src={p.thumbnail_url || p.image_url} 
                              alt="" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{formatRoomType(p.room_type)}</div>
                          <div className="text-xs text-muted-foreground">{formatStyle(p.design_style)}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={p.tier === 'featured' ? 'default' : 'outline'}>
                            {p.tier === 'featured' && <Star className="h-3 w-3 mr-1" />}
                            {p.tier}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 font-medium">
                              {(p.approval_rate * 100).toFixed(0)}%
                            </span>
                            <Progress value={p.approval_rate * 100} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>{p.times_selected}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {p.source_type === 'user_upload' ? 'User' : 'Houspire'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="poor">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Archive Candidates
                </CardTitle>
                <CardDescription>Less than 60% approval with 10+ selections</CardDescription>
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => archiveMutation.mutate()}
                disabled={archiveMutation.isPending || !poorPerformers?.length}
              >
                <Archive className="h-4 w-4 mr-2" />
                Archive All Poor Performers
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Room / Style</TableHead>
                    <TableHead>Approval</TableHead>
                    <TableHead>Rejections</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {poorLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : poorPerformers?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No poor performers - great!
                      </TableCell>
                    </TableRow>
                  ) : (
                    poorPerformers?.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div className="w-12 h-12 rounded bg-muted overflow-hidden">
                            <img 
                              src={p.image_url} 
                              alt="" 
                              className="w-full h-full object-cover opacity-60"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{formatRoomType(p.room_type)}</div>
                          <div className="text-xs text-muted-foreground">{formatStyle(p.design_style)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-destructive font-medium">
                              {(p.approval_rate * 100).toFixed(0)}%
                            </span>
                            <Progress value={p.approval_rate * 100} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell className="text-destructive">{p.times_led_to_rejection}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {p.source_type === 'user_upload' ? 'User' : 'Houspire'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Coverage Gaps
              </CardTitle>
              <CardDescription>Room type × Design style combinations with fewer than 20 images</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Priority</TableHead>
                    <TableHead>Room Type</TableHead>
                    <TableHead>Design Style</TableHead>
                    <TableHead>Current Count</TableHead>
                    <TableHead>Needed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gapsLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : coverageGaps?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No coverage gaps - excellent coverage!
                      </TableCell>
                    </TableRow>
                  ) : (
                    coverageGaps?.slice(0, 20).map((gap, i) => (
                      <TableRow key={`${gap.room_type}-${gap.design_style}`}>
                        <TableCell>{getPriorityBadge(gap.priority)}</TableCell>
                        <TableCell className="font-medium">{formatRoomType(gap.room_type)}</TableCell>
                        <TableCell>{formatStyle(gap.design_style)}</TableCell>
                        <TableCell>
                          <span className={gap.count === 0 ? 'text-destructive' : 'text-amber-600'}>
                            {gap.count}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {20 - gap.count} more
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {coverageGaps && coverageGaps.length > 20 && (
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Showing top 20 of {coverageGaps.length} gaps
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
