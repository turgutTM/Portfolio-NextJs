/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "move-up-down": "moveUpDown 5s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        moveUpDown: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
