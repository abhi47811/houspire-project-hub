import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Users, Clock, TrendingUp } from 'lucide-react';

const stats = [
  {
    name: 'Total Projects',
    value: '12',
    change: '+2 this month',
    icon: FolderOpen,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    name: 'Active Projects',
    value: '8',
    change: '67% of total',
    icon: Clock,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    name: 'Team Members',
    value: '24',
    change: '+3 this week',
    icon: Users,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    name: 'Completion Rate',
    value: '94%',
    change: '+5% from last month',
    icon: TrendingUp,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
];

export default function Dashboard() {
  const { profile, user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {profile?.full_name || user?.email?.split('@')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Your most recently updated projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No projects yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get started by creating your first project
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
