import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

const roleColors: Record<string, string> = {
  admin: 'bg-primary/10 text-primary',
  renderer: 'bg-success/10 text-success',
  budgeter: 'bg-warning/10 text-warning',
  vendor_finder: 'bg-accent/10 text-accent',
};

export default function Team() {
  // Placeholder - will be fetched from Supabase
  const teamMembers: Array<{
    id: string;
    full_name: string;
    avatar_url: string | null;
    role: string;
    is_active: boolean;
  }> = [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Team</h1>
        <p className="text-muted-foreground">Manage your team members and their roles</p>
      </div>

      {/* Team Grid */}
      {teamMembers.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.id}>
              <CardContent className="flex items-center gap-4 pt-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {member.full_name
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium">{member.full_name}</h3>
                  <Badge className={roleColors[member.role] || roleColors.renderer}>
                    {member.role.replace('_', ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No team members yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Team members will appear here once they sign up
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
