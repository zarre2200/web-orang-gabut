@echo off
REM Windows Startup Script for Social Media Application
REM Double-click ini untuk menjalankan server

echo.
echo ========================================
echo    Social Media Application Server
echo    Windows Startup Script
echo ========================================
echo.

cd /d "%~dp0"

echo Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js tidak ditemukan!
    echo Silakan download Node.js dari https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js ditemukan. Melanjutkan...
echo.

echo Checking npm packages...
if not exist node_modules (
    echo Installing dependencies dengan npm install...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: npm install gagal
        pause
        exit /b 1
    )
)

echo.
echo Memulai server...
echo.

call npm start

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Server gagal dimulai
    pause
    exit /b 1
)

pause
