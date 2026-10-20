# Deploying to Nordic Way

The server **cannot build** (it runs out of memory on `npm run build`). The site is built on your own machine and the `.next` folder is uploaded over FTP. Code, `public/` files and packages come from git.

Server app root: `/home/iwerksom/schoustrup-thomsen.dk/portfolio` · Node 22 · start file `server.js`.

## Normal deploy

1. **Merge to `main`** (CI must be green), then locally:
   ```powershell
   git switch main
   git pull
   ```
   Stop `npm run dev` first. A build and the dev server fight over `.next`.
2. **On the server** (cPanel Terminal) pull code and packages:
   ```bash
   bash update.sh
   ```
   It prints the commit, the installed Next version against the lockfile, and whether `.next` exists. It stops with `✗` if something is wrong. Fix that first.
   Needed whenever code, `public/` files or `package.json` changed. Not needed for a content-only change that is already pulled.
3. **Build and upload** from your machine:
   ```powershell
   .\deploy-local.ps1 -DryRun     # optional: list what would change
   .\deploy-local.ps1 -Restart    # build, upload, restart, health-check
   ```
   It asks for the FTP password (never stored). It refuses to run unless local `main` equals `origin/main`.
4. **If the site still shows the old version** the `tmp/restart.txt` trick did not restart it: press **Restart** in the cPanel Node.js panel, then:
   ```powershell
   .\deploy-local.ps1 -CheckOnly
   ```

Changed an environment variable in cPanel (`ANTHROPIC_API_KEY`, `GITHUB_TOKEN`)? That only applies after a restart.

## Why the order matters

- **Server Next must equal the build's Next.** A build made with Next 16.4.2 running on 16.2.2 returns 500 on every page (`Cannot read properties of undefined (reading 'kind')` in `stderr.log`). `package.json` now requires `next ^16.4.2`; when you upgrade Next, run `update.sh` before restarting. `deploy-local.ps1` compares the two versions after the upload and exits with code 2 on a mismatch.
- **`.next` is not in git** (gitignored since 2026-09-04). `update.sh` runs `git clean -fd`, which keeps ignored files, so the uploaded `.next` survives.
- **`public/` files travel with git**, not with the `.next` upload. New images or the game under `public/play` need the merge plus `update.sh`.

## When it goes wrong

| Symptom | Look at | Likely cause |
|---|---|---|
| 500 on every page | `tail -40 stderr.log` in the app root | Next version mismatch (see above), or `.next` incomplete |
| Old site still showing | `.\deploy-local.ps1 -CheckOnly`, then cPanel **Restart** | App not restarted |
| `update.sh` ends with `✗ .next/BUILD_ID is missing` | | No build uploaded yet: run `deploy-local.ps1` |
| FTP says "Lost connection" mid-upload | | Normal on this host. WinSCP reconnects and resumes |
| Tagline shows the fallback line | cPanel env vars | `ANTHROPIC_API_KEY` missing, or app not restarted after adding it |
| GitHub feed has no private-repo rows | cPanel env vars | `GITHUB_TOKEN` missing |
| A private project always shows its manual status | `GITHUB_TOKEN` permissions | The token needs **Pull requests: Read** (and Contents: Read for the feed) on `the-margin`, `endbringers-game` and `brians-origin-story` |

Run the server directly to see a startup error:
```bash
source /home/iwerksom/nodevenv/schoustrup-thomsen.dk/portfolio/22/bin/activate && cd /home/iwerksom/schoustrup-thomsen.dk/portfolio && PORT=3999 NODE_ENV=production node server.js
```

## Rolling back

Check out the previous good commit locally, build and upload it, then run `update.sh` on that commit:

```powershell
git switch --detach <good-commit>
.\deploy-local.ps1 -AllowAnyBranch -Restart
git switch main
```

(`update.sh` pulls `origin/main`, so for a rollback that must also change the server's code, revert on `main` with a PR instead.)
