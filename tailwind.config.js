/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#004E7C',
        accent: '#5C73F2',
        success: '#00C851',
        warning: '#FFB400',
        error: '#FF4444',
        info: '#33B5E5',
        surface: '#FFFFFF',
        background: '#F8F9FA',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}