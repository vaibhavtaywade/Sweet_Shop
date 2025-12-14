/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f472b6",
        secondary: "#8b5cf6",
        accent: "#fbbf24",
      },
    },
  },
  plugins: [],
}
