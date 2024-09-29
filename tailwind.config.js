export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1677ff',
          300: '#88d0ff',
          950: '#112a5a'
        },
        secondary: {
          DEFAULT: '#34792F',
          500: '#4aa344',
          700: '#30692c'
        },
        gray: {
          DEFAULT: '#909090',
          500: '#CBCBCB',
          text: '#444746'
        },
        red: {
          DEFAULT: '#ff4d4f'
        },
        green: {
          DEFAULT: '#52c41a'
        },
        yellow: {
          DEFAULT: '#faad14'
        },
        background: '#FAFAFA'
      },
      fontFamily: {
        openSans400: ['OpenSans400', 'sans-serif'],
        openSans500: ['OpenSans500', 'sans-serif'],
        openSans700: ['OpenSans700', 'sans-serif']
      }
    }
  },
  plugins: []
}
