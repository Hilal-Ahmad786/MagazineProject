import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#000000',
        yellow: {
          400: '#FFD700',
          500: '#FFA500',
        },
        gray: {
          800: '#1a1a1a',
          700: '#2a2a2a',
          600: '#3a3a3a',
          500: '#666666',
          400: '#999999',
          300: '#cccccc',
        },
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display': ['120px', { lineHeight: '0.9', fontWeight: '900' }],
        'h1': ['64px', { lineHeight: '1.1', fontWeight: '900' }],
        'h2': ['56px', { lineHeight: '1.1', fontWeight: '900' }],
        'h3': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'h4': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
      },
      animation: {
        'bounce-slow': 'bounce-slow 2s infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
