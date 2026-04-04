'use client'

import SectionShell from '@/components/SectionShell'
import FadeUp from '@/components/FadeUp'
import { STACK_PRIMARY, STACK_SECONDARY } from '@/lib/data'

function Chip({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <span
      className={`
        font-mono text-2xs tracking-[0.04em] px-3 py-[5px]
        border transition-colors duration-200 cursor-default
        ${
          primary
            ? 'border-c64-dim text-c64 bg-c64/[0.07] hover:bg-c64/[0.14]'
            : 'border-white/[0.14] text-ink-mid hover:border-c64-dim hover:text-c64'
        }
      `}
    >
      {label}
    </span>
  )
}

export default function Stack() {
  return (
    <SectionShell id="stack" label="Stack">
      <FadeUp>
        <div className="flex flex-wrap gap-2">
          {STACK_PRIMARY.map((s) => (
            <Chip key={s} label={s} primary />
          ))}
          {STACK_SECONDARY.map((s) => (
            <Chip key={s} label={s} />
          ))}
        </div>
      </FadeUp>
    </SectionShell>
  )
}
