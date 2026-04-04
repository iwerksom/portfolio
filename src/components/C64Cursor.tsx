'use client'

import { motion } from 'framer-motion'

/**
 * Classic Commodore 64 block cursor — a solid rectangle that blinks
 * on/off with a hard step (no fade), exactly like the original boot screen.
 */
export default function C64Cursor() {
  return (
    <motion.span
      aria-hidden="true"
      className="inline-block align-baseline ml-1 bg-c64"
      style={{
        width: '0.55em',
        height: '1em',
        verticalAlign: 'text-bottom',
      }}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{
        duration: 1,
        times: [0, 0.5, 0.5, 1],
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}
