@echo off
echo ============================================
echo   Vedic Panchanga - FINAL DEPLOY HELPER
echo ============================================
echo.

:: 1. Consolidation
echo [1] Consolidating files into public folder...
if not exist public mkdir public
copy /y index.html public\ >nul 2>&1
copy /y styles.css public\ >nul 2>&1
copy /y app.js public\ >nul 2>&1
copy /y astronomy-calc.js public\ >nul 2>&1
copy /y panchanga-calc.js public\ >nul 2>&1
copy /y muhurta-calc.js public\ >nul 2>&1
copy /y export.js public\ >nul 2>&1
copy /y cities-data.json public\ >nul 2>&1
copy /y nakshatra-data.json public\ >nul 2>&1

:: 2. Verification
echo [2] Verifying public folder content:
dir /b public

echo [3] Linking to project...
call firebase use panchanga-anaadi

echo.
echo [4] Deploying to Firebase...
echo IMPORTANT: Make sure you see "Deploy complete!" below.
echo.
call firebase deploy --only hosting

echo.
echo ============================================
echo DONE! Please refresh: https://panchanga-anaadi.web.app/
echo (If you still see the welcome page, press Ctrl+F5 to hard refresh)
echo ============================================
pause
