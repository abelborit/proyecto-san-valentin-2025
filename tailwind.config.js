/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['Montserrat', 'sans-serif'],
        cursive: ["Great Vibes", "cursive"],
        cursive1: ["Montserrat", "cursive"],
        script: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
