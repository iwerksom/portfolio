/**
 * projectStatus.ts — how a project's status is decided and how projects are ordered.
 *
 * Rules (see resolveStatus):
 *   - released projects stay "released".
 *   - a project with a GitHub repo is "in progress" only if one of its pull requests
 *     had activity in the last ACTIVE_WINDOW_DAYS days.
 *   - otherwise it falls back to its latest milestone (if one is set) or "on hold".
 *   - without a repo, or when GitHub cannot be reached, the manual `status` in
 *     data.ts is used.
 *
 * Order on the site: released, then in progress, then everything else.
 * This file is pure (no fetching), so client components can import it.
 */

import type { Project } from "./data";

export const ACTIVE_WINDOW_DAYS = 7;

export type StatusKey =
  | "released"
  | "in progress"
  | "milestone"
  | "on hold"
  | "concept";

export interface ResolvedStatus {
  key: StatusKey;
  label: string;
  group: 0 | 1 | 2; // 0 released, 1 in progress, 2 everything else
}

/** activeRecently: true/false when GitHub answered, null when unknown or no repo. */
export function resolveStatus(
  project: Pick<Project, "status" | "milestone">,
  activeRecently: boolean | null,
): ResolvedStatus {
  if (project.status === "released") {
    return { key: "released", label: "released", group: 0 };
  }
  if (activeRecently === true) {
    return { key: "in progress", label: "in progress", group: 1 };
  }
  if (activeRecently === false) {
    return project.milestone
      ? { key: "milestone", label: project.milestone, group: 2 }
      : { key: "on hold", label: "on hold", group: 2 };
  }
  // Unknown: trust the manual status.
  switch (project.status) {
    case "in progress":
      return { key: "in progress", label: "in progress", group: 1 };
    case "concept":
      return { key: "concept", label: "concept", group: 2 };
    default:
      return { key: "on hold", label: "on hold", group: 2 };
  }
}

/** Released first, then in progress, then the rest. Keeps data.ts order within a group. */
export function sortByStatus<T extends { slug: string }>(
  projects: readonly T[],
  statuses: Record<string, ResolvedStatus>,
): T[] {
  const group = (p: T) => statuses[p.slug]?.group ?? 2;
  return projects
    .map((p, i) => ({ p, i }))
    .sort((a, b) => group(a.p) - group(b.p) || a.i - b.i)
    .map(({ p }) => p);
}
