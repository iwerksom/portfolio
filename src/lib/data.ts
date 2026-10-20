export const NAV_LINKS = [
  { href: "#ai", label: "ai focus" },
  { href: "#projects", label: "projects" },
  { href: "#posts", label: "posts" },
  { href: "#experience", label: "experience" },
  { href: "#stack", label: "stack" },
  { href: "#contact", label: "contact" },
] as const;

export const HERO_TAGS = [
  "react",
  "next.js",
  "react native",
  "AI platforms",
  "micro frontend",
  "devops",
] as const;

export const STATS = [
  { label: "Experience", value: "22y", sub: "since 2002", small: false },
  {
    label: "Current focus",
    value: "AI\nplatforms",
    sub: "solutions · interfaces",
    small: true,
  },
 /*  {
    label: "Currently at",
    value: "Raw Power\nLabs",
    sub: "frontend engineer",
    small: true,
  }, */
  {
    label: "Location",
    value: "Kastrup\nDenmark",
    sub: "open to remote",
    small: true,
  },
] as const;

export const AI_CARDS = [
  {
    num: "01",
    title: "AI platform engineering",
    desc: "Building the frontend layers of AI products — from chat interfaces and prompt UIs to tool dashboards and streaming response rendering.",
  },
  {
    num: "02",
    title: "AI solution development",
    desc: "Translating AI capabilities into production-ready user-facing features. Bridging the gap between model APIs and the people who use them.",
  },
  {
    num: "03",
    title: "Micro frontend architecture",
    desc: "Designing and delivering scalable MFE systems for global products. One year as delivery architect on a cross-team micro frontend + microservice platform.",
  },
  {
    num: "04",
    title: "Lead & team enablement",
    desc: "Thriving as lead developer — guiding teams with empathy, facilitating structured decisions and helping engineers grow in the right direction.",
  },
] as const;

export type ProjectType = "game" | "ai" | "web" | "creative";

export interface ProjectUpdate {
  date: string; // "October 2026" — shown as the timeline label
  title?: string;
  body: string; // markdown
}

export interface ProjectMedia {
  type: "image" | "video";
  src: string; // file under /public, e.g. "/projects/endbringers/lora-test.png"
  alt?: string;
  caption?: string;
  poster?: string; // video only: still frame shown before playing
}

export interface Project {
  slug: string;
  title: string;
  type: ProjectType;
  typeLabel: string;
  teaser: string;
  description: string;
  status: "in progress" | "released" | "concept";
  collaborators?: string[];
  tools: string[];
  links?: { label: string; href: string }[];
  media?: ProjectMedia[];
  /** Dated progress notes, oldest first. Shown as a timeline under the description. */
  updates?: ProjectUpdate[];
}

