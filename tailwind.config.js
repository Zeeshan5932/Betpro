/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          light: "#2D4E69",
          dark: "#2D4E69",
          deeper: "#1f2947",
        },
        primary: "#478CD1",
        success: "#59bf64",
        accent: "#6ef7e7",
      },
    },
  },
  plugins: [],
};