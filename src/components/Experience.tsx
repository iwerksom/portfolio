'use client'

import SectionShell from '@/components/SectionShell'
import FadeUp from '@/components/FadeUp'
import { EXPERIENCE } from '@/lib/data'

export default function Experience() {
  return (
    <SectionShell id="experience" label="Experience">
      <div className="flex flex-col">
        {EXPERIENCE.map((item, i) => (
          <FadeUp key={item.company} delay={i * 0.07}>
            <div className="
              grid grid-cols-[90px_1fr] gap-5
              py-5 border-b border-white/[0.08] last:border-b-0
            ">
              <p className="font-mono text-2xs text-ink-dim pt-[2px] leading-relaxed">
                {item.years}
              </p>
              <div>
                <p className="font-mono text-xs font-medium text-ink mb-[3px]">
                  {item.company}
                </p>
                <p className="font-mono text-2xs text-c64 mb-2">{item.role}</p>
                <p className="text-xs text-ink-dim leading-[1.7]">{item.desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionShell>
  )
}
