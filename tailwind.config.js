/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        phone: { max: "600px" },
      },
    },
  },
  plugins: [],
};
