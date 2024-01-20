const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1248px'
      }
    },
    extend: {
      colors: {
        border: '#D3D3D3',
        primary: '#000',
        secondary: '#828282',
        background: '#fff'
      }
    }
  },
  plugins: []
}
