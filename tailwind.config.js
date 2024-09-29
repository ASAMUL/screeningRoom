/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        phone: { max: "600px" },
      },
      colors: {
        "card-light-gradient-start": "#e6f7ff",
        "card-light-gradient-middle": "#f0f9ff",
        "card-light-gradient-end": "#f8fcfe",
        "card-dark-gradient-start": "#1e2837",
        "card-dark-gradient-middle": "#23303f",
        "card-dark-gradient-end": "#2b3a4a",
        "light-bg": "#f8fcfb",
        "dark-bg": "#121a21",
      },
    },
  },
  plugins: [],
};
