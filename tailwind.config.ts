import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0d0e0c',
          2: '#111310',
          3: '#161814',
        },
        c64: {
          DEFAULT: '#8B8FD4',
          dim: '#5A5EA0',
          bright: '#AAAEE8',
        },
        ink: {
          DEFAULT: '#e2ddd5',
          mid: '#a8a49c',
          dim: '#7a7870',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          2: 'rgba(255,255,255,0.14)',
        },
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',   // 10px
        xs: '0.6875rem',     // 11px
        sm: '0.75rem',       // 12px
        base: '0.8125rem',   // 13px
        md: '0.9375rem',     // 15px
      },
    },
  },
  plugins: [],
}

export default config
