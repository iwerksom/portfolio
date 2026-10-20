/**
 * projectActivity.ts — server only. Looks at each project's GitHub pull requests and
 * decides the displayed status via projectStatus.resolveStatus.
 *
 * Private repos need GITHUB_TOKEN (fine-grained, read-only, with Pull requests: read
 * and Metadata). Only the resulting status label is sent to the browser — never PR
 * titles, numbers or links. Without the token, private repos fall back to the manual
 * status in data.ts.
 */

import { PROJECTS, type Project } from "./data";
import { fetchWithToken, GITHUB_USERNAME } from "./github";
import {
  ACTIVE_WINDOW_DAYS,
  resolveStatus,
  type ResolvedStatus,
} from "./projectStatus";

async function hadRecentPrActivity(repo: string): Promise<boolean | null> {
  try {
    const res = await fetchWithToken(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/pulls?state=all&sort=updated&direction=desc&per_page=1`,
    );
    if (!res.ok) return null; // private without a token, rate limit, outage...
    const prs = await res.json();
    if (!Array.isArray(prs)) return null;
    if (prs.length === 0) return false;
    const updated = new Date(prs[0].updated_at).getTime();
    return Date.now() - updated < ACTIVE_WINDOW_DAYS * 86400000;
  } catch {
    return null;
  }
}

export async function getProjectStatuses(
  projects: readonly Project[] = PROJECTS,
): Promise<Record<string, ResolvedStatus>> {
  const entries = await Promise.all(
    projects.map(async (p) => {
      const active = p.repo ? await hadRecentPrActivity(p.repo) : null;
      return [p.slug, resolveStatus(p, active)] as const;
    }),
  );
  return Object.fromEntries(entries);
}
