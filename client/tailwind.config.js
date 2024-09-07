/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ce1212",
        mainText: "#6c6c6d",
        highlight: "#e5a0a0",
        primaryHover: "#d53030",
      },
      fontFamily: {
        body: ["Balsamiq Sans", "sans-serif"],
        header: ["Indie Flower", "Cursive"],
        about: ["Cursive", "Montez"],
        montez: ["Montez", "Cursive"],
      },
      animation: {
        "bounce-slow": "bounce-slow 3s linear infinite",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(-15px)" },
          "50%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
