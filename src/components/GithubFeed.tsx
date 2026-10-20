'use client'

import { useEffect, useState } from 'react'
import type { GithubItem } from '@/app/api/github/route'

/**
 * GithubFeed
 *
 * Fetches /api/github and renders a compact list of recent
 * releases and commits across your repos.
 *
 * Drop this into a section of your page, e.g. below Projects:
 *   import GithubFeed from '@/components/GithubFeed'
 *   <GithubFeed />
 *
 * Or use it inside an existing section shell by importing and
 * dropping it wherever makes sense in your layout.
 */

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export default function GithubFeed() {
  const [items, setItems] = useState<GithubItem[]>([])
  const [loading, setLoading] = useState(true)
  const [note, setNote] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items ?? [])
        setNote(data.note ?? null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="border-t border-white/[0.08]">
        <div className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr]">
          <div className="border-r border-white/[0.08] flex items-start justify-center pt-8">
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-dim"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Shipped
            </span>
          </div>
          <div className="py-8 px-6 md:px-10">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-white/5 rounded animate-pulse" style={{ width: `${60 + i * 10}%` }} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (note || items.length === 0) {
    return (
      <section className="border-t border-white/[0.08]">
        <div className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr]">
          <div className="border-r border-white/[0.08] flex items-start justify-center pt-8">
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-dim"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Shipped
            </span>
          </div>
          <div className="py-8 px-6 md:px-10">
            <p className="font-mono text-[10px] text-ink-dim">
              {note ?? '// no releases found — add repos to /api/github/route.ts'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="shipped" className="border-t border-white/[0.08]">
      <div className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr]">
        <div className="border-r border-white/[0.08] flex items-start justify-center pt-8 md:pt-12">
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-dim"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Shipped
          </span>
        </div>

        <div className="py-8 md:py-12 px-6 md:px-10 space-y-px">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-white/[0.06] hover:border-white/[0.14] transition-colors duration-200"
            >
              <span className="font-mono text-[10px] tracking-widest text-ink-dim shrink-0 w-20">
                {timeAgo(item.date)}
              </span>

              <span
                className={`font-mono text-[10px] px-1.5 py-0.5 border shrink-0 self-start ${
                  item.type === 'release'
                    ? 'border-c64/40 text-c64'
                    : 'border-white/10 text-ink-dim'
                }`}
              >
                {item.type === 'release' ? item.tag ?? 'release' : item.repo}
              </span>

              <span className="flex-1 text-sm text-ink-mid group-hover:text-ink transition-colors duration-200 font-mono">
                {item.title}
              </span>

              <span className="font-mono text-xs text-c64/0 group-hover:text-c64 transition-all duration-200 shrink-0">
                view ↗
              </span>
            </a>
          ))}

          <p className="font-mono text-[10px] text-ink-dim pt-4">
            // live from github
          </p>
        </div>
      </div>
    </section>
  )
}
