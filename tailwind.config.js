/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Палитра Elsa-Hotel: глубокая ночь + золото + изумруд (с лого)
        ink: {
          950: '#0a0d12', // глубокий фон (Telegram dark)
          900: '#11151c',
          800: '#171c25',
          700: '#1f2531',
          600: '#2a3140',
          500: '#3a4254',
        },
        gold: {
          50: '#fdf8e9',
          100: '#f9eec3',
          200: '#f0dc8a',
          300: '#e6c558',
          400: '#d4af37', // основной золотой
          500: '#b8932a',
          600: '#937321',
        },
        emerald_h: {
          400: '#3a7a4f',
          500: '#2d5e3e',
          600: '#234c31',
          700: '#1a3a25',
        },
        cream: '#f5ecd6',
      },
      fontFamily: {
        // Display — высокий, изящный (Cormorant Garamond)
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        // Body — современный, нейтральный (Manrope)
        body: ['Manrope', 'system-ui', 'sans-serif'],
        // Mono для кодов/ID
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'gold-glow': '0 0 0 1px rgba(212, 175, 55, 0.3), 0 8px 24px -8px rgba(212, 175, 55, 0.4)',
        'inner-line': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.04)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #b8932a 50%, #d4af37 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
