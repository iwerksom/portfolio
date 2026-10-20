<#
  deploy-local.ps1 - build the site on this machine and upload .next to Nordic Way.

  The server runs out of memory on `npm run build`, so the build always happens
  here. The upload uses WinSCP.com over explicit FTP with TLS (ftpes). The password
  is asked for on every run and only lives in this process's environment; it is
  never written to disk or put on a command line.

  Usage (from the project folder, in PowerShell):
    .\deploy-local.ps1 -DryRun      # build, then list what WOULD be uploaded
    .\deploy-local.ps1              # build and upload
    .\deploy-local.ps1 -SkipBuild   # upload the .next that is already built
    .\deploy-local.ps1 -Restart     # also touch tmp/restart.txt, wait, then health-check
    .\deploy-local.ps1 -CheckOnly   # only health-check the live site (no password needed)

  The full step order is in DEPLOY.md. Short version:
    1. merge to main, `git pull`           2. bash update.sh (server)
    3. .\deploy-local.ps1 -Restart         4. if the site still shows the old
                                              version, press Restart in cPanel

  After the upload the script reads the server's node_modules/next/package.json and
  compares it with the Next version this build was made with. A mismatch makes the
  site return 500 ("reading 'kind'"), so the script exits with code 2 and tells you
  what to run on the server.
#>
param(
  [switch]$DryRun,
  [switch]$SkipBuild,
  [switch]$Restart,
  [switch]$CheckOnly,
  [switch]$AllowAnyBranch,
  [string]$FtpHost = 'cp09.nordicway.dk',
  [string]$FtpUser = 'iwerksom',
  [string]$RemoteApp = '/schoustrup-thomsen.dk/portfolio',
  [string]$SiteUrl = 'https://www.schoustrup-thomsen.dk',
  [string]$NodeVenvModules = '/nodevenv/schoustrup-thomsen.dk/portfolio/22/lib/node_modules',
  [string]$WinScp = "$env:LOCALAPPDATA\Programs\WinSCP\WinSCP.com"
)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

# Pages that exercise the app: static home, a post, a project, a tag page and an API route.
$HealthPaths = @('/', '/posts/frontend-24-years', '/projects/endbringers', '/tags/claude', '/api/github')

function Test-Site {
  param([string]$Base, [string[]]$Paths)
  $failed = 0
  foreach ($p in $Paths) {
    try {
      $r = Invoke-WebRequest -Uri ($Base + $p) -UseBasicParsing -TimeoutSec 30
      $code = [int]$r.StatusCode
    } catch {
      $code = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 0 }
    }
    $ok = ($code -eq 200)
    if (-not $ok) { $failed++ }
    $mark = if ($ok) { 'ok  ' } else { 'FAIL' }
    Write-Host ("  {0} {1}  {2}" -f $mark, $code, $p)
  }
  return $failed
}

if ($CheckOnly) {
  Write-Host "-> Health check of $SiteUrl"
  $failed = Test-Site -Base $SiteUrl -Paths $HealthPaths
  if ($failed -gt 0) { Write-Host "$failed page(s) failed." -ForegroundColor Red; exit 1 }
  Write-Host 'All pages respond 200.' -ForegroundColor Green
  exit 0
}

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

$localNext = (Get-Content -Raw 'node_modules\next\package.json' | ConvertFrom-Json).version
$buildId = (Get-Content -Raw '.next\BUILD_ID').Trim()
Write-Host "-> Local build: Next $localNext, build id $buildId"

# Runtime needs everything in .next except these (build cache, dev server, types).
$mask = '|cache/; dev/; diagnostics/; types/'
$preview = if ($DryRun) { ' -preview' } else { '' }

