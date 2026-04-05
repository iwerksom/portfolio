"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project, ProjectType } from "@/lib/data";
import Prose from "./Prose";

const TYPE_STYLES: Record<ProjectType, string> = {
  game: "border-c64-dim text-c64",
  ai: "border-[#5DCAA5] text-[#5DCAA5]",
  web: "border-ink-dim text-ink-dim",
  creative: "border-[#D4537E] text-[#D4537E]",
};

const STATUS_STYLES = {
  "in progress": "text-c64-dim",
  released: "text-[#5DCAA5]",
  concept: "text-ink-dim",
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
});

interface Props {
  project: Project;
}

export default function ProjectDetail({ project }: Props) {
  return (
    <div className="min-h-screen bg-bg text-ink font-sans">
      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
        }}
      />

      {/* Nav bar */}
      <motion.nav
        {...fadeUp(0)}
        className="sticky top-0 z-40 flex items-center justify-between px-8 md:px-12 py-4 border-b border-white/[0.08] bg-bg"
      >
        <Link
          href="/"
          className="flex items-center gap-3 font-mono text-2xs tracking-[0.08em] text-ink-dim hover:text-c64 transition-colors duration-200"
        >
          <span>←</span>
          <span>back</span>
        </Link>

        <Link href="/" aria-label="Home">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
        </Link>
      </motion.nav>

      <div className="max-w-3xl mx-auto px-8 md:px-12 py-16">
        {/* Type + status */}
        <motion.div {...fadeUp(0.05)} className="flex items-center gap-4 mb-6">
          <span
            className={`font-mono text-2xs tracking-[0.1em] uppercase border px-2 py-[3px] ${TYPE_STYLES[project.type]}`}
          >
            {project.typeLabel}
          </span>
          <span
            className={`font-mono text-2xs tracking-[0.06em] ${STATUS_STYLES[project.status]}`}
          >
            {project.status}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-mono font-light text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-ink mb-6"
        >
          {project.title}
        </motion.h1>

        {/* Teaser */}
        <motion.p
          {...fadeUp(0.15)}
          className="font-mono text-xs text-c64 leading-[1.7] mb-10 border-l-2 border-c64-dim pl-4"
        >
          {project.teaser}
        </motion.p>

        {/* Description */}
        <motion.div {...fadeUp(0.2)} className="mb-12">
          <Prose markdown={project.description} />
        </motion.div>

        {/* Divider */}
        <motion.div
          {...fadeUp(0.25)}
          className="border-t border-white/[0.08] mb-10"
        />

        {/* Meta grid */}
        <motion.div
          {...fadeUp(0.3)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12"
        >
          {/* Tools */}
          <div>
            <p className="font-mono text-2xs tracking-[0.1em] uppercase text-ink-dim mb-3">
              tools & tech
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-2xs px-3 py-1 border border-c64-dim text-c64 bg-c64/[0.06]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Collaborators */}
          {project.collaborators && (
            <div>
              <p className="font-mono text-2xs tracking-[0.1em] uppercase text-ink-dim mb-3">
                collaborators
              </p>
              <div className="flex flex-col gap-1">
                {project.collaborators.map((c) => (
                  <span key={c} className="font-mono text-xs text-ink-mid">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Image placeholder slot */}
        <motion.div {...fadeUp(0.35)} className="mb-12">
          <p className="font-mono text-2xs tracking-[0.1em] uppercase text-ink-dim mb-3">
            images & media
          </p>
          <div className="border border-dashed border-white/[0.14] rounded-none p-12 text-center">
            <p className="font-mono text-2xs text-ink-dim tracking-[0.06em]">
              // images & video coming soon
            </p>
          </div>
        </motion.div>

        {/* External links */}
        {project.links && project.links.length > 0 && (
          <motion.div {...fadeUp(0.4)}>
            <p className="font-mono text-2xs tracking-[0.1em] uppercase text-ink-dim mb-4">
              links & tools used
            </p>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs px-5 py-2 border border-white/[0.14] text-ink-dim hover:border-c64-dim hover:text-c64 transition-colors duration-200"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back link bottom */}
        <motion.div
          {...fadeUp(0.45)}
          className="mt-16 pt-8 border-t border-white/[0.08]"
        >
          <Link
            href="/"
            className="font-mono text-2xs tracking-[0.08em] text-ink-dim hover:text-c64 transition-colors duration-200 flex items-center gap-2"
          >
            <span>←</span>
            <span>back to portfolio</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
