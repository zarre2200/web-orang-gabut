#!/bin/bash
# Startup Script for Social Media Application
# For macOS and Linux

clear

echo "========================================"
echo "  Social Media Application Server"
echo "  macOS/Linux Startup Script"
echo "========================================"
echo ""

# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js tidak ditemukan!"
    echo "Silakan download Node.js dari https://nodejs.org/"
    echo ""
    read -p "Tekan Enter untuk keluar..."
    exit 1
fi

echo "Node.js ditemukan: $(node --version)"
echo "npm version: $(npm --version)"
echo ""

# Check if node_modules directory exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies dengan npm install..."
    npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo "ERROR: npm install gagal"
        read -p "Tekan Enter untuk keluar..."
        exit 1
    fi
    echo ""
fi

echo "Memulai server..."
echo ""

npm start

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Server gagal dimulai"
    read -p "Tekan Enter untuk keluar..."
    exit 1
fi
