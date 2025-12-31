import { PageHeader } from '@/components/ui/hero';
import { PremiumButton, PremiumEmptyState } from '@/components/ui/premium';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  LayoutGrid,
  List,
  Kanban,
  FolderOpen,
  Upload,
} from 'lucide-react';
import { CreateProjectForm } from '@/components/projects/CreateProjectForm';
import { EnhancedProjectCard } from '@/components/projects/EnhancedProjectCard';
import { ProjectSearch } from '@/components/projects/ProjectSearch';
import { ProjectFiltersPanel } from '@/components/projects/ProjectFiltersPanel';
import { BatchOperationsBar } from '@/components/projects/BatchOperationsBar';
import { ProjectKanbanView } from '@/components/projects/ProjectKanbanView';
import { BulkUploadProjectModal } from '@/components/projects/BulkUploadProjectModal';
import {
  useProjectsData,
  sortOptions,
  type ProjectFilters,
  type EnrichedProject,
} from '@/hooks/useProjectsData';
import { useToast } from '@/hooks/use-toast';

const defaultFilters: ProjectFilters = {
  status: 'all',
  city: 'all',
  phase: 'all',
  assignedTo: 'all',
  deadlineFilter: 'all',
  qualityFilter: 'all',
  budgetFilter: 'all',
};

