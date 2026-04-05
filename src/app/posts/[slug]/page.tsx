import { notFound } from 'next/navigation'
import Link from 'next/link'
import { POSTS } from '@/lib/posts'
import Prose from '@/components/Prose'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: `${post.title} — Jonas ST`, description: post.teaser }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">

        {/* back */}
        <Link
          href="/#posts"
          className="font-mono text-[10px] tracking-[0.08em] text-text-dim hover:text-c64 transition-colors duration-200 flex items-center gap-2 mb-12"
        >
          ← posts
        </Link>

        {/* header */}
        <header className="mb-12 pb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] px-1.5 py-0.5 border border-white/10 text-text-dim">
              {post.tag}
            </span>
            <span className="font-mono text-[10px] text-text-dim">{post.date}</span>
          </div>

          <h1 className="font-mono text-lg md:text-xl text-text leading-snug tracking-tight">
            {post.title}
          </h1>

          <p className="mt-3 text-sm text-text-dim leading-relaxed">
            {post.teaser}
          </p>
        </header>

        {/* body */}
        <Prose markdown={post.body} className="[&_p]:text-base [&_li]:text-base" />

        {/* footer */}
        <div className="mt-16 pt-8 border-t border-white/[0.08]">
          <Link
            href="/#posts"
            className="font-mono text-[10px] tracking-[0.08em] text-text-dim hover:text-c64 transition-colors duration-200 flex items-center gap-2"
          >
            ← back to posts
          </Link>
        </div>

      </div>
    </div>
  )
}
