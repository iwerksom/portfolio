import { PROJECTS, type Project } from "./data";
import { POSTS, type Post } from "./posts";

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Every tool tag used by a project, plus every post tag, keyed by slug. */
export function getAllTags(): { slug: string; label: string }[] {
  const seen = new Map<string, string>();
  for (const label of [
    ...PROJECTS.flatMap((p) => p.tools),
    ...POSTS.map((p) => p.tag),
  ]) {
    const slug = slugifyTag(label);
    if (!seen.has(slug)) seen.set(slug, label);
  }
  return [...seen].map(([slug, label]) => ({ slug, label }));
}

export function projectsForTag(slug: string): Project[] {
  return PROJECTS.filter((p) => p.tools.some((t) => slugifyTag(t) === slug));
}

/** A post matches when its own tag equals the tag, or it mentions the tag by name. */
export function postsForTag(slug: string, label: string): Post[] {
  const needle = label.toLowerCase();
  return POSTS.filter(
    (p) =>
      slugifyTag(p.tag) === slug ||
      `${p.title} ${p.teaser} ${p.body}`.toLowerCase().includes(needle),
  );
}