$secure = Read-Host "FTP password for $FtpUser@$FtpHost" -AsSecureString
$env:WINSCP_FTP_PASSWORD = [System.Net.NetworkCredential]::new('', $secure).Password
$open = "open ftpes://$FtpUser@$FtpHost/ -password=`"%WINSCP_FTP_PASSWORD%`""

# Runs a WinSCP script made of the given command lines (after the common header).
function Invoke-WinScp([string[]]$Commands, [switch]$AllowFailure) {
  $file = New-TemporaryFile
  try {
    (@('option batch abort', 'option confirm off', $open) + $Commands + 'exit') |
      Set-Content -Path $file -Encoding ASCII
    & $WinScp "/script=$file"
    if ($LASTEXITCODE -ne 0 -and -not $AllowFailure) { throw "WinSCP failed (exit $LASTEXITCODE)." }
  } finally {
    Remove-Item $file -ErrorAction SilentlyContinue
  }
}

$exit = 0
$serverNextFile = Join-Path ([System.IO.Path]::GetTempPath()) "server-next-package-$([guid]::NewGuid()).json"
$serverNextFile2 = Join-Path ([System.IO.Path]::GetTempPath()) "server-next-package-$([guid]::NewGuid()).json"
try {
  $sync = "synchronize remote -delete$preview -filemask=`"$mask`" `"$PWD\.next`" `"$RemoteApp/.next`""
  if ($DryRun) {
    Write-Host "-> DRY RUN: listing what would change in $RemoteApp/.next (nothing is uploaded)"
    Invoke-WinScp @($sync)
    Write-Host 'Dry run done. Run again without -DryRun to upload.'
    exit 0
  }

  Write-Host "-> Uploading .next to $RemoteApp/.next ..."
  Invoke-WinScp @($sync)
  Write-Host "-> Upload done (build id $buildId)."

  # --- Version check: the build and the server's installed Next must match. ---
  # cPanel's node_modules is a symlink that FTP often cannot follow, so also try the real
  # location. A failed read here only produces a warning, never aborts the deploy.
  Write-Host '-> Reading the server''s installed Next version...'
  Invoke-WinScp -AllowFailure @(
    'option batch continue',
    "get `"$RemoteApp/node_modules/next/package.json`" `"$serverNextFile`"",
    "get `"$NodeVenvModules/next/package.json`" `"$serverNextFile2`""
  ) 2>&1 | Out-Null
  $found = @($serverNextFile, $serverNextFile2) | Where-Object { Test-Path $_ } | Select-Object -First 1
  if ($found) {
    $serverNext = (Get-Content -Raw $found | ConvertFrom-Json).version
    if ($serverNext -ne $localNext) {
      Write-Host ""
      Write-Host "!! VERSION MISMATCH: built with Next $localNext, server has Next $serverNext." -ForegroundColor Red
      Write-Host "   Do NOT restart yet. On the server run: bash update.sh" -ForegroundColor Red
      Write-Host "   (or: npm install next@$localNext --ignore-scripts). Otherwise every page returns 500." -ForegroundColor Red
      $exit = 2
    } else {
      Write-Host "-> Next version matches the server ($serverNext)." -ForegroundColor Green
    }
  } else {
    Write-Warning "Could not read the server's Next version over FTP (symlinked node_modules). The upload itself is done. Check it on the server: bash update.sh prints it, or node -e ""console.log(require('next/package.json').version)"" (expect $localNext)."
  }

  if ($Restart -and $exit -eq 0) {
    $stub = New-TemporaryFile
    try { Invoke-WinScp @("put `"$($stub.FullName)`" `"$RemoteApp/tmp/restart.txt`"") }
    finally { Remove-Item $stub -ErrorAction SilentlyContinue }
    Write-Host '-> Restart requested via tmp/restart.txt; waiting 15 s, then health-checking...'
    Start-Sleep -Seconds 15
    $failed = Test-Site -Base $SiteUrl -Paths $HealthPaths
    if ($failed -gt 0) {
      Write-Host "$failed page(s) failed. If they show the old version or 500, press Restart in the cPanel Node.js panel and run: .\deploy-local.ps1 -CheckOnly" -ForegroundColor Yellow
      $exit = 1
    } else {
      Write-Host 'Site is up: all pages respond 200.' -ForegroundColor Green
    }
  } elseif ($exit -eq 0) {
    Write-Host 'Next: bash update.sh on the server if code or packages changed, restart the app in cPanel, then .\deploy-local.ps1 -CheckOnly'
  }
} finally {
  Remove-Item Env:\WINSCP_FTP_PASSWORD -ErrorAction SilentlyContinue
  Remove-Item $serverNextFile, $serverNextFile2 -ErrorAction SilentlyContinue
}
exit $exit
