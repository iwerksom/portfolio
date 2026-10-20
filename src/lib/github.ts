/**
 * Shared GitHub helpers (server side only: GITHUB_TOKEN is never sent to the browser).
 */

export const GITHUB_USERNAME = "iwerksom";

export async function fetchWithToken(url: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return fetch(url, { headers, next: { revalidate: 300 } });
}
