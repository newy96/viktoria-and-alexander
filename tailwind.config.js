export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        wine: {
          950: "#16040a",
          900: "#2a070f",
          800: "#420b16",
          700: "#5c1020",
          600: "#7a1729",
        },
        gold: {
          DEFAULT: "#c9a86a",
          light: "#e8d3a2",
          dark: "#8f6d34",
        },
        cream: {
          DEFAULT: "#f4ecdc",
          dark: "#e3d5b8",
        },
        ink: "#5b0f1c",
      },
      fontFamily: {
        script: ['"Great Vibes"', "cursive"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        display: ['"Playfair Display"', "Georgia", "serif"],
        news: ['"Old Standard TT"', "Georgia", "serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
