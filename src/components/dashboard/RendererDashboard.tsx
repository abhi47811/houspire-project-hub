import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { FolderOpen, ListTodo, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

export function RendererDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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
    return <RendererDashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {statsCards.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.filter(t => !t.completed).map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Projects</CardTitle>
              <CardDescription>Projects assigned to you</CardDescription>
            </div>
            <Link 
              to="/projects" 
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {myProjects.length > 0 ? (
              <div className="grid gap-3">
                {myProjects.slice(0, 4).map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{project.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {project.total_rooms || 0} rooms • Phase {project.current_phase}
                      </p>
                    </div>
                    <Badge className={statusColors[project.status] || statusColors.draft}>
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
      </div>
    </div>
  );
}

function RendererDashboardSkeleton() {
  return (
    <div className="space-y-6">
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
