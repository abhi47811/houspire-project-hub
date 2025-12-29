import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, RotateCcw, Filter } from 'lucide-react';
import { useState } from 'react';
import { ProjectFilters, cities, phases, useTeamMembers } from '@/hooks/useProjectsData';

interface ProjectFiltersPanelProps {
  filters: ProjectFilters;
  onFiltersChange: (filters: ProjectFilters) => void;
  onReset: () => void;
}

export function ProjectFiltersPanel({
  filters,
  onFiltersChange,
  onReset,
}: ProjectFiltersPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: teamMembers } = useTeamMembers();

  const updateFilter = (key: keyof ProjectFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => value !== 'all'
  );

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-2">
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 hover-lift">
            <Filter className="h-4 w-4" />
            Advanced Filters
            {hasActiveFilters && (
              <span className="ml-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
            )}
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="gap-1 text-muted-foreground">
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
        )}
      </div>

      <CollapsibleContent className="mt-4 animate-fade-in">
        <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-4 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Status</Label>
              <Select value={filters.status} onValueChange={(v) => updateFilter('status', v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* City Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">City</Label>
              <Select value={filters.city} onValueChange={(v) => updateFilter('city', v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Phase Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Phase</Label>
              <Select value={filters.phase} onValueChange={(v) => updateFilter('phase', v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All Phases" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Phases</SelectItem>
                  {phases.map((phase) => (
                    <SelectItem key={phase.value} value={phase.value}>{phase.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Assigned To Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Assigned To</Label>
              <Select value={filters.assignedTo} onValueChange={(v) => updateFilter('assignedTo', v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All Team" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Team</SelectItem>
                  {teamMembers?.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.full_name || 'Unnamed'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Deadline Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Deadline</Label>
              <Select value={filters.deadlineFilter} onValueChange={(v) => updateFilter('deadlineFilter', v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All Deadlines" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Deadlines</SelectItem>
                  <SelectItem value="today">Due Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quality Score Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Quality Score</Label>
              <Select value={filters.qualityFilter} onValueChange={(v) => updateFilter('qualityFilter', v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All Quality" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Quality</SelectItem>
                  <SelectItem value="excellent">Excellent (&gt;90%)</SelectItem>
                  <SelectItem value="good">Good (85-90%)</SelectItem>
                  <SelectItem value="below">Below Target (&lt;85%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget Status Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Budget Status</Label>
              <Select value={filters.budgetFilter} onValueChange={(v) => updateFilter('budgetFilter', v)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All Budget" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Budget</SelectItem>
                  <SelectItem value="under">Under Budget</SelectItem>
                  <SelectItem value="on_track">On Track</SelectItem>
                  <SelectItem value="over">Over Budget</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
