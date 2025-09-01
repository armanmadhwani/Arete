@echo off
echo ========================================
echo    Arête Application Deployment Script
echo ========================================
echo.

echo Step 1: Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js 18+ from https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

echo Node.js found! Version:
node --version

echo.
echo Step 2: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo Step 3: Building application...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    echo Please check the error messages above and fix any issues.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Build completed successfully! 🎉
echo ========================================
echo.
echo Your application is ready for deployment!
echo.
echo Next steps:
echo 1. Set up your Supabase database using supabase-schema.sql
echo 2. Configure environment variables in netlify.toml
echo 3. Deploy using one of these options:
echo.
echo   Option A - Netlify Drag & Drop:
echo   - Go to https://app.netlify.com/drop
echo   - Drag the 'dist' folder to deploy
echo.
echo   Option B - Netlify CLI:
echo   - npm install -g netlify-cli
echo   - netlify deploy --prod --dir=dist
echo.
echo   Option C - Vercel:
echo   - npm install -g vercel
echo   - vercel --prod
echo.
echo See DEPLOYMENT.md for detailed instructions.
echo.
pause
