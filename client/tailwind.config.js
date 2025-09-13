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
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-down": "slide-down 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(-15px)" },
          "50%": { transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
