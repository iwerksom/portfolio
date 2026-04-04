#!/bin/bash
# update.sh — Pull changes and redeploy (after first deploy)
# Usage: bash update.sh

set -e

echo "→ Pulling latest changes from Git..."
git pull

echo "→ Installing any new dependencies..."
npm install --production=false

echo "→ Building Next.js..."
npm run build

echo "→ Restarting PM2 process..."
pm2 restart jonas-portfolio

echo "✓ Updated and restarted!"
pm2 status
