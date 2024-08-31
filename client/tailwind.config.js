/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        dark_red: "#9e0000",
        card_red: "#270000",
        dark_opacity: "rgba(0, 0, 0, 0.35)",
        white_opacity: "rgba(255, 255, 255, 0.35)",
        almost_black: '#0a0a0a',
        gray: "#888",
        light_red: "#f50000",
        white: "#ffffff",
        footer: "#0f0f0f",
        ligt_blue: '#c4ffff',
        blue: '#016fff',
        gold: '#efc95e'
      },
      fontFamily: {
        barlow_condensed: ["Barlow Condensed", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        montserrat: ['Montserrat', "sans-serif"]
      },
      gradients: {
        blue_gradient: "linear-gradient(89.97deg, #fff 1.84%, #fff 72.67%)",
        red_gradient: "linear-gradient(103.22deg, #f50000 -13.86%, #700d00 99.55%)"
      }
    },
    screens: {
      xxs: "280px",
      xs: "480px",
      ss: "580px",
      sm: "768px",
      md: "1060px",
      lg: "1440px",
      xl: "1700px",
    },
  },
  plugins: [],
}

