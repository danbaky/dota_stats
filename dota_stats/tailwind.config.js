/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors:{
        myPurp: "#646cff",
        myBlack: "#1a1a1a"
      }
    },
  },
  plugins: [],
}

