/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2545',
          50: '#F3F6FB',
          100: '#E4EBF5',
          800: '#12315A',
          700: '#1B4079',
        },
        emerald: {
          DEFAULT: '#059669',
          600: '#059669',
        },
      },
      fontFamily: {
        sans: ['Hind Siliguri', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(11, 37, 69, 0.18)',
        card: '0 2px 14px rgba(15, 23, 42, 0.05)',
        float: '0 24px 60px -20px rgba(11, 37, 69, 0.35)',
      },
      maxWidth: {
        content: '1140px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
