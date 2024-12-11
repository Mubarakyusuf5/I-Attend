/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#F5F5F5',
        customGreen: '#81C784',
        customOrange: '#FF7043',
      },
    },
  },
  plugins: [],
}