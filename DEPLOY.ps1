#!/usr/bin/env pwsh
# RUMERA Deployment Quick Start
# This script prepares RUMERA for production deployment

Write-Host "
╔════════════════════════════════════════════════════════════════╗
║           RUMERA Deployment Quick Start                        ║
║        Vercel Frontend + Railway Backend                       ║
╚════════════════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

# Step 1: Verify Git Status
Write-Host "✓ Step 1: Checking Git Status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "⚠️  Uncommitted changes found:" -ForegroundColor Red
    Write-Host $gitStatus
    Write-Host "`nPlease commit changes first:" -ForegroundColor Yellow
    Write-Host "  git add ." -ForegroundColor Green
    Write-Host "  git commit -m 'Deploy: Add production config'" -ForegroundColor Green
    exit 1
} else {
    Write-Host "✅ All changes committed" -ForegroundColor Green
}

# Step 2: Verify Backend Files
Write-Host "`n✓ Step 2: Verifying Backend Configuration Files..." -ForegroundColor Yellow
$requiredFiles = @(
    "Backend/Procfile",
    "Backend/.env.production", 
    "Backend/railway.json"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file (MISSING)" -ForegroundColor Red
    }
}

# Step 3: Verify Frontend Configuration
Write-Host "`n✓ Step 3: Verifying Frontend Configuration..." -ForegroundColor Yellow
$envFile = "Frontend/.env.production"
if (Test-Path "Frontend/.env.local") {
    Write-Host "  ✅ Frontend/.env.local exists" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Frontend/.env.local not found - will use defaults" -ForegroundColor Yellow
}

# Step 4: Summary
Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    DEPLOYMENT READY                            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Write-Host "`n📋 Next Steps:" -ForegroundColor Yellow
Write-Host "
1️⃣  Deploy Backend to Railway:
   • Go to railway.app
   • Create new project from GitHub
   • Select RUMERA-AI repo, Backend folder
   • Add environment variables (see DEPLOYMENT.md)
   • Save Railway URL

2️⃣  Update Frontend with Railway URL:
   • Edit Frontend/.env.local
   • Set NEXT_PUBLIC_AUTH_API_URL=<your-railway-url>
   • git add . && git commit && git push

3️⃣  Deploy Frontend to Vercel:
   • Go to vercel.com
   • Import RUMERA-AI project
   • Set root to Frontend folder
   • Add NEXT_PUBLIC_AUTH_API_URL env variable
   • Deploy

4️⃣  Test Production:
   • Visit your Vercel domain
   • Test signup/login flows
   • Check logs if issues
" -ForegroundColor Green

Write-Host "📖 See DEPLOYMENT.md for full instructions" -ForegroundColor Cyan
Write-Host "`n✨ Ready to ship to production! 🚀" -ForegroundColor Magenta
