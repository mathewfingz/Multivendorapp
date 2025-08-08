/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        design: {
          primary: "#1570EF",
          "primary-light": "#D1E9FF",
          surface: "#FFFFFF",
          foreground: {
            high: "#101828",
            DEFAULT: "#344054",
            low: "#98A2B3",
          },
          outline: { DEFAULT: "#D0D5DD" },
        },
      },
      borderRadius: { 20: "20px" },
      boxShadow: { curry: "40px 40px 60px 0 rgba(228,230,234,0.74)" },
    },
  },
};




