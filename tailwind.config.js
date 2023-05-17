/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
        '30': 'repeat(30, minmax(0, 1fr))',
        '40': 'repeat(40, minmax(0, 1fr))',
        '41': 'repeat(41, minmax(0, 1fr))',
        '50': 'repeat(50, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
