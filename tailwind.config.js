const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#202741",
        secondary: "#02cae5",
        "dark-orange": "#ed4c5c",
        "light-orange": "#ee8848",
        "text-light": "#fbfcf5",
        text: "#f4f8f9",
        "text-dark": "#cbcac8",
      },
    },

    fontFamily: {
      poppins: ["Poppins", ...fontFamily.sans],
    },
  },
  plugins: [],
}
