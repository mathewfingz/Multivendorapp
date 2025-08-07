/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: { manrope: ["Manrope", "sans-serif"] },
      colors: {
        nova: {
          background: "#FFFFFF",
          sidebar: "#EBEBEB",
          "sidebar-hover": "#FAFAFA",
          text: { primary: "#303030", secondary: "#70707B", muted: "#A9A9AF" },
          border: "#E8E8ED",
          chart: { primary: "#129AD7", grid: "#EEEEEF" },
        },
      },
      borderRadius: { 20: "20px" },
      boxShadow: { nova: "0 4px 8px 0 rgba(0,0,0,0.1)" },
    },
  },
};

