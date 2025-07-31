const defaultTheme = require('tailwindcss/defaultTheme')
const customTheme = require('./styles/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        lora: ['Playfair Display', 'serif'],
      },
      colors: customTheme.colors,
      opacity: customTheme.opacity,
      blur: customTheme.blur,
      boxShadow: customTheme.accents,
    },
  },
  plugins: [],
}
