import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff8ed',
          100: '#ffefd4',
          200: '#ffda9a',
          300: '#ffc05e',
          400: '#ffa030',
          500: '#f97316',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#431a03',
        },
        forest: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        earth: {
          50:  '#faf6f0',
          100: '#f0e8db',
          200: '#ddd0be',
          300: '#c5b09a',
          400: '#a88d73',
          500: '#8b6f56',
          600: '#6d5340',
          700: '#573f30',
          800: '#3d2b1a',
          900: '#2d1f12',
          950: '#1a1008',
        },
        rust: {
          500: '#ef4444',
          600: '#c2410c',
          700: '#9a3412',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, rgba(29,20,10,0.85) 0%, rgba(45,31,18,0.70) 40%, rgba(180,83,9,0.35) 100%)',
        'card-overlay':
          'linear-gradient(to top, rgba(29,20,10,0.90) 0%, rgba(29,20,10,0.30) 60%, transparent 100%)',
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease-out forwards',
        'fade-in':   'fadeIn 0.4s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:    { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
      },
      boxShadow: {
        'card':   '0 2px 24px rgba(0,0,0,0.08)',
        'card-lg':'0 8px 48px rgba(0,0,0,0.14)',
        'glow':   '0 0 40px rgba(217,119,6,0.25)',
      },
    },
  },
  plugins: [],
}

export default config
