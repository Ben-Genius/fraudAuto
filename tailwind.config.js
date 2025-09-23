/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          red: "#FC612D",
          yellow: "#FFCA42",
          black: "#000000",
          orange: "#FF9340",
          "warm-orange": "#FFB442",
        },
        secondary: {
          "dark-red": "#FF9340",
          orange: "#FB8C00",
          "light-yellow": "#FFB442",
          "bright-orange": "#FC612D",
          "golden-yellow": "#FFE136",
          peach: "#FFCE85",
        },
        theme: {
          "orange-1": "#FF9340",
          "yellow-1": "#FFCA42",
          "orange-2": "#FFB442",
          "red-orange": "#FC612D",
          "bright-yellow": "#FFE136",
          "light-peach": "#FFCE85",
        },
      },
    },
  },
  plugins: [],
};
