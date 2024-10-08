/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 2s infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      fontFamily: {
        primary: ['"Poppins"', 'sans-serif'],
        lexend: ['"Lexend"', 'sans-serif'],
        urbanist: ['"Urbanist"', 'sans-serif']
      },
      borderRadius: {
        'button': '30px',
        'full': '9999px'
      },
      colors: {
        'primary': '#369AD9',
        'secondary': '#4C6173',
        'tertiary': '#3F8EBF',
        'background': '#364959',
        'alternate': '#F0F2F2',
        'textColor': '#ffffff',
        //Semantic colors
        'success': '#04a24c',
        'error': '#e21c3d',
        'warning': '#fcdc0c',
        'info': '#1c4494',
        'transparent': 'transparent',
        //utility colors
        'primaryText': '#ffffff',
        'secondaryText': '#8b97a2',
        'primaryBackground': '#364959',
        'secondaryBackground': '#4C6173',
      }
    },
  },
  plugins: [],
}

