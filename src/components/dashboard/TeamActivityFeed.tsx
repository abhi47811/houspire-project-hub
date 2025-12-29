import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTeamActivity } from '@/hooks/useDashboardData';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Users, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TeamActivityFeed() {
  const { data: activities, isLoading } = useTeamActivity();
  const navigate = useNavigate();

  if (isLoading) return <TeamActivitySkeleton />;

  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle>Team Activity</CardTitle>
        <CardDescription>Recent activity from your team</CardDescription>
      </CardHeader>
      <CardContent>
        {(activities || []).length > 0 ? (
          <div className="space-y-4">
            {activities?.map((activity, index) => (
              <div 
                key={activity.id} 
                className="flex items-start gap-3 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Avatar className="h-8 w-8 ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary text-xs">
                    {activity.userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.userName}</span>{' '}
                    <span className="text-muted-foreground">{activity.activityType.replace('_', ' ')}</span>{' '}
                    <span className="font-medium">{activity.projectName}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(parseISO(activity.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Users className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">No activity yet</p>
            <p className="text-xs text-muted-foreground/70 mt-1 max-w-[200px]">
              Team activity will appear here when members start working on projects.
            </p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/team')}>
                <Users className="h-4 w-4 mr-1" />
                Invite Team
              </Button>
              <Button size="sm" onClick={() => navigate('/projects/new')}>
                <Plus className="h-4 w-4 mr-1" />
                Create Project
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TeamActivitySkeleton() {
  return (
    <Card>
      <CardHeader><Skeleton className="h-5 w-28" /><Skeleton className="h-4 w-44" /></CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-3 w-20" /></div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
