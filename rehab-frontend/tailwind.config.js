/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50:  '#f4f7f4',
          100: '#e3ece3',
          200: '#c6d8c7',
          300: '#9bbf9d',
          400: '#6a9e6d',
          500: '#477e4b',
          600: '#35633a',
          700: '#2b502f',
          800: '#244027',
          900: '#1e3521',
        },
        sand: {
          50:  '#fdf8f2',
          100: '#f9ede0',
          200: '#f2d8bb',
          300: '#e9be8e',
          400: '#de9f5f',
          500: '#d4833a',
          600: '#c06b2c',
          700: '#9f5425',
          800: '#804324',
          900: '#683820',
        },
        warm: {
          50:  '#fdfaf7',
          100: '#faf3ea',
          200: '#f5e5d0',
          300: '#eed1ae',
          400: '#e5b683',
          500: '#da9558',
          600: '#cc7b3a',
          700: '#aa6230',
          800: '#89502b',
          900: '#704326',
        },
        cream: '#fdf8f2',
        charcoal: '#2d2d2d',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans:  ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(71,126,75,0.85) 0%, rgba(45,80,48,0.9) 100%)',
      },
      borderRadius: {
        xl:  '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        cozy: '0 4px 24px rgba(71,126,75,0.10), 0 1px 4px rgba(0,0,0,0.06)',
        card: '0 2px 16px rgba(0,0,0,0.07)',
      },
    },
  },
  plugins: [],
}
