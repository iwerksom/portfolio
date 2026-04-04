export const NAV_LINKS = [
  { href: "#ai", label: "ai focus" },
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
    sub: "working hybrid",
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
