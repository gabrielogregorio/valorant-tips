module.exports = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(0)' },
          '50%': { transform: 'rotate(-10deg) scale(1.2)' },
        },

        scale: {
          '0%, 100%': { transform: 'rotateX(1)' },
          '50%': { transform: 'scaleX(1.1)' },
        },
      },
      animation: {
        wiggle: 'wiggle 200ms ease-in-out',
        scale: 'scale 200ms ease-in-out',
      },

      zIndex: {
        modal: 50,
        modalMessage: 50,
        btnPost: 40,
      },
      maxWidth: {
        maxWidthDefault: '800px',
        maxWidthDefaultForm: '400px',
        maxWidthModal: '400px',
      },
      height: {
        maxHeightContent: '500px',
      },
      colors: {
        success: '#9df76f',
        primary: '#3386d3',
        secondary: '#d85f5f',
      },
      textColor: {
        skin: {
          'secondary-regular': '#d85f5f',
          'gray-800': '#2c2c2c',
          'gray-500': '#6c6c6c',
          'primary-light': '#3386d3',
          'gray-900': '#2d333b',
          white: '#ffffff',
        },
      },
      backgroundColor: {
        skin: {
          'gray-300': '#efefef',
          'gray-700': '#22272e',
          'primary-light': '#3386d3',
          white: '#ffffff',
          'gray-900': '#2d333b',
          black: '#111111',
          'secondary-light': '#cb4343',
        },
      },
      borderColor: {
        skin: {
          'primary-light': '#3386d3',
          'secondary-regular': '#d85f5f',
        },
      },
    },
  },
  plugins: [],
};
