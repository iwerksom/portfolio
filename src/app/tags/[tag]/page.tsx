import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllTags,
  postsForTag,
  projectsForTag,
} from "@/lib/tags";

interface Props {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const found = getAllTags().find((t) => t.slug === tag);
  if (!found) return {};
  return { title: `${found.label} — Jonas Schoustrup-Thomsen` };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const found = getAllTags().find((t) => t.slug === tag);
  if (!found) notFound();

  const projects = projectsForTag(tag);
  const posts = postsForTag(tag, found.label);

  return (
    <div className="min-h-screen bg-bg text-ink font-sans">
      <div className="max-w-3xl mx-auto px-8 md:px-12 py-16">
        <Link
          href="/#projects"
          className="font-mono text-2xs tracking-[0.08em] text-ink-dim hover:text-c64 transition-colors duration-200 flex items-center gap-2 mb-12"
        >
          <span>←</span>
          <span>back to portfolio</span>
        </Link>

        <p className="font-mono text-2xs tracking-[0.1em] uppercase text-ink-dim mb-3">
          tagged
        </p>
        <h1 className="font-mono font-light text-[clamp(2rem,5vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-12">
          {found.label}
        </h1>

        {projects.length > 0 && (
          <section className="mb-12">
            <p className="font-mono text-2xs tracking-[0.1em] uppercase text-ink-dim mb-4">
              projects ({projects.length})
            </p>
            <ul className="border border-white/[0.08] divide-y divide-white/[0.08]">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group block bg-bg-2 p-5 hover:bg-bg-3 transition-colors duration-200"
                  >
                    <h2 className="font-mono text-sm text-ink group-hover:text-c64 transition-colors duration-200 mb-2">
                      {p.title}
                    </h2>
                    <p className="text-xs text-ink-dim leading-[1.7]">
                      {p.teaser}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {posts.length > 0 && (
          <section className="mb-12">
            <p className="font-mono text-2xs tracking-[0.1em] uppercase text-ink-dim mb-4">
              posts ({posts.length})
            </p>
            <ul className="border border-white/[0.08] divide-y divide-white/[0.08]">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/posts/${p.slug}`}
                    className="group block bg-bg-2 p-5 hover:bg-bg-3 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-2xs px-1.5 py-0.5 border border-white/10 text-ink-dim">
                        {p.tag}
                      </span>
                      <span className="font-mono text-2xs text-ink-dim">
                        {p.date}
                      </span>
                    </div>
                    <h2 className="font-mono text-sm text-ink group-hover:text-c64 transition-colors duration-200 mb-2">
                      {p.title}
                    </h2>
                    <p className="text-xs text-ink-dim leading-[1.7]">
                      {p.teaser}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {projects.length === 0 && posts.length === 0 && (
          <p className="font-mono text-2xs text-ink-dim">// nothing tagged yet</p>
        )}
      </div>
    </div>
  );
}
