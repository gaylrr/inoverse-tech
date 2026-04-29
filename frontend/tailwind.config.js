/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amalfi:  "#1B2A4A",   // dark navy blue (navbar bg)
        citrus:  "#F5A623",   // orange/yellow (accent)
        breeze:  "#A8C0D6",   // light blue (nav link text)
        cream:   "#F9F9F7",   // off-white (page background)
      },
    },
  },
  plugins: [],
}