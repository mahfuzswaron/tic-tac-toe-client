/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      primary: "#F2C94C",
      secondary: "#2F80ED ",
      error: "#EB5757",
      success: "#6FCF97 ",
      white: "#fff",
      darkGray: "#333333",
      semiBlack: "#18191A",
      dark_bg: "#1A1C1D",
      gray: "#F4F4F4",
      disabled: '#E0E0E0',
    },
    extend: {},
  },
  plugins: [],
}
