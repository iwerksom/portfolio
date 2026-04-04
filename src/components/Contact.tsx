'use client'

import SectionShell from '@/components/SectionShell'
import FadeUp from '@/components/FadeUp'
import { CONTACT } from '@/lib/data'

export default function Contact() {
  return (
    <SectionShell id="contact" label="Contact">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {CONTACT.map((item, i) => (
          <FadeUp key={item.label} delay={i * 0.07}>
            <div>
              <p className="font-mono text-2xs tracking-[0.1em] uppercase text-ink-dim mb-1">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="font-mono text-xs text-c64 hover:text-c64-bright transition-colors duration-200"
                >
                  {item.value}
                </a>
              ) : (
                <span className="font-mono text-xs text-c64">{item.value}</span>
              )}
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionShell>
  )
}
