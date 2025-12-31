import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  X,
} from 'lucide-react';
import { checkApiConfig } from '@/services/apiConfigService';

export function ApiSetupBanner() {
  const [config, setConfig] = useState(checkApiConfig());
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    setConfig(checkApiConfig());
  }, []);

  // Don't show if this is a Cloud project (AI is automatically available)
  // or if everything is configured or user dismissed
  const hasAiAccess = config.isCloudProject || config.openRouter.configured || config.lovable.configured;
  
  if (hasAiAccess || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Alert className="shadow-lg border-primary/20 bg-primary/5">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        <AlertTitle className="flex items-center justify-between">
          <span>Connect to Lovable Cloud</span>
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
            Connect to Lovable Cloud to enable AI features like render generation and room analysis.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
}

// Configuration status component for settings page
export function ApiConfigStatus() {
  const config = checkApiConfig();

  if (config.isCloudProject) {
    return (
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">Lovable Cloud Connected</p>
            <p className="text-sm text-muted-foreground">
              AI features are automatically available via edge functions
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-muted/50 border rounded-lg">
      <p className="font-medium">API Configuration</p>
      <p className="text-sm text-muted-foreground">
        Connect to Lovable Cloud to enable AI features
      </p>
    </div>
  );
}
