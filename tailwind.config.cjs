/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Criamos uma "stack" de fontes. Se a primeira não existir, tenta a segunda, etc.
        serif: [ 'Didot', 'Garamond', 'Baskerville', '"Book Antiqua"', 'Lora'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}