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
        background: '#fff',
        chatBg: '#252329',
        darkBg: '#120F13',
        darkerBg: '#0B090C',
        mBg: '#333333',
        mBlue: '#2D9CDB',
        mGray: '#828282',
        mGray2: '#BDBDBD',
        mGray3: '#3C393F',
        mWhite: '#E0E0E0'
      },
      borderRadius: {
        mSm: '8px',
        mL: '12px',
        mXl: '24px'
      },
      maxWidth: {
        mWidth: '475px',
        mWidthContainer: '1200px'
      },
      width: {
        mSidebar: '325px'
      },
      minWidth: {
        8: '2rem'
      }
    }
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    borderColor: ['responsive', 'hover', 'focus', 'focus-within']
  },
  plugins: []
}