export const PROJECTS: Project[] = [
  {
    slug: "ghost-in-the-wreck",
    title: "Ghost in the Wreck",
    type: "game",
    typeLabel: "game · small model",
    teaser:
      "A browser game where a 2.9M-parameter transformer, trained from scratch, runs inside the page and drives the story. No server, no API, no network.",
    description:
      "Ghost in the Wreck is a single-file browser game, shipped on 28 August 2026. A tiny transformer trained from scratch ships inside the page as 4 MB of int8 weights, and all inference runs client-side in about 400 lines of dependency-free JavaScript. The model is a mechanic, not decoration: it generates crew logs and ship-mind dialogue, a voiceprint classifier decides which doors open, a gibberish detector filters input, and a semantic intent judge picks the ending. The world, the voices and the corpus are hand-authored, and every system is gated by tests: a format parser, a map lint, a PyTorch-to-JavaScript parity test, a calibration harness and an adversarial playtest squad. It was the pilot game for The Wreck Works.",
    status: "released",
    tools: ["JavaScript", "PyTorch", "Python", "Godot", "Playwright", "Claude"],
    links: [
      { label: "Play the game", href: "/play/ghost-in-the-wreck/index.html" },
      {
        label: "GitHub",
        href: "https://github.com/iwerksom/ghost-in-the-wreck",
      },
      { label: "Claude", href: "https://claude.ai" },
    ],
  },
  {
    slug: "wreck-works",
    title: "The Wreck Works",
    type: "ai",
    typeLabel: "AI · tooling",
    teaser:
      "An LLM game factory built on one idea: the quality gates matter more than the workers, whether the worker is an LLM or a human.",
    description:
      "The Wreck Works grew out of building Ghost in the Wreck. Every step of making a game is defined by its input and output artifacts, two recipes (one for an LLM worker, one for a human) and a quality gate. A step is done when its gate passes, whoever or whatever did the work. The same validators that caught LLM mistakes catch human mistakes identically, so choosing between LLM and manual work becomes a per-step convenience instead of a question of trust. A Next.js control panel shows the pipeline board and runs steps with the Vercel AI SDK and Claude, while a worker daemon executes the gates in each project repo. The factory knows nothing about any particular game: a new game is a new pipeline.json. The Margin is the second project built with it.",
    status: "in progress",
    tools: ["Next.js", "TypeScript", "Vercel AI SDK", "Claude", "Node.js", "Python"],
    links: [
      { label: "GitHub", href: "https://github.com/iwerksom/wreck-works" },
      { label: "Claude", href: "https://claude.ai" },
    ],
  },
  {
    slug: "the-margin",
    title: "The Margin",
    type: "game",
    typeLabel: "game · adventure",
    teaser:
      "A story-first point-and-click adventure where you step inside rewritten classics and restore them, with a small bundled language model kept strictly on a leash.",
    description:
      "The Margin is a story-first point-and-click adventure in the spirit of Forgotton Anne, built in Unity. A young man inherits his dead father's workshop and the Colophon, a machine that lets him step inside public-domain classics that two warring powers have secretly rewritten. He restores them one episode at a time. The canon is hand-written. A small pre-trained model ships in the build, but it is fenced to three non-canonical uses (a corrupted-text register, ambient chatter and an optional free-talk sandbox), each with a hand-written fallback so the player never depends on model output. The art is produced with a ComfyUI pipeline and Blender, and the project is run through The Wreck Works, with gates for the eval set, fallback path, size and latency budget, art, audio and an adversarial playtest.",
    status: "in progress",
    tools: ["Unity", "ComfyUI", "Blender", "Photoshop", "Claude"],
    links: [{ label: "Claude", href: "https://claude.ai" }],
  },
  {
    slug: "arnold",
    title: "Arnold",
    type: "ai",
    typeLabel: "AI · tooling",
    teaser:
      "A console for running Claude agents against any repo, with a durable record of what each run cost, what code it saw and what it produced.",
    description:
      "Arnold stands for Agent Runner, Notary, Orchestrator, Ledger, Dispatcher, and the five words are the five modules. It lists the agents a project declares in its .claude directory, lets you trigger one, streams the transcript live and keeps a record of every run. The Runner drives the Claude Agent SDK with a tool policy it cannot escape. The Notary records which code the run saw: base commit, branch, PR and ticket keys. The Orchestrator owns the registry and run tree, the Ledger enforces daily cost and token caps, and the Dispatcher validates arguments and refuses what it should. One contract has to survive every phase: the API enqueues, something else executes against a leased workspace, and runs are durable records with declared artifacts. Phase 0 is built and verified with a single Next.js app and SQLite. Later phases swap in a worker process, Postgres and a queue, and then sandboxed hosted deployment.",
    status: "in progress",
    tools: ["Claude Agent SDK", "Next.js", "TypeScript", "Prisma", "SQLite"],
    links: [
      { label: "GitHub", href: "https://github.com/iwerksom/agent-runner" },
      { label: "Claude", href: "https://claude.ai" },
    ],
  },
  {
    slug: "endbringers",
    title: "Endbringers",
    type: "game",
    typeLabel: "game",
    teaser:
      "2D side-scrolling beat 'em up built with Unity and AI tools — exploring what it means to direct a game rather than code it.",
    description:
      "Endbringers is a 2D side-scrolling beat 'em up game co-created with my son. The project explores how AI tools change the role of a game creator — shifting from programmer to creative director. Art, concepts and assets are generated and iterated using Scenario and Gemini, while the game logic is built in Unity. Claude is used throughout for design decisions, writing and problem solving.",
    status: "in progress",
    collaborators: ["Sebastian Schoustrup-Thomsen"],
    tools: ["Unity", "ComfyUI", "Blender", "Scenario", "Claude", "Gemini"],
    links: [
      { label: "Scenario", href: "https://app.scenario.com/" },
      { label: "Claude", href: "https://claude.ai" },
      { label: "Gemini", href: "https://gemini.google.com/app" },
    ],
    updates: [
      {
        date: "Before October 2026",
        title: "Paused",
        body: "Development stopped. With the tools we had, we could not get **consistent animations** or **side-on backgrounds** that looked like they belonged to the same game. Every generated frame was impressive on its own and wrong next to the one before it. A beat 'em up lives on that consistency, so rather than push on with a game that looked like a collage, we put it down.",
      },
      {
        date: "October 2026",
        title: "The challenge is solved",
        body: "We found a way through by building a pipeline instead of looking for a better prompt. **ComfyUI** generates the art, **Blender** gives us control over pose and perspective, and **Claude** drives the tools and keeps the process repeatable. Unity is back in the picture as the engine.",
      },
      {
        date: "October 2026",
        title: "Training a LoRA on backgrounds",
        body: "Right now we are selecting images to train a **LoRA** on the background style, so every location comes out in one consistent look. Choosing the training set turns out to be the real work: it is a curation job, and the taste has to come from us.",
      },
    ],
  },
  {
    slug: "brians-origin",
    title: "Brian's Origin",
    type: "creative",
    typeLabel: "comic",
    teaser:
      "A comic script and visual experiment — directing a cartoon as a creative director using AI image generation and storytelling tools.",
    description:
      "Brian's Origin is a comic script project co-created with my son. It explores the role of creative director in AI-assisted visual storytelling — using Scenario for image generation, Photoshop for compositing and refinement, and Claude and Gemini for script development and narrative direction. The question at the heart of the project: how much of the creative vision belongs to the director, and how much to the tools?",
    status: "in progress",
    collaborators: ["Sebastian Schoustrup-Thomsen"],
    tools: ["Photoshop", "Scenario", "Claude", "Gemini"],
    links: [
      { label: "Scenario", href: "https://app.scenario.com/" },
      { label: "Claude", href: "https://claude.ai" },
      { label: "Gemini", href: "https://gemini.google.com/app" },
    ],
  },
  {
    slug: "c64-demo-1984",
    title: "Commodore 64 Demo — 1984",
    type: "ai",
    typeLabel: "AI · retro",
    teaser:
      "A C64 demo powered by a 2MB small language model running locally on a cartridge — making the demo dynamic with an SLM.",
    description:
      "This project explores whether a small language model (2MB) can run locally on a Commodore 64 via a cartridge, and if so, whether it can make a classic demo scene dynamic and responsive. Using Oscar 64 for development, Scenario for visual assets, and Claude and Gemini for research and design decisions, the project sits at the intersection of retro computing nostalgia and cutting-edge AI miniaturisation. A love letter to 1984 written in the language of 2025.",
    status: "concept",
    tools: ["Oscar 64", "Photoshop", "Scenario", "Claude", "Gemini"],
    links: [
      { label: "Claude", href: "https://claude.ai" },
      { label: "Gemini", href: "https://gemini.google.com/app" },
    ],
  },
  {
    slug: "game-over",
    title: "Game Over",
    type: "web",
    typeLabel: "interactive · podcast",
    teaser:
      "A multi-platform autofiction story combining podcast, interactive animations and generational narrative — for the generation born in 1975.",
    description:
      "Game Over is a multi-platform storytelling project combining podcast episodes, interactive web animations and AI-generated visuals. The story is autofiction — a generational narrative about the people born in 1975, who grew up alongside the personal computer, the internet and now AI. It asks what it means to have lived through every major technological shift of the last 50 years. The project uses Scenario for visual world-building, Claude and Gemini for writing and narrative structure.",
    status: "concept",
    tools: ["Scenario", "Claude", "Gemini"],
    links: [
      { label: "Claude", href: "https://claude.ai" },
      { label: "Gemini", href: "https://gemini.google.com/app" },
    ],
  },
];

