/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ['DM Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      }
    },
    variants: {
      extend: {
        backgroundColor: ['active'],
        fontSize: ['hover']
      }
    }
  },
  plugins: [require('prettier-plugin-tailwindcss')]
}
