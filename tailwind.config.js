/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sarabun", "sans-serif"], // ใช้ Sarabun เป็นฟอนต์หลัก
      },
      colors: {
        'yellow': '#FFF200',
        'yellow-dark': '#FFC600',
        'navy-blue': '#0C2F53',
        'gray': '#686868',
        'gray-light': '#B5B5B5',
        'gray-light2': '#D0D0D0',
        'gray-light3': '#EFEFEF',
        'black': '#000000',
        'white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
