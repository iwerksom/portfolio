import { NextResponse } from 'next/server'

/**
 * GET /api/tagline
 *
 * Calls Claude with a short context about what Jonas is working on right now.
 * Returns a single sentence — refreshed on each page load.
 *
 * To update what the tagline is about, edit CURRENT_CONTEXT below.
 * Keep it to a few bullet points. Claude turns it into one sentence.
 *
 * The ANTHROPIC_API_KEY env var is read server-side only — never sent to the browser.
 */

const CURRENT_CONTEXT = `
Jonas Schoustrup-Thomsen is a frontend engineer at Raw Power Labs in Copenhagen.
He is currently:
- Building Endbringers, a 2D beat-em-up made together with his son: after a pause, a ComfyUI + Blender + Claude pipeline solved consistent animation and side-on backgrounds, and he is now training a LoRA on background art
- Making The Margin, a point-and-click adventure with a small language model bundled in the build and kept on a leash
- Building The Wreck Works, an LLM game factory where quality gates matter more than the workers
- Building Arnold, a console that runs Claude agents against any repo and keeps a ledger of cost and code
- Shipping Ghost in the Wreck, a browser game with a 2.9M-parameter transformer running inside the page
- Writing about 24 years of frontend, from HTML tables and Flash to directing AI agents
`

// One API call per hour at most, however many people load the site.
const CACHE_MS = 60 * 60 * 1000
const FALLBACK = 'Building things at the edge of what is possible'
let cached: { tagline: string; at: number } | null = null

const SYSTEM_PROMPT = `
You are a concise status generator for a developer portfolio.
Given a context about what the developer is currently working on,
generate exactly ONE short sentence (max 15 words) that captures
the most interesting or surprising thing they are doing right now.

Rules:
- Start with a present-tense verb (Building, Exploring, Teaching, Directing, Running...)
- Never mention the developer's name
- Write as the developer himself would, so say "my son", never "his son". Only mention the son as "together with my son", never as just "with my son" or "for my son"
- Never use the word "currently"
- Be specific — name the project or technology
- Sound human, not corporate
- Return only the sentence, no punctuation at the end, no quotes
`

export async function GET() {
  if (cached && Date.now() - cached.at < CACHE_MS) {
    return NextResponse.json({ tagline: cached.tagline })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    return NextResponse.json({ tagline: FALLBACK }, { status: 200 })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-5-5',
        // Generous: the model may spend tokens thinking before it writes the sentence.
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `Generate a tagline based on this context:\n${CURRENT_CONTEXT}`,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`)
    }

    const data = await response.json()
    const tagline = data.content?.find((b: { type: string }) => b.type === 'text')?.text?.trim() || FALLBACK
    cached = { tagline, at: Date.now() }

    return NextResponse.json({ tagline }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    console.error('[tagline] API call failed:', err)
    // Remember the failure for a few minutes so an outage is not retried per visitor.
    cached = { tagline: FALLBACK, at: Date.now() - CACHE_MS + 5 * 60 * 1000 }
    return NextResponse.json({ tagline: FALLBACK }, { status: 200 })
  }
}
