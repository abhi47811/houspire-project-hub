import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Home, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { trackError } from '@/lib/error-tracking';

interface Props {
  children: ReactNode;
  routeName?: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class RouteErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    
    // Track error with route context
    trackError(error, {
      component: this.props.routeName || 'RouteErrorBoundary',
      metadata: {
        componentStack: errorInfo.componentStack,
        url: window.location.href,
      },
    });

    console.error(`[RouteError] ${this.props.routeName || 'Unknown Route'}:`, error, errorInfo);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleGoHome = (): void => {
    window.location.href = '/';
  };

  private handleReload = (): void => {
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDev = import.meta.env.DEV;

      return (
        <div className="flex items-center justify-center min-h-[400px] p-6">
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle>Something went wrong</CardTitle>
              <CardDescription>
                {this.props.routeName 
                  ? `An error occurred in ${this.props.routeName}`
                  : 'An unexpected error occurred on this page'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isDev && this.state.error && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Bug className="h-4 w-4 text-destructive" />
                    <span className="font-mono text-sm font-medium text-destructive">
                      {this.state.error.name}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground break-all">
                    {this.state.error.message}
                  </p>
                  {this.state.errorInfo?.componentStack && (
                    <details className="mt-2">
                      <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                        Component Stack
                      </summary>
                      <pre className="mt-1 text-[10px] text-muted-foreground overflow-auto max-h-32">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={this.handleRetry}
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={this.handleGoHome}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Button>
              </div>

              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground"
                onClick={this.handleReload}
              >
                Reload Page
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
