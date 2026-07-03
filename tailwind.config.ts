import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent:         'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-gold':  'var(--accent-gold)',
        'accent-teal':  'var(--accent-teal)',

        'bg-primary':   'var(--bg-primary)',
        'bg-surface':   'var(--bg-surface)',
        'bg-surface-2': 'var(--bg-surface-2)',
        'bg-surface-3': 'var(--bg-surface-3)',

        'text-primary': 'var(--text-primary)',
        'text-muted':   'var(--text-muted)',
        'text-subtle':  'var(--text-subtle)',

        border:         'var(--border)',
        'border-hover': 'var(--border-hover)',
      },
      fontFamily: {
        display:   ['var(--font-oswald)', 'Oswald', 'Impact', 'Arial Narrow', 'sans-serif'],
        body:      ['var(--font-dm)', 'DM Sans', 'sans-serif'],
        condensed: ['var(--font-oswald)', 'Oswald', 'Impact', 'Arial Narrow', 'sans-serif'],
        bebas:     ['var(--font-bebas)', 'Bebas Neue', 'Impact', 'sans-serif'],
      },
      fontSize: {
        'hero-sm': 'clamp(3.5rem, 8vw, 6rem)',
        'hero-lg': 'clamp(5rem, 12vw, 10rem)',
        'section': 'clamp(2.5rem, 5vw, 4.5rem)',
      },
      letterSpacing: {
        wider: '0.08em',
        widest: '0.2em',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.italic-titles': {
          'font-style': 'italic',
          'display': 'inline-block',
          'transform': 'skewX(-8deg)',
        },
      })
    }),
  ],
}

export default config
