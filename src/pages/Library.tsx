import { useState } from 'react';
import { Library, BarChart3, Settings, Target, PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { LibraryBrowseTab } from '@/components/library/LibraryBrowseTab';
import { LibraryAnalyticsTab } from '@/components/library/LibraryAnalyticsTab';
import { LibraryManageTab } from '@/components/library/LibraryManageTab';
import { LibraryCurateTab } from '@/components/library/LibraryCurateTab';
import { LibraryContributeTab } from '@/components/library/LibraryContributeTab';

const tabs = [
  { id: 'browse', label: 'Browse', icon: Library, roles: ['admin', 'renderer', 'budgeter', 'vendor_finder'] },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['admin'] },
  { id: 'manage', label: 'Manage', icon: Settings, roles: ['admin'] },
  { id: 'curate', label: 'Curate', icon: Target, roles: ['admin'] },
  { id: 'contribute', label: 'Contribute', icon: PlusCircle, roles: ['admin', 'renderer'] },
];

export function LibraryPage() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('browse');
  const userRole = profile?.role || 'renderer';

  const visibleTabs = tabs.filter(tab => tab.roles.includes(userRole));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Houspire Library</h1>
        <p className="text-muted-foreground mt-1">
          Explore and manage design references
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${visibleTabs.length}, 1fr)` }}>
          {visibleTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="browse" className="mt-6">
          <LibraryBrowseTab />
        </TabsContent>

        {userRole === 'admin' && (
          <>
            <TabsContent value="analytics" className="mt-6">
              <LibraryAnalyticsTab />
            </TabsContent>

            <TabsContent value="manage" className="mt-6">
              <LibraryManageTab />
            </TabsContent>

            <TabsContent value="curate" className="mt-6">
              <LibraryCurateTab />
            </TabsContent>
          </>
        )}

        {(userRole === 'admin' || userRole === 'renderer') && (
          <TabsContent value="contribute" className="mt-6">
            <LibraryContributeTab />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

export default LibraryPage;
