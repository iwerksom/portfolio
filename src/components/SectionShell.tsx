import type { ReactNode } from 'react'

interface SectionShellProps {
  id: string
  label: string
  children: ReactNode
}

export default function SectionShell({ id, label, children }: SectionShellProps) {
  return (
    <section
      id={id}
      className="border-b border-white/[0.08] grid grid-cols-1 md:grid-cols-[120px_1fr]"
    >
      {/* Vertical label — hidden on mobile */}
      <div className="hidden md:flex items-start justify-center px-5 py-10 border-r border-white/[0.08]">
        <span
          className="
            font-mono text-2xs tracking-[0.12em] uppercase text-ink-dim
            [writing-mode:vertical-rl] rotate-180
          "
        >
          {label}
        </span>
      </div>

      {/* Content */}
      <div className="px-6 md:px-10 py-10 md:py-12">{children}</div>
    </section>
  )
}
