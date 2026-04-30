import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08182B',
        sea: '#0A1E33',
        'sea-deep': '#050F1F',
        'cream-2': '#0E2740',
        sand: '#1A3550',
        terra: '#B0282E',
        'terra-deep': '#7A1A1F',
        cream: '#E8D9CC',
        'ink-soft': '#9DB0C4',
        olive: '#5C6B3F',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
} satisfies Config
