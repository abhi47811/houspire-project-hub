import { useEffect, useState, forwardRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { FolderOpen, ListTodo, CheckCircle, ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTrendAnalysis } from '@/hooks/useRecommendations';

interface Project {
  id: string;
  name: string;
  client_name: string | null;
  city: string | null;
  status: string;
  current_phase: number;
  total_rooms: number;
}

interface Stats {
  myActiveProjects: number;
  pendingTasks: number;
  completedThisWeek: number;
}

interface Task {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  completed: boolean;
}

const statusColors: Record<string, string> = {
  draft: 'bg-muted text-muted-foreground',
  in_progress: 'bg-primary/10 text-primary',
  review: 'bg-warning/10 text-warning',
  approved: 'bg-success/10 text-success',
  completed: 'bg-success/10 text-success',
  cancelled: 'bg-destructive/10 text-destructive',
};

export const RendererDashboard = forwardRef<HTMLDivElement>(
  function RendererDashboard(_props, ref) {
    const { user } = useAuth();
    const [stats, setStats] = useState<Stats | null>(null);
    const [myProjects, setMyProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Get user's city from first project or default to Mumbai
    const userCity = myProjects[0]?.city || 'Mumbai';
    
    // AI Trend Analysis hook
    const { trendData, isLoading: trendsLoading } = useTrendAnalysis(userCity, 'all');

    // Mock tasks for now - would come from a tasks table
    const [tasks, setTasks] = useState<Task[]>([
      { id: '1', title: 'Complete living room render', project: 'Mumbai Residence', dueDate: 'Today', completed: false },
      { id: '2', title: 'Review bedroom lighting', project: 'Delhi Office', dueDate: 'Tomorrow', completed: false },
      { id: '3', title: 'Submit final renders', project: 'Bangalore Villa', dueDate: 'Dec 28', completed: false },
      { id: '4', title: 'Update kitchen design', project: 'Chennai Apartment', dueDate: 'Dec 29', completed: false },
    ]);

    useEffect(() => {
      if (user) {
        fetchDashboardData();
      }
    }, [user]);

    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        // Fetch projects where user is creator or assigned
        const { data: projects, error } = await supabase
          .from('projects')
          .select('*')
          .or(`created_by.eq.${user.id},assigned_to.eq.${user.id}`)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());

        const calculatedStats: Stats = {
          myActiveProjects: projects?.filter(p => 
            ['draft', 'in_progress', 'review', 'approved'].includes(p.status)
          ).length || 0,
          pendingTasks: tasks.filter(t => !t.completed).length,
          completedThisWeek: projects?.filter(p => 
            p.status === 'completed' && new Date(p.created_at) >= startOfWeek
          ).length || 0,
        };

        setStats(calculatedStats);
        setMyProjects(projects || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    const toggleTask = (taskId: string) => {
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    };

    const statsCards = [
      {
        name: 'My Active Projects',
        value: stats?.myActiveProjects || 0,
        icon: FolderOpen,
        color: 'text-primary',
        bgColor: 'bg-primary/10',
      },
      {
        name: 'Pending Tasks',
        value: stats?.pendingTasks || 0,
        icon: ListTodo,
        color: 'text-warning',
        bgColor: 'bg-warning/10',
      },
      {
        name: 'Completed This Week',
        value: stats?.completedThisWeek || 0,
        icon: CheckCircle,
        color: 'text-success',
        bgColor: 'bg-success/10',
      },
    ];

    if (loading) {
      return <RendererDashboardSkeleton ref={ref} />;
    }

    return (
      <div ref={ref} className="space-y-6 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {statsCards.map((stat, index) => (
            <Card key={stat.name} className="card-interactive animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <div className={`rounded-lg p-2 transition-transform duration-200 group-hover:scale-110 ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* Pending Tasks */}
          <Card className="card-interactive">
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.filter(t => !t.completed).map((task, index) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 rounded-lg border p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 space-y-1">
                      <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{task.project}</span>
                        <span>•</span>
                        <span className={task.dueDate === 'Today' ? 'text-destructive font-medium' : ''}>
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {tasks.filter(t => !t.completed).length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CheckCircle className="h-10 w-10 text-success/50" />
                    <p className="mt-2 text-sm text-muted-foreground">All tasks completed!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* My Projects */}
          <Card className="card-interactive">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Projects</CardTitle>
                <CardDescription>Projects assigned to you</CardDescription>
              </div>
              <Link 
                to="/projects" 
                className="text-sm text-primary hover:underline flex items-center gap-1 hover-lift transition-transform"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent>
              {myProjects.length > 0 ? (
                <div className="grid gap-3">
                  {myProjects.slice(0, 4).map((project, index) => (
                    <Link
                      key={project.id}
                      to={`/projects/${project.id}`}
                      className="flex items-center justify-between rounded-lg border p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm hover:-translate-y-0.5 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{project.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {project.total_rooms || 0} rooms • Phase {project.current_phase}
                        </p>
                      </div>
                      <Badge className={cn(statusColors[project.status] || statusColors.draft, 'flex items-center gap-1.5')}>
                        {project.status === 'in_progress' && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
                        {project.status.replace('_', ' ')}
                      </Badge>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FolderOpen className="h-10 w-10 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">No projects assigned yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trending Styles */}
          <Card className="card-interactive border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trending in {userCity}
              </CardTitle>
              <CardDescription>Popular design styles this month</CardDescription>
            </CardHeader>
            <CardContent>
              {trendsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : trendData && trendData.popular_styles && trendData.popular_styles.length > 0 ? (
                <div className="space-y-3">
                  {trendData.popular_styles.slice(0, 3).map((style, index) => {
                    const TrendIcon = style.trend === 'rising' ? TrendingUp : style.trend === 'declining' ? TrendingDown : Minus;
                    const trendColor = style.trend === 'rising' ? 'text-success' : style.trend === 'declining' ? 'text-destructive' : 'text-muted-foreground';
                    
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-3 transition-all duration-200 hover:bg-muted/50 animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">{style.style_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {style.adoption_rate.toFixed(1)}% adoption rate
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendIcon className={cn("h-4 w-4", trendColor)} />
                          <Badge variant="secondary" className="text-xs">
                            {style.trend}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <TrendingUp className="h-10 w-10 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">No trend data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
);

const RendererDashboardSkeleton = forwardRef<HTMLDivElement>(
  function RendererDashboardSkeleton(_props, ref) {
    return (
      <div ref={ref} className="space-y-6">
        {/* Stats Skeleton */}
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-12" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Tasks Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-44" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
                  <Skeleton className="h-4 w-4 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Projects Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-36" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
);
