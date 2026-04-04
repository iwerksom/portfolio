"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        sticky top-0 z-50
        flex items-center justify-between
        px-8 md:px-12 py-3
        border-b border-white/[0.08]
        bg-bg
      "
    >
      {/* Logo — pixel flower from /public/logo.png */}
      <motion.a
        href="#"
        aria-label="Jonas Schoustrup-Thomsen"
        whileHover={{ scale: 1.08, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="shrink-0 block"
      >
        <Image
          src="/logo.png"
          alt="Jonas Schoustrup-Thomsen logo"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
          priority
        />
      </motion.a>

      {/* Nav links — hidden on mobile */}
      <ul className="hidden md:flex gap-8 list-none">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="
                font-mono text-2xs tracking-[0.08em] lowercase
                text-ink-dim hover:text-c64
                transition-colors duration-200
              "
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Status */}
      <div className="flex items-center gap-2 font-mono text-2xs tracking-[0.06em] text-c64">
        <motion.span
          className="w-[7px] h-[7px] rounded-full bg-c64 shrink-0"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        working on 2d beat em up game with Unity
      </div>
    </motion.nav>
  );
}
