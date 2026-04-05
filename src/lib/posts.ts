/**
 * posts.ts — all blog/post content lives here.
 *
 * To add a post:
 *   1. Add an entry to POSTS below.
 *   2. Write the body in markdown (supports ## headings, **bold**, _italic_, - lists, [links](url)).
 *   3. That's it — the route /posts/[slug] is generated automatically.
 */

export interface Post {
  slug: string;
  title: string;
  date: string; // "2024-04"  or  "April 2024"
  tag: string; // short label shown on the card: "essay" | "reflection" | "tutorial" | etc.
  teaser: string; // one-sentence summary shown on the listing card
  body: string; // full markdown content
}

export const POSTS: Post[] = [
  {
    slug: "frontend-24-years",
    title: "From tables to AI agents — 24 years of frontend",
    date: "April 2026",
    tag: "essay",
    teaser:
      "The story of how frontend went from designing layout with HTML tables to directing AI agents to write the code for you.",
    body: `
## 2001 — tables all the way down

When I started building websites in 2001, the word "frontend" barely existed.
We were webmasters. We sliced Photoshop files into GIFs and reassembled them inside \`<table>\` cells.
Nested tables, spacer GIFs, \`bgcolor\` attributes. The browser was a tyrant and we bowed to it.

Internet Explorer 6 was the law. If it worked in IE6, it shipped.
If it looked broken in Netscape 4, you noted it in the README and moved on.

## 2005 — the web standards revolution

Then a small group of designers started writing manifestos.
Zeldman. CSS Zen Garden. The Web Standards Project.
The argument was simple: _separate structure from presentation_.

I remember converting my first site from tables to CSS floats.
It took a week. It broke three times. It was the most satisfying thing I had done professionally.

## 2010 — jQuery and the illusion of interactivity

JavaScript had always been there, used mostly to validate forms and annoy users with popups.
jQuery changed that. Suddenly the DOM was something you could _talk to_.

\`$(document).ready()\` became the incantation that started every project.
Plugins for everything. Sliders, carousels, accordions — the skeuomorphic web in full bloom.

## 2015 — React and the component era

Facebook shipped React and quietly ended an era.
The mental model flipped: instead of a page with behaviour bolted on,
you had a tree of components, each owning its own state.

This was the moment frontend became genuinely complex engineering.
Build pipelines, module bundlers, transpilers, type systems.
The toolchain exploded. So did the job titles.

## 2020 — TypeScript, micro frontends, delivery architect

By the time I joined Capgemini and later Schultz, frontend had grown into distributed systems territory.

I spent a year as a delivery architect on a micro frontend and microservice platform
used by a global company's workforce. Module federation, shared design systems,
cross-team contracts, CI/CD pipelines. Less writing components, more drawing diagrams
and writing ADRs.

The craft was still there — but it lived inside a much larger machine.

## 2024 — the director phase

Something shifted again when the LLMs got good enough to write code.

At first I used them like a smarter autocomplete.
Then I started treating them like a junior developer I could pair-program with.
Then — working on projects like [Endbringers](/projects/endbringers) and [Game Over](/projects/game-over) —
I realised the role had changed again.

You are no longer always the person who writes the code.
You are the person who knows what to build, why, and whether what was built is correct.
You hold the taste. You direct the agent. You review the output.

## The through-line

The tools changed every five years. The discipline underneath did not.

Understanding how a browser renders a page.
Knowing when state belongs in the component or in the URL.
Being able to read a layout and know how to build it without fighting the cascade.
Having empathy for the person on the other side of the screen.

None of that was automated. All of it still matters.

24 years in, I am more interested in what comes next than I have ever been.
    `,
  },
];
