/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#363635',
        'accent': '#FA824C',
        'green-main': '#2A9134',
        'green-light': '#81E979',
      },
      backgroundImage: {
        'gradient': 'linear-gradient(87deg, rgba(42,145,52,1) 0%, rgba(176,254,118,1) 100%)'
      },
      fontFamily: {
        'nunito' : '"Nunito", sans-serif'
      },
      boxShadow: {
        'base': '0 0 15px rgba(0,0,0, .15)'
      },
      borderRadius: {
        '30': '30px'
      },
    },
  },
  plugins: [],
}

