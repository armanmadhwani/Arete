@echo off
echo ========================================
echo    Push Arête to GitHub
echo ========================================
echo.

echo Your local repository is ready with 41 files committed!
echo.
echo Next steps:
echo.
echo 1. Go to: https://github.com/new
echo 2. Repository name: arete-project-manager
echo 3. Description: AI-powered personal project and task management application
echo 4. Set to Public (or Private)
echo 5. DO NOT initialize with README (we have one)
echo 6. Click "Create repository"
echo.
echo Then run these commands (replace YOUR_USERNAME):
echo.
echo git remote add origin https://github.com/YOUR_USERNAME/arete-project-manager.git
echo git branch -M main  
echo git push -u origin main
echo.
echo ========================================
echo    Ready to Deploy After Push!
echo ========================================
echo.
echo Once on GitHub, deploy instantly:
echo - Vercel: https://vercel.com/new
echo - Netlify: https://app.netlify.com/start
echo.
pause
