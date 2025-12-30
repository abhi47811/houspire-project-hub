import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function DiagnosticPage() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const testAPI = async () => {
    setTesting(true);
    setResults(null);

    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      console.log('[Diagnostic] Testing vision-ai endpoint...', {
        url: `${SUPABASE_URL}/functions/v1/vision-ai`,
        hasKey: !!SUPABASE_KEY
      });

      const response = await fetch(`${SUPABASE_URL}/functions/v1/vision-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({
          action: 'quickAnalysis',
          imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace'
        }),
      });

      const data = await response.json();

      console.log('[Diagnostic] Response:', {
        status: response.status,
        ok: response.ok,
        data
      });

      setResults({
        success: response.ok && !data.error,
        status: response.status,
        statusText: response.statusText,
        data,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('[Diagnostic] Error:', error);
      setResults({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>API Diagnostic Test</CardTitle>
          <CardDescription>
            Test the vision-ai endpoint directly from your browser
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={testAPI} 
            disabled={testing}
            size="lg"
          >
            {testing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              'Test API Connection'
            )}
          </Button>

          {results && (
            <div className="space-y-4 mt-4">
              <Alert variant={results.success ? 'default' : 'destructive'}>
                <div className="flex items-center gap-2">
                  {results.success ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <AlertDescription className="font-semibold">
                    {results.success ? 'API Working!' : 'API Error'}
                  </AlertDescription>
                </div>
              </Alert>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Response Details:</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Status:</span>{' '}
                    <span className={results.success ? 'text-green-600' : 'text-red-600'}>
                      {results.status} {results.statusText}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Timestamp:</span>{' '}
                    {results.timestamp}
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Full Response:</h3>
                <pre className="text-xs overflow-auto max-h-96 bg-background p-3 rounded">
                  {JSON.stringify(results.data || results.error, null, 2)}
                </pre>
              </div>

              {results.data?.demo && (
                <Alert>
                  <AlertDescription>
                    <strong>Demo Mode Active:</strong> {results.data.message}
                    <br />
                    <br />
                    To enable full functionality, add OPENROUTER_API_KEY to Supabase Edge Functions settings.
                  </AlertDescription>
                </Alert>
              )}

              {results.data?.error && (
                <Alert variant="destructive">
                  <AlertDescription>
                    <strong>Error:</strong> {results.data.error}
                    <br />
                    {results.data.message && (
                      <>
                        <br />
                        <strong>Message:</strong> {results.data.message}
                      </>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {results.success && results.data?.result && (
                <Alert>
                  <AlertDescription>
                    <strong>Analysis Result:</strong>
                    <pre className="mt-2 text-xs">
                      {JSON.stringify(results.data.result, null, 2)}
                    </pre>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-2">Troubleshooting Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>If you see "Demo mode" - API keys are not configured in Supabase</li>
              <li>If you see a 500 error - Check Supabase function logs for details</li>
              <li>If you see a 401 error - Check your VITE_SUPABASE_PUBLISHABLE_KEY</li>
              <li>If you see timeout - Image URL might be inaccessible</li>
              <li>Open browser console (F12) for detailed logs</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
