/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2858a3',
        secondary: '#ff4081',
        accent: '#C5A880',
        dark: '#4B4B4B',
        white: '#FFFFFF',
        light: '#F2E8DC',
        ash: '#EDEAE6',
        tblue: '#3E358F',
        grey: '#D4D4D8',
        body: '#716E80',
        bodyMain: '#FAF5F1',
        black: '#000000',
        gradientStart: '#D4B6A7',
        gradientEnd: '#8C7A6B'
      },
      
      keyframes: {
        fadeInLeft: {
          '0%': {
            transform: 'translateX(-20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        transitionProperty: {
          'opacity': 'opacity',
        },
        transitionDuration: {
          '300': '300ms',
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
        fadeInLeft: 'fadeInLeft 0.7s ease-out forwards',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus', 'group-hover'],
    },
  },
  plugins: [],
  important: true,
};
