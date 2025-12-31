import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { RendererDashboard } from '@/components/dashboard/RendererDashboard';
import { FloatingActionButton } from '@/components/ui/premium';
import { Loader2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { profile, user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const userName = profile?.full_name || user?.email?.split('@')[0] || 'there';

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="space-y-8">
        {/* Welcome Section with Premium Styling */}
        <div className="animate-fade-in-up relative">
          <h1 className="text-4xl font-bold text-gradient-primary tracking-tight">
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            {profile?.role === 'admin' 
              ? "Here's an overview of all projects and team activity."
              : "Here's what's happening with your projects today."}
          </p>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-mocha/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Role-based Dashboard */}
        {profile?.role === 'admin' ? (
          <AdminDashboard />
        ) : (
          <RendererDashboard />
        )}
      </div>
      
      {/* Floating Action Button */}
      <FloatingActionButton
        icon={Plus}
        label="New Project"
        onClick={() => navigate('/projects')}
      />
    </div>
  );
}