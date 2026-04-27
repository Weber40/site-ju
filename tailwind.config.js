 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sugestão de cores para nutrição
        brand: {
          light: '#f0fdf4', // verde muito claro
          medium: '#22c55e', // verde base
          dark: '#166534', // verde escuro
        }
      }
    },
  },
  plugins: [],
}