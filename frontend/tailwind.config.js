/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff7069',
        neutral: '#0A0A11',
        accent: '#6d4ff0',
      },
      textColor: {
        primary: '#ff7069',
        neutral: {
          DEFAULT: 'white',
          light: '#928a97',
        },
      },
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        heading: ['Spline Sans Mono', 'monospace'],
        body: ['Spline Sans Mono', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
    },
  },
  plugins: [],
}
