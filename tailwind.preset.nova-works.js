/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        dashboard: {
          bg: "hsl(0, 0%, 97.6%)",
          card: "hsl(0, 0%, 100%)",
          text: "hsl(213, 11%, 14%)",
          "text-muted": "hsl(0, 0%, 28%)",
          border: "hsl(0, 0%, 85%)",
          success: "hsl(145, 63%, 27%)",
          danger: "hsl(4, 90%, 25%)",
        },
      },
      borderRadius: { '2xl': '1rem', '3xl': '1.5rem' },
      spacing: { '2': '0.5rem', '3': '0.75rem', '4': '1rem' },
    },
  },
};





