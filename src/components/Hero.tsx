"use client";

import { motion } from "framer-motion";
import C64Cursor from "@/components/C64Cursor";
import { HERO_TAGS, STATS } from "@/lib/data";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Hero() {
  return (
    <section
      className="
      grid grid-cols-1 md:grid-cols-[1fr_1px_320px] lg:grid-cols-[1fr_1px_360px]
      min-h-[calc(100vh-61px)]
      border-b border-white/[0.08]
    "
    >
      {/* ── Left ── */}
      <div className="flex flex-col justify-between gap-10 px-8 md:px-12 py-14 md:py-16">
        <div>
          {/* Eyebrow */}
          <motion.div
            {...fadeUp(0.1)}
            className="flex items-center gap-3 mb-7 font-mono text-2xs tracking-[0.12em] uppercase text-c64"
          >
            <span className="block w-6 h-px bg-c64 shrink-0" />
            Frontend Engineer · Copenhagen, DK
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.2)}
            className="
              font-mono font-light leading-[1.05] tracking-[-0.02em]
              text-[clamp(2.4rem,5vw,4rem)]
              text-ink mb-5
            "
          >
            Jonas
            <br />
            Schoustrup
            <br />
            <span className="text-c64">Thomsen</span>
            <C64Cursor />
          </motion.h1>

          {/* Role */}
          <motion.p
            {...fadeUp(0.3)}
            className="font-mono text-xs tracking-[0.02em] text-ink-mid mb-10"
          >
            **{" "}
            <span className="text-c64-bright font-medium">
              AI solutions &amp; platforms
            </span>
            {" · frontend engineering · React ecosystem"} **
          </motion.p>

          {/* Description */}
          <motion.p
            {...fadeUp(0.4)}
            className="text-md text-ink-mid leading-[1.75] max-w-xl mb-12"
          >
            24 years building for the web. Today I focus on AI-powered solutions
            and platforms — designing and engineering the interfaces,
            architectures and developer experiences that make AI products real
            and usable.
          </motion.p>

          {/* CTA */}
          <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-4">
            <a
              href="mailto:jonas@schoustrup-thomsen.dk"
              className="
                font-mono text-xs font-medium tracking-[0.06em]
                px-6 py-3
                bg-c64 text-[#0d0e40]
                hover:bg-c64-bright
                transition-colors duration-200
              "
            >
              get in touch →
            </a>
            <a
              href="https://www.linkedin.com/in/jonasschoustrupthomsen"
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-mono text-xs tracking-[0.06em]
                px-6 py-3
                border border-white/[0.14] text-ink-dim
                hover:border-c64-dim hover:text-c64
                transition-colors duration-200
              "
            >
              linkedin ↗
            </a>
          </motion.div>
        </div>

        {/* Tag pills */}
        <motion.div {...fadeUp(0.6)} className="flex flex-wrap gap-2">
          {HERO_TAGS.map((tag) => (
            <span
              key={tag}
              className="
                font-mono text-2xs tracking-[0.08em] lowercase
                px-[10px] py-1
                border border-white/[0.14] text-ink-dim
              "
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <div className="hidden md:block bg-white/[0.08]" />

      {/* ── Stats panel ── */}
      <div
        className="
        flex flex-col
        px-8 md:px-10 py-12
        border-t md:border-t-0 border-white/[0.08]
      "
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            {...fadeUp(0.15 + i * 0.1)}
            className="py-6 border-b border-white/[0.08] last:border-b-0"
          >
            <p className="font-mono text-2xs tracking-[0.1em] uppercase text-ink-dim mb-[6px]">
              {stat.label}
            </p>
            <p
              className={`font-mono font-light text-ink leading-[1.1] mb-1 whitespace-pre-line ${
                stat.small ? "text-lg" : "text-[2.25rem]"
              }`}
            >
              {stat.value.includes("y") && !stat.small ? (
                <>
                  24<span className="text-c64">y</span>
                </>
              ) : (
                stat.value
              )}
            </p>
            <p className="font-mono text-2xs text-c64-dim">{stat.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
