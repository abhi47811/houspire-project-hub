import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, X, Clock, Folder, User, MapPin, Home, Palette } from 'lucide-react';
import { EnrichedProject, formatRoomType, formatStyle } from '@/hooks/useProjectsData';
import { useDebounce } from '@/hooks/useDebounce';

interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
  projects?: EnrichedProject[];
}

interface Suggestion {
  type: 'project' | 'client' | 'city' | 'room' | 'style';
  value: string;
  label: string;
  icon: React.ReactNode;
}

const RECENT_SEARCHES_KEY = 'houspire_recent_searches';
const MAX_RECENT_SEARCHES = 5;

export function ProjectSearch({ value, onChange, projects = [] }: ProjectSearchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedValue = useDebounce(value, 200);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  // Save search to recent
  const saveToRecent = (search: string) => {
    if (!search.trim()) return;
    
    const updated = [
      search,
      ...recentSearches.filter(s => s !== search),
    ].slice(0, MAX_RECENT_SEARCHES);
    
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  // Generate suggestions based on current input
  const suggestions: Suggestion[] = [];
  
  if (debouncedValue.length >= 2) {
    const query = debouncedValue.toLowerCase();
    
    // Project name matches
    projects
      .filter(p => p.name.toLowerCase().includes(query))
      .slice(0, 3)
      .forEach(p => {
        suggestions.push({
          type: 'project',
          value: p.name,
          label: p.name,
          icon: <Folder className="h-3.5 w-3.5" />,
        });
      });

    // Client matches
    const clientMatches = new Set<string>();
    projects.forEach(p => {
      if (p.client_name?.toLowerCase().includes(query)) {
        clientMatches.add(p.client_name);
      }
    });
    Array.from(clientMatches).slice(0, 2).forEach(client => {
      suggestions.push({
        type: 'client',
        value: client,
        label: client,
        icon: <User className="h-3.5 w-3.5" />,
      });
    });

    // City matches
    const cityMatches = new Set<string>();
    projects.forEach(p => {
      if (p.city?.toLowerCase().includes(query)) {
        cityMatches.add(p.city);
      }
    });
    Array.from(cityMatches).slice(0, 2).forEach(city => {
      suggestions.push({
        type: 'city',
        value: city,
        label: city,
        icon: <MapPin className="h-3.5 w-3.5" />,
      });
    });

    // Room type matches
    const roomMatches = new Set<string>();
    projects.forEach(p => {
      Object.keys(p.room_type_breakdown).forEach(room => {
        if (room.toLowerCase().includes(query) || formatRoomType(room).toLowerCase().includes(query)) {
          roomMatches.add(room);
        }
      });
    });
    Array.from(roomMatches).slice(0, 2).forEach(room => {
      suggestions.push({
        type: 'room',
        value: formatRoomType(room),
        label: formatRoomType(room),
        icon: <Home className="h-3.5 w-3.5" />,
      });
    });

    // Style matches
    const styleMatches = new Set<string>();
    projects.forEach(p => {
      Object.keys(p.style_breakdown).forEach(style => {
        if (style.toLowerCase().includes(query) || formatStyle(style).toLowerCase().includes(query)) {
          styleMatches.add(style);
        }
      });
    });
    Array.from(styleMatches).slice(0, 2).forEach(style => {
      suggestions.push({
        type: 'style',
        value: formatStyle(style),
        label: formatStyle(style),
        icon: <Palette className="h-3.5 w-3.5" />,
      });
    });
  }

  const showDropdown = isFocused && (suggestions.length > 0 || (recentSearches.length > 0 && !value));

  const handleSelect = (searchValue: string) => {
    onChange(searchValue);
    saveToRecent(searchValue);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex-1 min-w-[200px]">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input
        ref={inputRef}
        placeholder="Search projects, clients, cities, rooms..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          // Delay to allow click on suggestions
          setTimeout(() => setIsFocused(false), 200);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && value) {
            saveToRecent(value);
            setIsFocused(false);
          }
          if (e.key === 'Escape') {
            setIsFocused(false);
            inputRef.current?.blur();
          }
        }}
        className="pl-10 pr-8"
      />
      {value && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Suggestions Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          <ScrollArea className="max-h-64">
            {/* Recent Searches */}
            {!value && recentSearches.length > 0 && (
              <div className="p-2">
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-xs font-medium text-muted-foreground">Recent Searches</span>
                  <button
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem(RECENT_SEARCHES_KEY);
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                </div>
                {recentSearches.map((search, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(search)}
                    className="flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-accent rounded-md"
                  >
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                {value && (
                  <div className="px-2 py-1">
                    <span className="text-xs font-medium text-muted-foreground">Suggestions</span>
                  </div>
                )}
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(suggestion.value)}
                    className="flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-accent rounded-md"
                  >
                    <span className="text-muted-foreground">{suggestion.icon}</span>
                    <span className="flex-1 text-left">{suggestion.label}</span>
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {suggestion.type}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
