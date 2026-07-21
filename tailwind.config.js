/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#4F46E5', 50: '#EEF2FF', 100: '#E0E7FF', 600: '#4338CA', 700: '#3730A3' },
        accent: '#F59E0B',
        dark: { DEFAULT: '#0F172A', 800: '#1E293B', 700: '#334155' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
