/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          light: '#263957',
          dark: '#17213d',
          deeper: '#1f2947',
        },
        primary: '#6683d7',
        success: '#59bf64',
        accent: '#6ef7e7',
      },
    },
  },
  plugins: [],
}
