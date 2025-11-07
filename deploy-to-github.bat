@echo off
echo ========================================
echo  Deploy Resume Website to GitHub
echo ========================================
echo.
echo Step 1: Create a GitHub repository
echo -----------------------------------
echo 1. Go to: https://github.com/new
echo 2. Repository name: karim-resume
echo 3. Make it PUBLIC (for free GitHub Pages)
echo 4. DO NOT initialize with README, .gitignore, or license
echo 5. Click "Create repository"
echo.
echo Press any key after you've created the repository...
pause >nul
echo.
echo Step 2: Enter your GitHub username
echo ------------------------------------
set /p GITHUB_USERNAME="Your GitHub username: "
echo.
echo Step 3: Adding remote and pushing to GitHub...
echo ------------------------------------------------
git remote add origin https://github.com/%GITHUB_USERNAME%/karim-resume.git 2>nul
if errorlevel 1 (
    echo Remote already exists, updating...
    git remote set-url origin https://github.com/%GITHUB_USERNAME%/karim-resume.git
)
echo.
echo Pushing to GitHub...
git push -u origin main
echo.
echo ========================================
echo  Deployment Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Go to: https://github.com/%GITHUB_USERNAME%/karim-resume/settings/pages
echo 2. Under "Source", select "GitHub Actions"
echo 3. Wait 1-2 minutes for deployment
echo 4. Your site will be live at:
echo    https://%GITHUB_USERNAME%.github.io/karim-resume/
echo.
pause

