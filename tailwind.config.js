/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        gradient: {
          from: "#FF8C00",
          to: "#FFA300",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        lthin: ["Lato-Thin", "sans-serif"],
        llight: ["Lato-Light", "sans-serif"],
        lregular: ["Lato-Regular", "sans-serif"],
        litalic: ["Lato-Italic", "sans-serif"],
        lbold: ["Lato-Bold", "sans-serif"],
        lblack: ["Lato-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};
