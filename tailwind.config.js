/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          forest: '#064e3b',
          green: '#065f46',
          DEFAULT: '#1a4731',
          hover: '#143625',
          light: '#10b981',
        },
        sage: {
          soft: '#f1f7f4',
          medium: '#d1e2d9',
        },
        accent: {
          DEFAULT: '#e28743',
          mint: '#d1fae5',
        },
        bg: {
          soft: '#f9fbf9',
        },
        text: {
          main: '#1f2937',
          muted: '#6b7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
