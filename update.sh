#!/bin/bash
# update.sh — Pull changes and redeploy (after first deploy)
# Usage: bash update.sh

set -e

echo "→ Activating Node 22 environment..."
source /home/iwerksom/nodevenv/schoustrup-thomsen.dk/portfolio/22/bin/activate

echo "→ Pulling latest changes..."
git fetch origin
git reset --hard origin/main
git clean -fd

echo "→ Installing dependencies..."
npm install --ignore-scripts

echo "✓ Done! Restart the app in cPanel Node.js panel."