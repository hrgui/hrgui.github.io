module.exports = {
  content: ["./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
      },
      height: {
        hero: "32rem",
        "hero-sm": "42rem",
      },
      typography: theme => ({
        light: {
          css: {
            color: theme("colors.white"),
            h3: {
              color: theme("colors.white"),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
