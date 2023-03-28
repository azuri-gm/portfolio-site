/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1c2b35',
        'light-blue': '#1C2B35',
        'custom-grey': '#ECF8FF',
        'custom-green': '#B0FBBC',
        'darker-blue': '#111A20',
        'filler-blue': '#416883',
        'shade-blue': '#5e8ca7',
        'coral-blue': '#7AB6D9',
        'background-blue': '#1C2C35',
        'bright-lime': '#83F9A2',
      },
      dropShadow: {
        '3xl': '0px 0px 76px rgba(188, 251, 195, 0.3)',
      },
      textShadow: {
        custom: '0px 0px 76px rgba(188, 251, 195, 0.3)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#ECF8FF',
            h1: {
              color: '#ECF8FF',
            },
            h2: {
              color: '#ECF8FF',
            },
            h3: {
              color: '#ECF8FF',
            },
            h4: {
              color: '#ECF8FF',
            },
            h5: {
              color: '#ECF8FF',
            },
            a: {
              color: '#ECF8FF',
            },
            p: {
              color: '#ECF8FF',
            },
            strong: {
              color: '#ECF8FF',
            },
            code: {
              color: '#ECF8FF',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-textshadow'),
  ],
}
