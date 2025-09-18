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
          red: '#E53935',
          yellow: '#FDD835',
          black: '#000000',
        },
        secondary: {
          'dark-red': '#C62828',
          orange: '#FB8C00',
          'light-yellow': '#FFF176',
        }
      }
    },
  },
  plugins: [],
}
