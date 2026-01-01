import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Users, Building2, IndianRupee, BarChart3, Activity, Image, Database, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SystemDashboard } from '@/components/admin/SystemDashboard';
import { UserManagement } from '@/components/admin/UserManagement';
import { VendorManagement } from '@/components/admin/VendorManagement';
import { PricingManagement } from '@/components/admin/PricingManagement';
import { AnalyticsView } from '@/components/admin/AnalyticsView';
import { MonitoringDashboard } from '@/components/admin/MonitoringDashboard';
import { LibraryAnalytics } from '@/components/admin/LibraryAnalytics';
import { LoadSmartDefaults } from '@/components/admin/LoadSmartDefaults';
import { LibraryCuratorUpload } from '@/components/admin/LibraryCuratorUpload';
import { QualityViolationsPanel } from '@/components/admin/QualityViolationsPanel';
import { PricingDataImport } from '@/components/admin/PricingDataImport';

export default function Admin() {
  // Fetch pending approvals count
  const { data: pendingCount } = useQuery({
    queryKey: ['pending-approvals-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('renders')
        .select('id', { count: 'exact', head: true })
        .eq('approval_status', 'pending');
      return count || 0;
    }
  });

  // Fetch unresolved quality violations count
  const { data: violationsCount } = useQuery({
    queryKey: ['unresolved-violations-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('quality_violations')
        .select('id', { count: 'exact', head: true })
        .is('resolved_at', null);
      return count || 0;
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
        <p className="text-muted-foreground">System management and analytics</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="dashboard" className="gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="vendors" className="gap-2">
            <Building2 className="h-4 w-4" />
            Vendors
          </TabsTrigger>
          <TabsTrigger value="pricing" className="gap-2">
            <IndianRupee className="h-4 w-4" />
            Pricing
          </TabsTrigger>
          <TabsTrigger value="defaults" className="gap-2">
            <Database className="h-4 w-4" />
            Defaults
          </TabsTrigger>
          <TabsTrigger value="library" className="gap-2">
            <Image className="h-4 w-4" />
            Library
          </TabsTrigger>
          <TabsTrigger value="quality" className="gap-2">
            <Shield className="h-4 w-4" />
            Quality
            {violationsCount && violationsCount > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 min-w-5 px-1.5">
                {violationsCount > 9 ? '9+' : violationsCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approvals" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Approvals
            {pendingCount && pendingCount > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 min-w-5 px-1.5">
                {pendingCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="gap-2">
            <Activity className="h-4 w-4" />
            Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <SystemDashboard />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="vendors">
          <VendorManagement />
        </TabsContent>

        <TabsContent value="pricing">
          <div className="space-y-6">
            <PricingDataImport />
            <PricingManagement />
          </div>
        </TabsContent>

        <TabsContent value="defaults">
          <LoadSmartDefaults />
        </TabsContent>

        <TabsContent value="library">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Library Tools
                </CardTitle>
                <CardDescription>
                  Manage and analyze the style library
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Button asChild variant="outline">
                  <Link to="/admin/library-analyzer">
                    Open Library Analyzer
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <LibraryCuratorUpload />
            <LibraryAnalytics />
          </div>
        </TabsContent>

        <TabsContent value="quality">
          <QualityViolationsPanel />
        </TabsContent>

        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Render Approvals
              </CardTitle>
              <CardDescription>
                Review and approve pending renders from all projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link to="/admin/approval">
                  Open Approval Dashboard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsView />
        </TabsContent>

        <TabsContent value="monitoring">
          <MonitoringDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
