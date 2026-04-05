'use client'

import Link from 'next/link'
import { POSTS } from '@/lib/posts'

export default function Posts() {
  return (
    <section id="posts" className="border-t border-white/[0.08]">
      <div className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr]">
        {/* vertical label */}
        <div className="border-r border-white/[0.08] flex items-start justify-center pt-8 md:pt-12">
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-dim"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Posts
          </span>
        </div>

        {/* content */}
        <div className="py-8 md:py-12 px-6 md:px-10 space-y-px">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-4 border-b border-white/[0.06] hover:border-white/[0.14] transition-colors duration-200"
            >
              <span className="font-mono text-[10px] tracking-widest text-text-dim shrink-0 w-20">
                {post.date}
              </span>

              <span className="font-mono text-[10px] px-1.5 py-0.5 border border-white/10 text-text-dim shrink-0 self-start">
                {post.tag}
              </span>

              <span className="flex-1 text-sm text-text-mid group-hover:text-text transition-colors duration-200">
                {post.title}
              </span>

              <span className="font-mono text-xs text-c64/0 group-hover:text-c64 transition-all duration-200 shrink-0">
                read →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
