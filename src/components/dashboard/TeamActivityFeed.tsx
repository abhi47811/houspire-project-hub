import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTeamActivity } from '@/hooks/useDashboardData';
import { formatDistanceToNow, parseISO } from 'date-fns';

export function TeamActivityFeed() {
  const { data: activities, isLoading } = useTeamActivity();

  if (isLoading) return <TeamActivitySkeleton />;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader><CardTitle>Team Activity</CardTitle><CardDescription>Recent activity from your team</CardDescription></CardHeader>
      <CardContent>
        {(activities || []).length > 0 ? (
          <div className="space-y-4">
            {activities?.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
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
          <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
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
