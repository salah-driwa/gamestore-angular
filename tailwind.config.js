/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
   
    extend: {fontFamily: {
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
      ],
    }
    , colors: {
      'text': '#d6e8f5',
      'background': '#151515',
      'backgroundlight': ' #202020',
     
      'primary': '#acd1ec',
      'secondary': '#25066B',
      'accent': '#3991d0',
     },
  }
  },
  plugins: [],
}