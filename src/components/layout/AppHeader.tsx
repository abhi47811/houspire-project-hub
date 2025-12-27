import { useLocation, Link } from 'react-router-dom';
import { Bell, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const routeNames: Record<string, string> = {
  '/': 'Dashboard',
  '/projects': 'Projects',
  '/team': 'Team',
  '/admin': 'Admin',
};

export function AppHeader() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const getBreadcrumbs = () => {
    const breadcrumbs = [{ name: 'Home', path: '/' }];

    let currentPath = '';
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      const name = routeNames[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ name, path: currentPath });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.path} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-foreground">{crumb.name}</span>
            ) : (
              <Link
                to={crumb.path}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {crumb.name}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-semibold">Notifications</span>
              <Button variant="ghost" size="sm" className="text-xs">
                Mark all as read
              </Button>
            </div>
            <div className="py-4 text-center text-sm text-muted-foreground">
              No new notifications
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
