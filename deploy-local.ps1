<#
  deploy-local.ps1 - build the site on this machine and upload .next to Nordic Way.

  The server runs out of memory on `npm run build`, so the build always happens
  here. The upload uses WinSCP's saved session (host, user and password are
  stored in WinSCP, nothing is kept in this repo).

  Usage (from the project folder, in PowerShell):
    .\deploy-local.ps1 -DryRun     # build, then list what WOULD be uploaded
    .\deploy-local.ps1             # build and upload
    .\deploy-local.ps1 -SkipBuild  # upload the .next that is already built
    .\deploy-local.ps1 -Restart    # also touch tmp/restart.txt (see note below)

  Then, on the server, run `bash update.sh` if code/public files changed, and
  restart the app in the cPanel Node.js panel. Env var changes need a restart too.

  FIRST DEPLOY AFTER 2026-09-04: run `bash update.sh` BEFORE this script. The
  server's old .next is still tracked in its git HEAD, so update.sh's
  `git reset --hard` deletes it - including anything uploaded earlier. Once
  .next is untracked on the server, the order no longer matters.

  -Restart: Passenger-style hosts restart an app when tmp/restart.txt is
  touched. That is untested on Nordic Way; if the app does not pick up the
  change, press Restart in the cPanel Node.js panel instead.
#>
param(
  [switch]$DryRun,
  [switch]$SkipBuild,
  [switch]$Restart,
  [switch]$AllowAnyBranch,
  [string]$FtpHost = 'cp09.nordicway.dk',
  [string]$FtpUser = 'iwerksom',
  [string]$RemoteApp = '/schoustrup-thomsen.dk/portfolio',
  [string]$WinScp = "$env:LOCALAPPDATA\Programs\WinSCP\WinSCP.com"
)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

if (-not (Test-Path $WinScp)) { throw "WinSCP.com not found at $WinScp (pass -WinScp)." }

# Deploy only what is on main, so the server never gets an unreviewed build.
if (-not $AllowAnyBranch) {
  $branch = (git rev-parse --abbrev-ref HEAD).Trim()
  if ($branch -ne 'main') { throw "On branch '$branch'. Switch to main, or pass -AllowAnyBranch." }
  git fetch origin main --quiet
  if ((git rev-parse HEAD).Trim() -ne (git rev-parse origin/main).Trim()) {
    throw 'Local main differs from origin/main. Run `git pull` (or push) first, or pass -AllowAnyBranch.'
  }
  if (git status --porcelain) {
    Write-Warning 'Working tree has uncommitted changes; they WILL be in this build.'
  }
}

if (-not $SkipBuild) {
  Write-Host '-> Building (next build --webpack)...'
  npm run build
  if ($LASTEXITCODE -ne 0) { throw 'Build failed; nothing was uploaded.' }
}
if (-not (Test-Path '.next\BUILD_ID')) { throw '.next\BUILD_ID is missing; build first.' }

# Runtime needs everything in .next except these (build cache, dev server, types).
$mask = '|cache/; dev/; diagnostics/; types/'
$preview = if ($DryRun) { ' -preview' } else { '' }

$secure = Read-Host "FTP password for $FtpUser@$FtpHost" -AsSecureString
$env:WINSCP_FTP_PASSWORD = [System.Net.NetworkCredential]::new('', $secure).Password

$script = New-TemporaryFile
@(
  'option batch abort',
  'option confirm off',
  "open ftpes://$FtpUser@$FtpHost/ -password=`"%WINSCP_FTP_PASSWORD%`"",
  "synchronize remote -delete$preview -filemask=`"$mask`" `"$PWD\.next`" `"$RemoteApp/.next`""
  $(if ($Restart -and -not $DryRun) {
    $stub = New-TemporaryFile
    "put `"$($stub.FullName)`" `"$RemoteApp/tmp/restart.txt`""
  }),
  'exit'
) | Where-Object { $_ } | Set-Content -Path $script -Encoding ASCII

try {
  if ($DryRun) { Write-Host "-> DRY RUN: listing what would change in $RemoteApp/.next (nothing is uploaded)" }
  else { Write-Host "-> Uploading .next to $RemoteApp/.next ..." }
  & $WinScp "/script=$script"
  if ($LASTEXITCODE -ne 0) { throw "WinSCP failed (exit $LASTEXITCODE)." }
} finally {
  Remove-Item Env:\WINSCP_FTP_PASSWORD -ErrorAction SilentlyContinue
  Remove-Item $script -ErrorAction SilentlyContinue
}

if ($DryRun) { Write-Host 'Dry run done. Run again without -DryRun to upload.' }
else {
  Write-Host 'Upload done. Next: `bash update.sh` on the server if code changed, then restart the app in cPanel.'
}
