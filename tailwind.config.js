/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        fadeInSlow: 'fadeIn 1.5s ease-in-out',
        fadeInFast: "fadeIn 0.3s ease-in-out",
        slide: 'slide 10s linear infinite',
        wiggle: 'wiggle 0.3s ease-in-out',
        colour: 'colour 2s linear infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10%)' },
          '100%': { opacity: 1 },
        },
        slide: {
          '0%': { transform: 'translateX(-1276px)' },
          '100%': { transform: 'translateX(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '33%': { transform: 'rotate(-3deg)' },
          '66%': { transform: 'rotate(3deg)' },
        },
        colour: {
          "0%": { color: "red" },
          "50%": { color: "orange" },
          "100%": { color: "#FF4500" }
        }
      },
    },
  },
  plugins: [],
}