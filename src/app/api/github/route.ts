import { NextResponse } from "next/server";

/**
 * GET /api/github
 *
 * Fetches recent activity across your GitHub repos and returns
 * a normalised list of releases/commits for the portfolio feed.
 *
 * No API key required for public repos (60 req/hr unauthenticated).
 * Set GITHUB_TOKEN env var for 5000 req/hr if you ever need it.
 *
 * Private repos (PRIVATE_REPOS) are read with GITHUB_TOKEN, a fine-grained
 * read-only token, and reduced server-side to "N commits this week" under a
 * label of your choosing. Titles, messages, links and the real repo name never
 * leave the server. Without a token they are skipped.
 *
 * To configure which repos to watch, edit REPOS and PRIVATE_REPOS below.
 */

const GITHUB_USERNAME = "iwerksom";

const REPOS: string[] = [
  // Public repos only — this feed links straight to them.
  "portfolio",
  "wreck-works",
  "ghost-in-the-wreck",
  "agent-runner",
  "c64Demo",
];

// Private repos: only the label and a commit count are ever published.
const PRIVATE_REPOS: { repo: string; label: string }[] = [
  { repo: "the-margin", label: "the-margin" },
  { repo: "endbringers-game", label: "endbringers" },
];

const ACTIVITY_WINDOW_DAYS = 7;

export interface GithubItem {
  repo: string;
  type: "release" | "commit" | "activity";
  title: string;
  date: string;
  url?: string; // absent for private-repo activity, which is not linkable
  tag?: string;
}

async function fetchWithToken(url: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return fetch(url, { headers, next: { revalidate: 300 } });
}

async function getRepoActivity(repo: string): Promise<GithubItem[]> {
  const items: GithubItem[] = [];

  try {
    const releasesRes = await fetchWithToken(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/releases?per_page=3`,
    );
    if (releasesRes.ok) {
      const releases = await releasesRes.json();
      for (const r of releases) {
        items.push({
          repo,
          type: "release",
          title: r.name || r.tag_name,
          date: r.published_at,
          url: r.html_url,
          tag: r.tag_name,
        });
      }
    }
  } catch {}

  if (items.length === 0) {
    try {
      const commitsRes = await fetchWithToken(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/commits?per_page=3`,
      );
      if (commitsRes.ok) {
        const commits = await commitsRes.json();
        for (const c of commits) {
          const msg = c.commit?.message?.split("\n")[0] ?? "Update";
          items.push({
            repo,
            type: "commit",
            title: msg.length > 72 ? msg.slice(0, 69) + "…" : msg,
            date: c.commit?.committer?.date ?? c.commit?.author?.date,
            url: c.html_url,
          });
        }
      }
    } catch {}
  }

  return items;
}

async function getPrivateActivity(
  repo: string,
  label: string,
): Promise<GithubItem[]> {
  if (!process.env.GITHUB_TOKEN) return [];
  try {
    const since = new Date(
      Date.now() - ACTIVITY_WINDOW_DAYS * 86400000,
    ).toISOString();
    const res = await fetchWithToken(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/commits?since=${since}&per_page=100`,
    );
    if (!res.ok) return [];
    const list = await res.json();
    const commits: number = Array.isArray(list) ? list.length : 0;
    const latest: string =
      list[0]?.commit?.committer?.date ?? list[0]?.commit?.author?.date ?? "";
    if (commits === 0 || !latest) return [];
    return [
      {
        repo: label,
        type: "activity",
        title: `${commits} commit${commits === 1 ? "" : "s"} this week`,
        date: latest,
      },
    ];
  } catch {
    return [];
  }
}

export async function GET() {
  if (REPOS.length === 0) {
    return NextResponse.json({
      items: [],
      note: "Add repo names to REPOS in src/app/api/github/route.ts",
    });
  }

  try {
    const results = await Promise.allSettled([
      ...REPOS.map(getRepoActivity),
      ...PRIVATE_REPOS.map((r) => getPrivateActivity(r.repo, r.label)),
    ]);
    const items: GithubItem[] = results
      .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8);

    return NextResponse.json(
      { items },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch (err) {
    console.error("[github] fetch failed:", err);
    return NextResponse.json(
      { items: [], error: "Failed to fetch" },
      { status: 200 },
    );
  }
}
