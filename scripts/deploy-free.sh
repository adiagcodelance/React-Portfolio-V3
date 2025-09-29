#!/bin/bash

# Free Portfolio CMS Deployment Script
# Frontend: GitHub Pages (free) + Backend: Railway (free)

set -e

echo "🆓 Setting up FREE Portfolio CMS deployment..."
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo "🚀 This setup is COMPLETELY FREE and includes:"
echo "   ✅ Frontend: GitHub Pages (current setup)"
echo "   ✅ Backend API: Railway (500 hours/month free)"
echo "   ✅ Database: SQLite (no cost)"
echo "   ✅ SSL/HTTPS: Included"
echo ""

# Login to Railway
echo "🔐 Please login to Railway (free account)..."
echo "   If you don't have an account, create one at https://railway.app"
railway login

# Initialize Railway project
echo "🚂 Creating Railway project..."
railway init --name portfolio-cms-backend

# Set up environment variables for Railway
echo "⚙️ Setting up environment variables..."
railway add DATABASE_URL=sqlite:./data.sqlite
railway add NODE_ENV=production
railway add JWT_SECRET=c818ac85e47dd9e6090b66aa11ef9ca4d96f23a1f2c2a2c64c201c19fee5e3c7fc87bbbffee25eedea2b3c874e2dd33f6bbd2d63150176c883d8163b30a349fa
railway add FRONTEND_URL=https://$(git config --get remote.origin.url | sed 's/.*\/\([^.]*\).*/\1/').github.io

# Deploy to Railway
echo "🚀 Deploying backend to Railway..."
railway up

# Get the Railway app URL
RAILWAY_URL=$(railway status --json | jq -r '.deployments[0].url // "https://your-app.railway.app"')

echo ""
echo "🎉 FREE Deployment Complete!"
echo ""
echo "📝 Your setup:"
echo "   Frontend: Keep your current hosting (GitHub Pages, etc.)"
echo "   Backend API: $RAILWAY_URL"
echo ""
echo "⚙️ Update your frontend to use this API URL:"
echo "   In your React app, change the API base URL to: $RAILWAY_URL"
echo ""
echo "🔧 Next steps:"
echo "   1. Update your frontend API configuration"
echo "   2. Push frontend changes to deploy"
echo "   3. Access admin at: $RAILWAY_URL/admin"
echo ""

# Save configuration
cat > deployment-config.txt << EOF
# FREE Portfolio CMS Configuration
BACKEND_URL=$RAILWAY_URL
FRONTEND_URL=https://$(git config --get remote.origin.url | sed 's/.*\/\([^.]*\).*/\1/').github.io
DATABASE_URL=sqlite:./data.sqlite
JWT_SECRET=c818ac85e47dd9e6090b66aa11ef9ca4d96f23a1f2c2a2c64c201c19fee5e3c7fc87bbbffee25eedea2b3c874e2dd33f6bbd2d63150176c883d8163b30a349fa

# Railway Commands:
# View logs: railway logs
# View status: railway status  
# Redeploy: railway up
# Add env var: railway add KEY=value
EOF

echo "📄 Configuration saved to deployment-config.txt"
echo ""
echo "💡 Pro tip: Railway free tier gives you:"
echo "   - 500 execution hours/month (enough for most portfolios)"  
echo "   - Custom domain support"
echo "   - Automatic HTTPS"
echo "   - Git-based deployments"
echo ""
echo "🎯 Total monthly cost: $0.00"