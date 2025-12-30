// Test the exact same call the frontend makes
const SUPABASE_URL = "https://nvnxptkgksuhfcpmungq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52bnhwdGtna3N1aGZjcG11bmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MDE3OTMsImV4cCI6MjA4MjM3Nzc5M30.rxcOYBa0rJwEFCqkD52H_8vkN-9j92zIQOT3aO_VqZM";

async function testAnalyzeRoom() {
  console.log('[TEST] Starting room analysis...');
  
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/vision-ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        action: 'analyzeRoom',
        imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
        projectId: 'test-project',
        roomId: 'test-room'
      }),
    });

    console.log('[TEST] Response status:', response.status, response.statusText);
    console.log('[TEST] Response ok:', response.ok);
    
    const data = await response.json();
    console.log('[TEST] Response data:', JSON.stringify(data, null, 2));

    if (!response.ok || data.error) {
      console.error('[TEST] ERROR:', data.error || data.message);
      throw new Error(data.error || data.message || 'Analysis failed');
    }

    console.log('[TEST] SUCCESS! Analysis completed.');
    return data;

  } catch (error) {
    console.error('[TEST] EXCEPTION:', error.message);
    throw error;
  }
}

testAnalyzeRoom()
  .then(result => {
    console.log('[TEST] ✅ Test passed!');
    process.exit(0);
  })
  .catch(error => {
    console.error('[TEST] ❌ Test failed:', error.message);
    process.exit(1);
  });
