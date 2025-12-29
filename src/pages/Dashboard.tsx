import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { RendererDashboard } from '@/components/dashboard/RendererDashboard';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { profile, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const userName = profile?.full_name || user?.email?.split('@')[0] || 'there';

  return (
    <div className="dashboard-container">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="animate-fade-in-up">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Welcome back, {userName}!
          </h1>
          <p className="text-muted-foreground mt-1 text-base">
            {profile?.role === 'admin' 
              ? "Here's an overview of all projects and team activity."
              : "Here's what's happening with your projects today."}
          </p>
        </div>

        {/* Role-based Dashboard */}
        {profile?.role === 'admin' ? (
          <AdminDashboard />
        ) : (
          <RendererDashboard />
        )}
      </div>
    </div>
  );
}