export const EXPERIENCE = [
  {
    years: "2024 – 2026",
    company: "Raw Power Labs",
    role: "// frontend engineer",
    desc: "Frontend engineering with a focus on AI-powered products and platforms. Copenhagen metropolitan area.",
  },
  {
    years: "2024",
    company: "AO Johansen",
    role: "// app developer · React Native",
    desc: "Developed and maintained the company's React Native app for iOS and Android. Testing pipeline and app store publishing.",
  },
  {
    years: "2022 – 2023",
    company: "Schultz A/S",
    role: "// senior software developer",
    desc: "Delivery architect on a micro frontend and microservice architecture for a global company's internal coworker app.",
  },
  {
    years: "2017 – 2022",
    company: "Capgemini Danmark",
    role: "// senior consultant · lead frontend",
    desc: "Lead frontend developer for large enterprise clients. Bridging business requirements and technical implementation. Designed solution architecture for agile teams.",
  },
  {
    years: "2014 – 2016",
    company: "Politiken",
    role: "// web developer",
    desc: "Development and maintenance of politiken.dk including a personalized content project and full redesign.",
  },
  {
    years: "2007 – 2012",
    company: "Iwerksom",
    role: "// founder · independent",
    desc: "Own consultancy. Web development, e-commerce, and bespoke web solutions for clients.",
  },
] as const;

export const STACK_PRIMARY = [
  "React",
  "Next.js",
  "React Native",
  "TypeScript",
  "AI APIs",
] as const;

export const STACK_SECONDARY = [
  "Micro frontends",
  "Node.js",
  "Tailwind CSS",
  "DevOps",
  "Microservices",
  "REST / GraphQL",
  "iOS / Android publishing",
  "Vite",
  "Git",
  "Agile / Scrum",
  "Solution architecture",
  "HTML / CSS",
  "PHP / MySQL",
] as const;

export const CONTACT = [
  {
    label: "Email",
    value: "jonas@schoustrup-thomsen.dk",
    href: "mailto:jonas@schoustrup-thomsen.dk",
  },
  {
    label: "LinkedIn",
    value: "jonasschoustrupthomsen",
    href: "https://www.linkedin.com/in/jonasschoustrupthomsen",
  },
  {
    label: "Personal site",
    value: "schoustrup-thomsen.dk",
    href: "https://www.schoustrup-thomsen.dk",
  },
  { label: "Location", value: "Kastrup, Copenhagen DK", href: null },
] as const;