export default function Projects() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProjectFilters>(defaultFilters);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'kanban'>('grid');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set());

  const isAdmin = profile?.role === 'admin';

  // Use the enriched projects hook
  const { data: projects, isLoading, refetch } = useProjectsData(filters, sortBy, searchQuery);

  // Delete project mutation
  const deleteProject = useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enriched-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project deleted successfully' });
    },
    onError: (error) => {
      toast({
        title: 'Failed to delete project',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    },
  });

  // Duplicate project mutation
  const duplicateProject = useMutation({
    mutationFn: async (project: EnrichedProject) => {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          name: `${project.name} (Copy)`,
          client_name: project.client_name,
          city: project.city,
          budget_tier: project.budget_tier,
          estimated_budget: project.estimated_budget,
          status: 'draft',
          current_phase: 1,
          max_rooms: project.max_rooms,
          created_by: project.created_by,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enriched-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project duplicated successfully' });
    },
    onError: (error) => {
      toast({
        title: 'Failed to duplicate project',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    },
  });

  // Archive project mutation
  const archiveProject = useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase
        .from('projects')
        .update({ status: 'cancelled' })
        .eq('id', projectId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enriched-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project archived successfully' });
    },
    onError: (error) => {
      toast({
        title: 'Failed to archive project',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    },
  });

  // Selection handlers
  const handleSelectProject = (projectId: string, selected: boolean) => {
    setSelectedProjects(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(projectId);
      } else {
        newSet.delete(projectId);
      }
      return newSet;
    });
  };

  const clearSelection = () => setSelectedProjects(new Set());

  // Bulk operations
  const handleBulkStatusChange = async (status: string) => {
    const ids = Array.from(selectedProjects);
    const { error } = await supabase
      .from('projects')
      .update({ status: status as any })
      .in('id', ids);
    
    if (error) {
      toast({ title: 'Failed to update status', variant: 'destructive' });
    } else {
      toast({ title: `Updated ${ids.length} projects` });
      queryClient.invalidateQueries({ queryKey: ['enriched-projects'] });
      clearSelection();
    }
  };

  const handleBulkExport = () => {
    const selected = projects?.filter(p => selectedProjects.has(p.id)) || [];
    const csv = [
      ['Name', 'Client', 'City', 'Status', 'Rooms', 'Budget', 'Phase'].join(','),
      ...selected.map(p => [
        p.name,
        p.client_name || '',
        p.city || '',
        p.status,
        p.total_rooms,
        p.estimated_budget || '',
        p.current_phase,
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projects_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({ title: `Exported ${selected.length} projects` });
    clearSelection();
  };

  const handleBulkArchive = async () => {
    const ids = Array.from(selectedProjects);
    const { error } = await supabase
      .from('projects')
      .update({ status: 'cancelled' })
      .in('id', ids);
    
    if (error) {
      toast({ title: 'Failed to archive projects', variant: 'destructive' });
    } else {
      toast({ title: `Archived ${ids.length} projects` });
      queryClient.invalidateQueries({ queryKey: ['enriched-projects'] });
      clearSelection();
    }
  };

  const handleBulkDelete = async () => {
    const ids = Array.from(selectedProjects);
    const { error } = await supabase
      .from('projects')
      .delete()
      .in('id', ids);
    
    if (error) {
      toast({ title: 'Failed to delete projects', variant: 'destructive' });
    } else {
      toast({ title: `Deleted ${ids.length} projects` });
      queryClient.invalidateQueries({ queryKey: ['enriched-projects'] });
      clearSelection();
    }
  };

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Premium Styling */}
      <div className="space-y-6">
        <PageHeader
          title="Projects"
          description="Manage and track your interior design projects"
          icon={FolderOpen}
          badge={projects && projects.length > 0 ? { text: `${projects.length} Total`, variant: 'default' } : undefined}
          actions={
            <div className="flex items-center gap-2">
              <PremiumButton variant="outline" size="md" icon={Upload} onClick={() => setIsBulkUploadOpen(true)}>
                Bulk Upload
              </PremiumButton>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <PremiumButton variant="primary" size="md" icon={Plus}>
                    New Project
                  </PremiumButton>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-subtle">
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new interior design project.
                    </DialogDescription>
                  </DialogHeader>
                  <CreateProjectForm 
                    onSuccess={() => {
                      setIsCreateDialogOpen(false);
                      refetch();
                    }} 
                  />
                </DialogContent>
              </Dialog>
            </div>
          }
        />
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          {/* Enhanced Search */}
          <div className="flex-1 min-w-[200px]">
            <ProjectSearch 
              value={searchQuery} 
              onChange={setSearchQuery} 
              projects={projects || []} 
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex rounded-lg border border-input overflow-hidden shadow-sm">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-none border-x border-input"
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode('kanban')}
              title="Kanban View"
            >
              <Kanban className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        <ProjectFiltersPanel 
          filters={filters} 
          onFiltersChange={setFilters} 
          onReset={resetFilters} 
        />
      </div>

      {/* Projects Grid/List/Kanban */}
      {isLoading ? (
        <ProjectsSkeleton viewMode={viewMode} />
      ) : (projects?.length ?? 0) > 0 ? (
        viewMode === 'kanban' ? (
          <ProjectKanbanView
            projects={projects || []}
            selectedProjects={selectedProjects}
            onSelectProject={handleSelectProject}
          />
        ) : viewMode === 'grid' ? (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects?.map((project) => (
              <EnhancedProjectCard
                key={project.id}
                project={project}
                isAdmin={isAdmin}
                isSelected={selectedProjects.has(project.id)}
                onSelect={handleSelectProject}
                onDelete={() => deleteProject.mutate(project.id)}
                onDuplicate={() => duplicateProject.mutate(project)}
                onArchive={() => archiveProject.mutate(project.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {projects?.map((project) => (
              <EnhancedProjectCard
                key={project.id}
                project={project}
                isAdmin={isAdmin}
                isSelected={selectedProjects.has(project.id)}
                onSelect={handleSelectProject}
                onDelete={() => deleteProject.mutate(project.id)}
                onDuplicate={() => duplicateProject.mutate(project)}
                onArchive={() => archiveProject.mutate(project.id)}
              />
            ))}
          </div>
        )
      ) : (
        <PremiumEmptyState 
          icon={FolderOpen}
          title="No Projects Yet"
          description="Start creating your first interior design project or bulk upload multiple projects at once."
          actions={[
            {
              label: "Create Project",
              onClick: () => setIsCreateDialogOpen(true),
              variant: "default"
            },
            {
              label: "Bulk Upload",
              onClick: () => setIsBulkUploadOpen(true),
              variant: "outline"
            }
          ]}
        />
      )}

      {/* Batch Operations Bar */}
      <BatchOperationsBar
        selectedCount={selectedProjects.size}
        onClearSelection={clearSelection}
        onBulkStatusChange={handleBulkStatusChange}
        onBulkExport={handleBulkExport}
        onBulkArchive={handleBulkArchive}
        onBulkDelete={handleBulkDelete}
        isAdmin={isAdmin}
      />

      {/* Bulk Upload Modal */}
      <BulkUploadProjectModal
        open={isBulkUploadOpen}
        onOpenChange={setIsBulkUploadOpen}
      />
    </div>
  );
}

function ProjectsSkeleton({ viewMode }: { viewMode: 'grid' | 'list' | 'kanban' }) {
  if (viewMode === 'kanban') {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-72 flex-shrink-0">
            <Skeleton className="h-10 w-full mb-3 animate-shimmer" />
            <div className="space-y-2">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-32 w-full animate-shimmer" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-32 rounded-none animate-shimmer" />
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4 animate-shimmer" />
                <Skeleton className="h-4 w-1/2 animate-shimmer" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-4 w-20 animate-shimmer" />
                <Skeleton className="h-4 w-20 animate-shimmer" />
                <Skeleton className="h-4 w-24 animate-shimmer" />
                <Skeleton className="h-4 w-16 animate-shimmer" />
              </div>
              <Skeleton className="h-2 w-full animate-shimmer" />
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((j) => (
                  <Skeleton key={j} className="h-6 w-6 rounded-full animate-shimmer" />
                ))}
              </div>
              <Skeleton className="h-10 w-full animate-shimmer" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i}>
          <CardContent className="flex items-center gap-4 p-4">
            <Skeleton className="hidden sm:block h-16 w-16 rounded-lg animate-shimmer" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-48 animate-shimmer" />
              <Skeleton className="h-4 w-64 animate-shimmer" />
            </div>
            <div className="hidden md:flex gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map((j) => (
                <Skeleton key={j} className="h-5 w-5 rounded-full animate-shimmer" />
              ))}
            </div>
            <Skeleton className="h-9 w-20 animate-shimmer" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ 
  onCreateClick, 
  onBulkUploadClick 
}: { 
  onCreateClick: () => void;
  onBulkUploadClick: () => void;
}) {
  return (
    <Card className="border-dashed animate-fade-in">
      <CardContent className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
          <div className="relative rounded-full bg-gradient-to-br from-primary/10 to-accent/10 p-6">
            <FolderOpen className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h3 className="mt-6 text-xl font-semibold text-gradient">No projects yet</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md">
          Get started by creating your first interior design project. You can also bulk upload existing project data.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button variant="outline" onClick={onBulkUploadClick} className="hover-lift">
            <Upload className="mr-2 h-4 w-4" />
            Bulk Upload
          </Button>
          <Button onClick={onCreateClick} className="hover-lift shadow-premium-sm hover:shadow-premium-md">
            <Plus className="mr-2 h-4 w-4" />
            Create First Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
