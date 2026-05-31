/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          DEFAULT: '#0A1628',
          100: '#0F1D32',
          200: '#162440',
          300: '#1E3A5F',
          400: '#2A5080',
          500: '#3B82F6',
        },
        muted: {
          DEFAULT: '#4A6380',
          light: '#8BA3BE',
        },
        surface: '#F0F4F8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
