#!/bin/bash

# Test the vision-ai endpoint directly
echo "Testing vision-ai endpoint..."
echo ""

# Get the anon key from env
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52bnhwdGtna3N1aGZjcG11bmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MDE3OTMsImV4cCI6MjA4MjM3Nzc5M30.rxcOYBa0rJwEFCqkD52H_8vkN-9j92zIQOT3aO_VqZM"

curl -X POST \
  https://nvnxptkgksuhfcpmungq.supabase.co/functions/v1/vision-ai \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "quickAnalysis",
    "imageUrl": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
  }' \
  --verbose

