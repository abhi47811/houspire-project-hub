import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { useTeamPerformance } from '@/hooks/useDashboardData';

const roleColors: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-800',
  renderer: 'bg-blue-100 text-blue-800',
  budgeter: 'bg-green-100 text-green-800',
  vendor_finder: 'bg-orange-100 text-orange-800',
};

export function TeamPerformanceCard() {
  const { data: team, isLoading } = useTeamPerformance();

  if (isLoading) return <TeamPerformanceSkeleton />;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Team Performance</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {(team || []).length > 0 ? (
          <div className="space-y-3">
            {team?.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{member.name}</span>
                    <Badge className={roleColors[member.role] || 'bg-muted'}>{member.role}</Badge>
                  </div>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>{member.projectsHandled} projects</span>
                    {member.avgQuality > 0 && <span>{Math.round(member.avgQuality)}% quality</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No team data available</p>
        )}
      </CardContent>
    </Card>
  );
}

function TeamPerformanceSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2"><Skeleton className="h-5 w-32" /></CardHeader>
      <CardContent className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1"><Skeleton className="h-4 w-24" /><Skeleton className="mt-1 h-3 w-32" /></div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
