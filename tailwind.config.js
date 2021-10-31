module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: ["./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
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
