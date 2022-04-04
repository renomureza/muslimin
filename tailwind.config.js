const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#06f",
          darkest: "#005ce6",
        },
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        arabic: ["isep", "sans-serif"],
      },
    },
  },
  plugins: [],
};
