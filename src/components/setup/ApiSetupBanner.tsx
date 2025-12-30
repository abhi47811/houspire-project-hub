import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Key,
  X,
} from 'lucide-react';
import { checkApiConfig, getSetupInstructions } from '@/services/apiConfigService';

export function ApiSetupBanner() {
  const [config, setConfig] = useState(checkApiConfig());
  const [isDismissed, setIsDismissed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setConfig(checkApiConfig());
  }, []);

  // Don't show if everything is configured or user dismissed
  const hasAllKeys = config.supabase.configured && 
    (config.openRouter.configured || config.lovable.configured);
  
  if (hasAllKeys || isDismissed) {
    return null;
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Alert variant="destructive" className="shadow-lg">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="flex items-center justify-between">
          <span>API Keys Required</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsDismissed(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertTitle>
        <AlertDescription className="space-y-3">
          <p className="text-sm">
            AI features won't work without API keys. Configure them to enable:
          </p>
          
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              {config.openRouter.configured ? (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span>Render generation</span>
            </div>
            <div className="flex items-center gap-2">
              {config.openRouter.configured ? (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span>AI room analysis</span>
            </div>
            <div className="flex items-center gap-2">
              {config.openRouter.configured ? (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span>Image cleaning</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide' : 'Show'} Setup Guide
            </Button>
            <Button
              size="sm"
              className="flex-1"
              onClick={() => window.open('https://openrouter.ai/', '_blank')}
            >
              Get API Key <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>

          {showDetails && (
            <Card className="mt-3">
              <CardHeader className="p-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  OpenRouter Setup
                </CardTitle>
                <CardDescription className="text-xs">
                  Follow these steps to get your API key
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2 text-xs">
                <div className="space-y-1">
                  <p className="font-medium">1. Sign up at OpenRouter</p>
                  <Button
                    size="sm"
                    variant="link"
                    className="h-auto p-0 text-xs"
                    onClick={() => window.open('https://openrouter.ai/', '_blank')}
                  >
                    https://openrouter.ai/
                  </Button>
                </div>

                <div className="space-y-1">
                  <p className="font-medium">2. Add credits ($5-10 recommended)</p>
                  <p className="text-muted-foreground">
                    Cost: ~$0.10-0.50 per render
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="font-medium">3. Create API key</p>
                  <p className="text-muted-foreground">
                    Dashboard → API Keys → Create New Key
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="font-medium">4. Add to Supabase Edge Functions</p>
                  <div className="bg-muted p-2 rounded text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span>OPENROUTER_API_KEY=sk-or-...</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-5 w-5"
                        onClick={() => copyToClipboard('OPENROUTER_API_KEY=')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Supabase Dashboard → Edge Functions → Settings
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="font-medium">5. Restart app</p>
                  <p className="text-muted-foreground">
                    Reload the page after adding the key
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}

// Configuration status component for settings page
export function ApiConfigStatus() {
  const config = checkApiConfig();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5" />
          API Configuration Status
        </CardTitle>
        <CardDescription>
          Check which API services are configured
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Supabase */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Supabase</p>
            <p className="text-sm text-muted-foreground">Database and authentication</p>
          </div>
          <Badge variant={config.supabase.configured ? 'default' : 'destructive'}>
            {config.supabase.configured ? (
              <>
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Configured
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 mr-1" />
                Missing
              </>
            )}
          </Badge>
        </div>

        {/* OpenRouter */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">OpenRouter</p>
            <p className="text-sm text-muted-foreground">AI generation and analysis</p>
          </div>
          <Badge variant={config.openRouter.configured ? 'default' : 'destructive'}>
            {config.openRouter.configured ? (
              <>
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Configured
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 mr-1" />
                Missing
              </>
            )}
          </Badge>
        </div>

        {/* Lovable */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Lovable AI</p>
            <p className="text-sm text-muted-foreground">Alternative AI provider (optional)</p>
          </div>
          <Badge variant={config.lovable.configured ? 'default' : 'secondary'}>
            {config.lovable.configured ? (
              <>
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Configured
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 mr-1" />
                Optional
              </>
            )}
          </Badge>
        </div>

        {!config.openRouter.configured && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>
              Configure OpenRouter API key to enable AI features.
              <Button
                size="sm"
                variant="link"
                className="pl-0"
                onClick={() => window.open('https://openrouter.ai/', '_blank')}
              >
                Get API Key →
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
