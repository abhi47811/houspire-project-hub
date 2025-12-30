#!/bin/bash

# Houspire Edge Functions Deployment Script
# This script deploys updated edge functions to Supabase

set -e

echo "🚀 Houspire Edge Functions Deployment"
echo "======================================"
echo ""

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found"
    echo ""
    echo "Please install it first:"
    echo "  Mac:     brew install supabase/tap/supabase"
    echo "  Linux:   curl -sL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar xz && sudo mv supabase /usr/local/bin/"
    echo "  Windows: scoop install supabase"
    echo ""
    exit 1
fi

echo "✅ Supabase CLI found: $(supabase --version)"
echo ""

# Check if logged in
if ! supabase projects list &> /dev/null; then
    echo "🔐 Please login to Supabase"
    supabase login
    echo ""
fi

echo "✅ Logged in to Supabase"
echo ""

# Check if project is linked
if [ ! -f ".supabase/config.toml" ]; then
    echo "🔗 Linking to Supabase project..."
    echo ""
    echo "Your project reference: nvnxptkgksuhfcpmungq"
    echo ""
    supabase link --project-ref nvnxptkgksuhfcpmungq
    echo ""
fi

echo "✅ Project linked"
echo ""

# Deploy functions
echo "📦 Deploying edge functions..."
echo ""

# List of functions to deploy
FUNCTIONS=(
    "vision-ai"
    "image-processing"
    "generate-ai"
    "health-check"
)

for func in "${FUNCTIONS[@]}"; do
    if [ -d "supabase/functions/$func" ]; then
        echo "  Deploying $func..."
        supabase functions deploy $func --no-verify-jwt
        echo "  ✅ $func deployed"
    else
        echo "  ⚠️  $func not found, skipping"
    fi
done

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Configure API keys in Supabase Dashboard"
echo "2. Reload your app"
echo "3. Test room analysis"
echo ""
echo "API Keys needed:"
echo "  - OPENROUTER_API_KEY (required)"
echo "  - REPLICATE_API_KEY (optional)"
echo ""
echo "Configure at:"
echo "https://supabase.com/dashboard/project/nvnxptkgksuhfcpmungq/settings/functions"
echo ""
