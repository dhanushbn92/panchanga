@echo off
echo ============================================
echo   Vedic Panchanga - Firebase Setup Helper
echo ============================================
echo.
echo This script will help you link your local code to a Firebase project.
echo.
echo 1. Checking if Firebase CLI is installed...
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Firebase CLI not found. Please run: npm install -g firebase-tools
    pause
    exit /b
)
echo Success: Firebase CLI is installed.
echo.
echo 2. Logging in to Firebase...
firebase login
echo.
echo 3. Linking this directory to your Firebase project...
echo Please select "Hosting" when prompted by the next command.
echo.
firebase init hosting
echo.
echo 4. Deploying to Firebase...
firebase deploy --only hosting
echo.
echo ============================================
echo If deployment was successful, you will see a URL above.
echo If it failed, please copy the error message and let me know.
echo ============================================
pause
