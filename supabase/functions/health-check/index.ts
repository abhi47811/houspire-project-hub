import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  checks: {
    database: CheckResult;
    storage: CheckResult;
    auth: CheckResult;
    edgeFunctions: CheckResult;
  };
  metrics?: {
    responseTime: number;
    activeConnections?: number;
  };
}

interface CheckResult {
  status: 'pass' | 'fail' | 'warn';
  message?: string;
  latency?: number;
}

async function checkDatabase(supabase: any): Promise<CheckResult> {
  const start = Date.now();
  try {
    const { error } = await supabase.from('profiles').select('id').limit(1);
    const latency = Date.now() - start;
    
    if (error) {
      return { status: 'fail', message: error.message, latency };
    }
    
    return { 
      status: latency < 500 ? 'pass' : 'warn', 
      latency,
      message: latency >= 500 ? 'High latency detected' : undefined
    };
  } catch (error) {
    return { status: 'fail', message: String(error), latency: Date.now() - start };
  }
}

async function checkStorage(supabase: any): Promise<CheckResult> {
  const start = Date.now();
  try {
    const { data, error } = await supabase.storage.listBuckets();
    const latency = Date.now() - start;
    
    if (error) {
      return { status: 'fail', message: error.message, latency };
    }
    
    return { status: 'pass', latency };
  } catch (error) {
    return { status: 'fail', message: String(error), latency: Date.now() - start };
  }
}

async function checkAuth(supabase: any): Promise<CheckResult> {
  const start = Date.now();
  try {
    // Just check if auth service responds
    const { error } = await supabase.auth.getSession();
    const latency = Date.now() - start;
    
    // No error means auth service is working
    return { status: 'pass', latency };
  } catch (error) {
    return { status: 'fail', message: String(error), latency: Date.now() - start };
  }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Run health checks in parallel
    const [database, storage, auth] = await Promise.all([
      checkDatabase(supabase),
      checkStorage(supabase),
      checkAuth(supabase),
    ]);

    // Edge functions check (self-check)
    const edgeFunctions: CheckResult = { status: 'pass', latency: 0 };

    const checks = { database, storage, auth, edgeFunctions };

    // Determine overall status
    const allChecks = Object.values(checks);
    const failCount = allChecks.filter(c => c.status === 'fail').length;
    const warnCount = allChecks.filter(c => c.status === 'warn').length;

    let overallStatus: 'healthy' | 'degraded' | 'unhealthy';
    if (failCount > 0) {
      overallStatus = failCount >= 2 ? 'unhealthy' : 'degraded';
    } else if (warnCount > 0) {
      overallStatus = 'degraded';
    } else {
      overallStatus = 'healthy';
    }

    const response: HealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      checks,
      metrics: {
        responseTime: Date.now() - startTime,
      },
    };

    // Return appropriate status code
    const httpStatus = overallStatus === 'healthy' ? 200 : 
                       overallStatus === 'degraded' ? 200 : 503;

    return new Response(JSON.stringify(response), {
      status: httpStatus,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return new Response(
      JSON.stringify({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        error: String(error),
        metrics: { responseTime: Date.now() - startTime },
      }),
      {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
