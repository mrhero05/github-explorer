/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: ['/.index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  daisyui: {
    themes: [
        "light",
        "dark"
    ]
  },
  theme: {
    colors: {
        '--ge-white-gray': '#F4F4F4',
        '--ge-icon-gray': '#a5a5a5',
        '--ge-gray': '#909090',
        '--ge-blue': '#2647FF',
        '--ge-white': '#ffffff',
        '--ge-black': '#000000',
    },
    extend: {
        fontFamily: {
            MontserratRegular: ['Montserrat-Regular', 'sans-serif'],
            MontserratMedium: ['Montserrat-Medium', 'sans-serif'],
            MontserratBold: ['Montserrat-Bold', 'sans-serif'],
            sans: ['Montserrat-Regular', 'sans-serif'],
        },
        gridTemplateColumns: {
            '70/30': '70% 28%'
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}
