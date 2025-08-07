/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        griffe: {
          navy: "#050A24",
          blue: "#1570EF",
          "blue-light": "#D1E9FF",
          white: "#FCFCFD",
          gray: {
            high: "#101828",
            DEFAULT: "#344054",
            low: "#98A2B3",
          },
          border: {
            primary: "#D1E9FF",
            DEFAULT: "#D0D5DD",
          },
        },
      },
      boxShadow: { griffe: "40px 40px 60px 0 rgba(228,230,234,0.74)" },
      borderWidth: { 3: "3px" },
    },
  },
};

