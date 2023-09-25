/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '23px 23px 45px #d9d9d9, -23px -23px 45px #ffffff'
      }
    },
  },
  plugins: [],
}