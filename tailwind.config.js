/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    extend: {},
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
    }
  },
  plugins: [],
}

