import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Users, Building2, IndianRupee, BarChart3, Activity, Image, Database, Upload, Shield } from 'lucide-react';
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

export default function Admin() {
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
          <PricingManagement />
        </TabsContent>

        <TabsContent value="defaults">
          <LoadSmartDefaults />
        </TabsContent>

        <TabsContent value="library">
          <div className="space-y-6">
            <LibraryCuratorUpload />
            <LibraryAnalytics />
          </div>
        </TabsContent>

        <TabsContent value="quality">
          <QualityViolationsPanel />
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
