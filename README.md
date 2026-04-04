# Jonas Schoustrup-Thomsen — Portfolio

Next.js 14 · TypeScript · Tailwind CSS · Framer Motion

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Fonts**: IBM Plex Mono + IBM Plex Sans (Google Fonts)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/
│   ├── globals.css       # Base styles, scanline texture, scrollbar
│   ├── layout.tsx        # Root layout + metadata
│   └── page.tsx          # Page — assembles all sections
├── components/
│   ├── C64Cursor.tsx     # Commodore 64 block cursor blink
│   ├── FadeUp.tsx        # Framer Motion scroll-triggered fade-up
│   ├── Nav.tsx           # Sticky navigation
│   ├── Hero.tsx          # Hero section with stats panel
│   ├── SectionShell.tsx  # Reusable section wrapper (vertical label + content)
│   ├── AIFocus.tsx       # AI focus cards
│   ├── Experience.tsx    # Experience timeline
│   ├── Stack.tsx         # Tech stack chips
│   ├── Contact.tsx       # Contact grid
│   └── Footer.tsx        # Footer
└── lib/
    └── data.ts           # All site content in one place — edit here
```

## Customising content

All text content lives in `src/lib/data.ts`. Edit that file to update:
- Nav links
- Hero tags
- Stats panel
- AI focus cards
- Experience entries
- Stack chips
- Contact details

## Design tokens

C64-inspired color palette defined in `tailwind.config.ts`:

| Token | Value | Usage |
|---|---|---|
| `c64` | `#8B8FD4` | Primary accent (C64 light blue) |
| `c64-dim` | `#5A5EA0` | Muted accent |
| `c64-bright` | `#AAAEE8` | Bright accent / hover |
| `bg` | `#0d0e0c` | Page background |
| `bg-2` | `#111310` | Card background |
| `ink` | `#e2ddd5` | Primary text |
| `ink-mid` | `#a8a49c` | Secondary text |
| `ink-dim` | `#7a7870` | Muted text / labels |

## Deployment

```bash
npm run build
```

Deploy to [Vercel](https://vercel.com) by connecting your GitHub repo — zero config needed for Next.js.
