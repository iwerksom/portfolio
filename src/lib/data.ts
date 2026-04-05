import { s } from "framer-motion/client";

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
  {
    label: "Currently at",
    value: "Raw Power\nLabs",
    sub: "frontend engineer",
    small: true,
  },
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
}

export const PROJECTS: Project[] = [
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
    tools: ["Unity", "Scenario", "Claude", "Gemini"],
    links: [
      { label: "Scenario", href: "https://app.scenario.com/" },
      { label: "Claude", href: "https://claude.ai" },
      { label: "Gemini", href: "https://gemini.google.com/app" },
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
    years: "2024 – now",
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
