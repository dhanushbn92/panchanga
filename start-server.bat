@echo off
echo ============================================
echo   Vedic Panchanga - Local Server Starter
echo ============================================
echo.
echo Starting Python HTTP server on port 8000...
echo.
echo Once started, open your browser to:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server.
echo ============================================
echo.

cd /d "%~dp0"
python -m http.server 8000
pause
