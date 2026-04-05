'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionShell from '@/components/SectionShell'
import FadeUp from '@/components/FadeUp'
import { PROJECTS, type ProjectType } from '@/lib/data'

const TYPE_STYLES: Record<ProjectType, string> = {
  game:     'border-c64-dim text-c64',
  ai:       'border-[#5DCAA5] text-[#5DCAA5]',
  web:      'border-ink-dim text-ink-dim',
  creative: 'border-[#D4537E] text-[#D4537E]',
}

const STATUS_STYLES = {
  'in progress': 'text-c64-dim',
  'released':    'text-[#5DCAA5]',
  'concept':     'text-ink-dim',
}

export default function Projects() {
  return (
    <SectionShell id="projects" label="Projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08]">
        {PROJECTS.map((project, i) => (
          <FadeUp key={project.slug} delay={i * 0.08}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block bg-bg-2 p-6 h-full hover:bg-bg-3 transition-colors duration-200"
            >
              {/* Top row: type tag + status */}
              <div className="flex items-center justify-between mb-4">
                <span className={`font-mono text-2xs tracking-[0.1em] uppercase border px-2 py-[3px] ${TYPE_STYLES[project.type]}`}>
                  {project.typeLabel}
                </span>
                <span className={`font-mono text-2xs tracking-[0.06em] ${STATUS_STYLES[project.status]}`}>
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-mono text-sm font-medium text-ink mb-3 group-hover:text-c64 transition-colors duration-200">
                {project.title}
              </h3>

              {/* Teaser */}
              <p className="text-xs text-ink-dim leading-[1.7] mb-5">
                {project.teaser}
              </p>

              {/* Tools */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-2xs px-2 py-[2px] border border-white/[0.08] text-ink-dim"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="flex items-center gap-2 font-mono text-2xs text-c64 group-hover:gap-3 transition-all duration-200">
                <span>view project</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </SectionShell>
  )
}
