import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useDebounce } from '@/hooks/useDebounce';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FolderOpen,
  Home,
  Users,
  Settings,
  Search,
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'project' | 'room' | 'page';
  title: string;
  subtitle?: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const pages: SearchResult[] = [
  { id: 'dashboard', type: 'page', title: 'Dashboard', url: '/', icon: Home },
  { id: 'projects', type: 'page', title: 'Projects', url: '/projects', icon: FolderOpen },
  { id: 'team', type: 'page', title: 'Team', url: '/team', icon: Users },
  { id: 'admin', type: 'page', title: 'Admin', url: '/admin', icon: Settings },
];

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 300);

  // Listen for keyboard shortcut and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdKey = isMac ? e.metaKey : e.ctrlKey;
      if (cmdKey && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    const handleOpenSearch = () => setOpen(true);

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openGlobalSearch', handleOpenSearch);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openGlobalSearch', handleOpenSearch);
    };
  }, []);

  // Fetch projects for search
  const { data: projects } = useQuery({
    queryKey: ['global-search-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, client_name')
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: open,
    staleTime: 30000,
  });

  const results = useMemo(() => {
    const searchResults: SearchResult[] = [];

    // Filter pages
    const filteredPages = pages.filter(
      (page) =>
        page.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    searchResults.push(...filteredPages);

    // Filter projects
    if (projects) {
      const filteredProjects = projects
        .filter(
          (project) =>
            project.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            project.client_name?.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
        .slice(0, 10)
        .map((project) => ({
          id: project.id,
          type: 'project' as const,
          title: project.name,
          subtitle: project.client_name || undefined,
          url: `/projects/${project.id}`,
          icon: FolderOpen,
        }));
      searchResults.push(...filteredProjects);
    }

    return searchResults;
  }, [debouncedQuery, projects]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    setQuery('');
    navigate(result.url);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search projects, pages..."
        value={query}
        onValueChange={setQuery}
        aria-label="Search"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {results.filter((r) => r.type === 'page').length > 0 && (
          <CommandGroup heading="Pages">
            {results
              .filter((r) => r.type === 'page')
              .map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={() => handleSelect(result)}
                  className="cursor-pointer"
                >
                  <result.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>{result.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        )}
        {results.filter((r) => r.type === 'project').length > 0 && (
          <CommandGroup heading="Projects">
            {results
              .filter((r) => r.type === 'project')
              .map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={() => handleSelect(result)}
                  className="cursor-pointer"
                >
                  <result.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span>{result.title}</span>
                    {result.subtitle && (
                      <span className="text-xs text-muted-foreground">
                        {result.subtitle}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
