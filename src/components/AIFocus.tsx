'use client'

import SectionShell from '@/components/SectionShell'
import FadeUp from '@/components/FadeUp'
import { AI_CARDS } from '@/lib/data'

export default function AIFocus() {
  return (
    <SectionShell id="ai" label="AI focus">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08]">
        {AI_CARDS.map((card, i) => (
          <FadeUp key={card.num} delay={i * 0.08}>
            <div className="bg-bg-2 p-6 h-full">
              <p className="font-mono text-2xs tracking-[0.08em] text-c64-dim mb-3">
                {card.num}
              </p>
              <h3 className="font-mono text-xs font-medium text-ink mb-2">
                {card.title}
              </h3>
              <p className="text-xs text-ink-dim leading-[1.7]">{card.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionShell>
  )
}
