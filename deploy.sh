#!/bin/bash
# deploy.sh — First-time deploy on Nordic Way
# Run once via SSH after uploading the project
# Usage: bash deploy.sh

set -e

echo "→ Installing dependencies..."
npm install --production=false

echo "→ Building Next.js..."
npm run build

echo "→ Creating log directory..."
mkdir -p logs

echo "→ Checking for PM2..."
if ! command -v pm2 &> /dev/null; then
  echo "→ Installing PM2 globally..."
  npm install -g pm2
fi

echo "→ Starting app with PM2..."
pm2 start pm2.config.js

echo "→ Saving PM2 process list (survives reboots)..."
pm2 save

echo ""
echo "✓ Deployed! App running on port 3000."
echo ""
echo "Next steps:"
echo "  - Point your domain to this Node.js app in cPanel"
echo "  - Or set up a reverse proxy (see README)"
echo ""
echo "Useful PM2 commands:"
echo "  pm2 status              — check if app is running"
echo "  pm2 logs jonas-portfolio — tail live logs"
echo "  pm2 restart jonas-portfolio — restart after changes"
