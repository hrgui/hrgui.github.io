module.exports = {
  content: ["./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        gray: {
          "50": "#f7f7f8",
          "100": "#f1f1f2",
          "200": "#e5e4e6",
          "300": "#d0cfd2",
          "400": "#b8b7ba",
          "500": "#99989c",
          "600": "#807f83",
          "700": "#6a696d",
          "800": "#59585c",
          "900": "#4e4c4f",
        },
        malibu: {
          "50": "#f0faff",
          "100": "#e1f4fd",
          "200": "#bceafb",
          "300": "#8cdef9",
          "400": "#3dc9f3",
          "500": "#14b3e3",
          "600": "#0890c1",
          "700": "#07739d",
          "800": "#0b6181",
          "900": "#0f506b",
        },
        orchid: {
          "50": "#fdf6fd",
          "100": "#faecfb",
          "200": "#f4d8f6",
          "300": "#efb8ef",
          "400": "#e48ee3",
          "500": "#d873d7",
          "600": "#b742b4",
          "700": "#973492",
          "800": "#7c2c77",
          "900": "#662960",
        },
        dolly: {
          "50": "#fcfee8",
          "100": "#fbffc2",
          "200": "#faff83",
          "300": "#ffff45",
          "400": "#fcf313",
          "500": "#ecd906",
          "600": "#ccac02",
          "700": "#a27b06",
          "800": "#86600d",
          "900": "#724f11",
        },
        saltpan: {
          "50": "#f0f6ef",
          "100": "#e7f2e6",
          "200": "#d0e4ce",
          "300": "#abcea7",
          "400": "#7daf79",
          "500": "#5b9156",
          "600": "#477643",
          "700": "#3a5e37",
          "800": "#314c2f",
          "900": "#293f28",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
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
      animation: {
        "fadeIn-1": "fadeIn 1s ease-in forwards",
        "fadeIn-1.25": "fadeIn 1.25s ease-in forwards",
        "fadeIn-1.5": "fadeIn 1.5s ease-in forwards",
        "fadeIn-1.75": "fadeIn 1.75s ease-in forwards",
        "fadeIn-2": "fadeIn 2s ease-in forwards",
        "fadeIn-3": "fadeIn 3s ease-in forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
