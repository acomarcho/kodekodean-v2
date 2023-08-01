/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
      colors: {
        black: '#121212',
        cyan: '#3DEFE9',
        green: '#6BD968',
        yellow: '#FECC1B',
        red: '#F44250',
        purple: '#D83BD2',
        lightgray: '#C8C8C8',
        darkgray: '#383838',
        primary: '#3992FF',
        primaryhover: '#1B6EF5',
        white: '#FFFFFF',
      }
    },
  },
  plugins: [],
}
