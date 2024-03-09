/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translate(0, 12rem)", opacity: "0%" },
          "100%": { transform: "translate(0)", opacity: "100%" },
        },
      },
    },
  },
  plugins: [],
}

