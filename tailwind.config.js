/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
        fadeSlideIn: {
          "0%": { opacity: "0%", transform: "translate(0, 5rem)" },
          "100%": { opacity: "100%", transform: "0" },
        },
      },
    },
  },
  plugins: [],
}

