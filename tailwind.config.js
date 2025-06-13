/** @type {import('tailwindcss').Config} */
import tailwindcss from '@tailwindcss/vite'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#146c7b',
        secondary: '#1a6e7a',
      },
    },
  },
  plugins: [],
}