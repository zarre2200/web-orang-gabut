# Windows PowerShell Startup Script for Social Media Application
# Run: powershell -ExecutionPolicy Bypass -File start-server.ps1

Clear-Host

Write-Host "========================================"
Write-Host "  Social Media Application Server"
Write-Host "  Windows PowerShell Startup Script"
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# Check if Node.js is installed
try {
    $nodeVersion = node --version 2>&1
    Write-Host "Node.js ditemukan: $nodeVersion" -ForegroundColor Green
    $npmVersion = npm --version 2>&1
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js tidak ditemukan!" -ForegroundColor Red
    Write-Host "Silakan download Node.js dari https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Tekan Enter untuk keluar"
    exit 1
}

Write-Host ""

# Check if node_modules directory exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies dengan npm install..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "ERROR: npm install gagal" -ForegroundColor Red
        Read-Host "Tekan Enter untuk keluar"
        exit 1
    }
    Write-Host ""
}

Write-Host "Memulai server..." -ForegroundColor Cyan
Write-Host ""

npm start

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Server gagal dimulai" -ForegroundColor Red
    Read-Host "Tekan Enter untuk keluar"
    exit 1
}
