#!/bin/bash
# update.sh — pull the latest code and dependencies on the server.
#
# The server cannot build (out of memory). Build and upload .next from your own
# machine with deploy-local.ps1 — see DEPLOY.md for the full order of steps.
#
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

echo ""
echo "── Checks ──────────────────────────────────────────────"
echo "commit:     $(git log --oneline -1)"

WANT=$(node -e "console.log(require('./package-lock.json').packages['node_modules/next'].version)")
HAVE=$(node -e "console.log(require('next/package.json').version)")
echo "next:       installed $HAVE, lockfile $WANT"

PROBLEMS=0
if [ "$WANT" != "$HAVE" ]; then
  echo "✗ Installed Next differs from the lockfile. A build made with $WANT will 500 on $HAVE."
  echo "  Fix: npm install next@$WANT --ignore-scripts   (then re-run this check)"
  PROBLEMS=1
fi

if [ -f .next/BUILD_ID ]; then
  echo "build id:   $(cat .next/BUILD_ID)  (.next present)"
else
  echo "✗ .next/BUILD_ID is missing. Upload a build from your machine: .\\deploy-local.ps1"
  PROBLEMS=1
fi

if [ "$PROBLEMS" -ne 0 ]; then
  echo ""
  echo "✗ Not ready to restart. Fix the points above first."
  exit 1
fi

# Passenger-style hosts restart an app when tmp/restart.txt is touched.
# If the app does not pick up the new build, use Restart in the cPanel Node.js panel.
mkdir -p tmp && touch tmp/restart.txt

echo ""
echo "✓ Done. Restart requested via tmp/restart.txt."
echo "  If the site still shows the old version, press Restart in the cPanel Node.js panel."
