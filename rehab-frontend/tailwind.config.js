/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // sage → muted slate-teal (primary — matches theme.jpg teal icons/buttons)
        sage: {
          50:  '#F2F8F8',
          100: '#D8EAEA',
          200: '#B5D8D8',
          300: '#96CCCC',
          400: '#7BBFBF',
          500: '#68ABAB',
          600: '#7BBFBF',
          700: '#5A9898',
          800: '#4A8080',
          900: '#1A3A3A',
        },
        // sand → soft lavender (secondary/decorative)
        sand: {
          50:  '#F8F4FF',
          100: '#EDE3FF',
          200: '#DAC8F8',
          300: '#C4ADEF',
          400: '#AE91E5',
          500: '#9876DB',
          600: '#815BC2',
          700: '#6A40A8',
          800: '#53278E',
          900: '#3C1070',
        },
        // warm → deep purple/plum (CTA — matches theme.jpg "Book Appointment" button)
        warm: {
          50:  '#F0EAF8',
          100: '#DDD0F0',
          200: '#B89FE0',
          300: '#9B7ACC',
          400: '#7B5BAD',
          500: '#614090',
          600: '#52347A',
          700: '#432868',
          800: '#341D54',
          900: '#231040',
        },
        // cream → very light blue-grey (matches theme.jpg page background)
        cream: '#EAF0F6',
        // charcoal → deep dark purple-navy (dark sections)
        charcoal: '#2D1B4A',
      },
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['Cairo', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(45,27,74,0.95) 0%, rgba(61,130,130,0.70) 100%)',
      },
      borderRadius: {
        xl:    '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        cozy:        '0 8px 32px rgba(123,191,191,0.18), 0 4px 16px rgba(152,118,219,0.10), 0 2px 8px rgba(0,0,0,0.05)',
        card:        '0 2px 20px rgba(45,27,74,0.07)',
        glow:        '0 0 40px rgba(123,191,191,0.28)',
        'glow-teal': '0 0 40px rgba(123,191,191,0.28)',
        'glow-lg':   '0 0 60px rgba(123,191,191,0.35)',
      },
      animation: {
        'orb-float-1':     'orbFloat1 14s ease-in-out infinite',
        'orb-float-2':     'orbFloat2 11s ease-in-out infinite',
        'orb-float-3':     'orbFloat3 16s ease-in-out infinite',
        'gradient-shift':  'gradientShift 8s ease infinite',
        'fade-up':         'fadeUp 0.7s ease forwards',
        'shimmer':         'shimmer 2.5s linear infinite',
        'spin-slow':       'spin 20s linear infinite',
        'pulse-soft':      'pulseSoft 3s ease-in-out infinite',
        'float':           'floatY 6s ease-in-out infinite',
      },
      keyframes: {
        orbFloat1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':       { transform: 'translate(40px, -35px) scale(1.06)' },
          '66%':       { transform: 'translate(-25px, 25px) scale(0.94)' },
        },
        orbFloat2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':       { transform: 'translate(-30px, 30px) scale(1.08)' },
          '66%':       { transform: 'translate(35px, -20px) scale(0.93)' },
        },
        orbFloat3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%':       { transform: 'translate(20px, -40px) scale(1.04)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':       { opacity: '0.7', transform: 'scale(0.97)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
