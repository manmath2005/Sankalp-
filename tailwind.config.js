/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#edf7ee',
          100: '#d8f3dc',
          200: '#b7e4c7',
          300: '#74c69d',
          400: '#52b788',
          500: '#40916c',
          600: '#2d6a4f',
          700: '#1b4332',
          800: '#143627',
          900: '#081c15',
          DEFAULT: '#1b4332',
        },
        sand: {
          50: '#fffef9',
          100: '#fefae0',
          200: '#faedcd',
          300: '#e9d8a6',
          400: '#dda15e',
          500: '#bc6c25',
          DEFAULT: '#fefae0',
        },
        sage: {
          50: '#f2fbf4',
          100: '#d8f3dc',
          200: '#b7e4c7',
          300: '#95d5b2',
          DEFAULT: '#d8f3dc',
        },
        charcoal: {
          50: '#f4f4f6',
          100: '#e5e6eb',
          200: '#c5c7d3',
          300: '#8d90a4',
          400: '#585b73',
          500: '#2b2d42',
          600: '#232536',
          700: '#1b1d2a',
          800: '#13141d',
          900: '#0b0c11',
          DEFAULT: '#2b2d42',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 67, 50, 0.06), 0 2px 6px -1px rgba(27, 67, 50, 0.04)',
        'float': '0 12px 32px -4px rgba(27, 67, 50, 0.1), 0 4px 12px -2px rgba(27, 67, 50, 0.06)',
        'float-lg': '0 24px 48px -8px rgba(27, 67, 50, 0.14), 0 8px 16px -4px rgba(27, 67, 50, 0.08)',
        'glow-forest': '0 0 30px -5px rgba(27, 67, 50, 0.4)',
        'glow-sage': '0 0 25px -4px rgba(216, 243, 220, 0.6)',
      }
    },
  },
  plugins: [],
}
