module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // Enable dark mode via class
  theme: {
    extend: {
      colors: {
        // Define any custom colors here if necessary
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
