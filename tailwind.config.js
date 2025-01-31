/** @type {import('tailwindcss').Config} */
export default {
  content: ['/.index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
        '--ge-white-gray': '#F4F4F4',
        '--ge-white': '#ffffff',
    },
    extend: {
        fontFamily: {
            sans: ['Poppins', 'sans-serif']
        },
        gridTemplateColumns: {
            '70/30': '70% 28%'
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
