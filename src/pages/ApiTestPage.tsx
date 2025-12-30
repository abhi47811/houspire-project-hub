import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  PlayCircle,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import {
  runAllApiTests,
  formatTestResults,
  getSetupRecommendations,
  ApiTestResult,
} from '@/services/apiTestService';

export default function ApiTestPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<ApiTestResult[] | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const runTests = async () => {
    setIsRunning(true);
    setResults(null);
    setRecommendations([]);

    try {
      const testResults = await runAllApiTests();
      setResults(testResults);
      setRecommendations(getSetupRecommendations(testResults));

      // Log to console
      console.log(formatTestResults(testResults));
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'not_configured':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-600">Working</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'not_configured':
        return <Badge variant="secondary">Not Configured</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">API Configuration Test</h1>
        <p className="text-muted-foreground mt-2">
          Verify that your API keys are configured correctly
        </p>
      </div>

      {/* Test Runner Card */}
      <Card>
        <CardHeader>
          <CardTitle>Run Diagnostic Tests</CardTitle>
          <CardDescription>
            This will test your Supabase connection, OpenRouter API key, and AI features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={runTests} disabled={isRunning} className="w-full gap-2" size="lg">
            {isRunning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                Run All Tests
              </>
            )}
          </Button>

          {isRunning && (
            <div className="text-center text-sm text-muted-foreground">
              <p>Testing API connections... This may take a few seconds.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Results */}
      {results && results.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Test Results</CardTitle>
              <Button variant="ghost" size="sm" onClick={runTests}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Retest
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex-shrink-0 mt-1">{getStatusIcon(result.status)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{result.service}</h3>
                    {getStatusBadge(result.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{result.message}</p>
                  {result.details && (
                    <details className="text-xs mt-2">
                      <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                        Show details
                      </summary>
                      <pre className="mt-2 p-2 bg-muted rounded overflow-x-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Actions to improve your setup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <Alert key={index}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="ml-2">{recommendation}</AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Setup Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Setup Guide</CardTitle>
          <CardDescription>Follow these steps if tests are failing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Get OpenRouter API Key</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Sign up at OpenRouter and create an API key
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="pl-0"
                  onClick={() => window.open('https://openrouter.ai/', '_blank')}
                >
                  Open OpenRouter
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Add Credits</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Add $5-10 to your OpenRouter account (covers 20-50 renders)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Configure in Lovable</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Add OPENROUTER_API_KEY to your Lovable project secrets
                </p>
                <div className="mt-2 p-3 bg-muted rounded text-sm font-mono">
                  OPENROUTER_API_KEY=sk-or-v1-your-key-here
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Lovable Dashboard → Project Settings → Secrets
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Redeploy</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Redeploy your Lovable project for changes to take effect
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                5
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Test Again</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Return to this page and click "Run All Tests" again
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => window.open('https://openrouter.ai/docs', '_blank')}
          >
            OpenRouter Documentation
            <ExternalLink className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => window.open('https://supabase.com/docs/guides/functions', '_blank')}
          >
            Supabase Functions Guide
            <ExternalLink className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() =>
              window.open(
                'https://github.com/abhi47811/houspire-project-hub/blob/main/docs/QUICK_START_API_SETUP.md',
                '_blank'
              )
            }
          >
            View Setup Documentation
            <ExternalLink className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
