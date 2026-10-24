/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#131b2e',
          navy: '#1e293b',
          accent: '#0d9488',
          accentLight: '#14b8a6',
          coral: '#e06a55',
          warm: '#faf8f5',
          card: '#ffffff',
          border: '#e2e8f0',
        }
      }
    },
  },
  plugins: [],
}
