import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Users, Building2, IndianRupee, BarChart3 } from 'lucide-react';
import { SystemDashboard } from '@/components/admin/SystemDashboard';
import { UserManagement } from '@/components/admin/UserManagement';
import { VendorManagement } from '@/components/admin/VendorManagement';
import { PricingManagement } from '@/components/admin/PricingManagement';
import { AnalyticsView } from '@/components/admin/AnalyticsView';

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
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
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

        <TabsContent value="analytics">
          <AnalyticsView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
