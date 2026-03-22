import { defineConfig } from "unocss";
import { presetWind3 } from "@unocss/preset-wind3";
import presetTypography from "@unocss/preset-typography";

export default defineConfig({
  dark: "class",
  presets: [presetWind3(), presetTypography()],
  preflights: [
    {
      getCSS: () => `
        *,
        *::before,
        *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          line-height: 1.5;
          -webkit-text-size-adjust: 100%;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: system-ui, -apple-system, sans-serif;
        }

        iframe {
          border: none;
        }
        
        h1, h2, h3, h4, h5, h6 {
          padding: 0;
          margin: 0;
          font-size: inherit;
          font-weight: inherit;
        }
        
        p {
          margin: 0;
        }
        
        ol, ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        button, input, optgroup, select, textarea {
          font-family: inherit;
          font-size: 100%;
          line-height: 1.15;
          margin: 0;
        }
        
        button {
          background-color: transparent;
          border: 0;
          padding: 0;
          cursor: pointer;
        }
        
        input {
          background-color: transparent;
          border: 0;
          padding: 0;
          margin: 0;
        }
        
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
        
        td, th {
          padding: 0;
        }
        
        img, svg, video, canvas, audio, iframe, embed, object {
          display: block;
          vertical-align: middle;
          max-width: 100%;
        }
        
        a {
          color: inherit;
          text-decoration: inherit;
        }
      `,
    },
  ],
  theme: {
    colors: {
      gray: {
        50: "#f7f7f8",
        100: "#f1f1f2",
        200: "#e5e4e6",
        300: "#d0cfd2",
        400: "#b8b7ba",
        500: "#99989c",
        600: "#807f83",
        700: "#6a696d",
        800: "#59585c",
        900: "#4e4c4f",
      },
      malibu: {
        50: "#f0faff",
        100: "#e1f4fd",
        200: "#bceafb",
        300: "#8cdef9",
        400: "#3dc9f3",
        500: "#14b3e3",
        600: "#0890c1",
        700: "#07739d",
        800: "#0b6181",
        900: "#0f506b",
      },
      orchid: {
        50: "#fdf6fd",
        100: "#faecfb",
        200: "#f4d8f6",
        300: "#efb8ef",
        400: "#e48ee3",
        500: "#d873d7",
        600: "#b742b4",
        700: "#973492",
        800: "#7c2c77",
        900: "#662960",
      },
      dolly: {
        50: "#fcfee8",
        100: "#fbffc2",
        200: "#faff83",
        300: "#ffff45",
        400: "#fcf313",
        500: "#ecd906",
        600: "#ccac02",
        700: "#a27b06",
        800: "#86600d",
        900: "#724f11",
      },
      saltpan: {
        50: "#f0f6ef",
        100: "#e7f2e6",
        200: "#d0e4ce",
        300: "#abcea7",
        400: "#7daf79",
        500: "#5b9156",
        600: "#477643",
        700: "#3a5e37",
        800: "#314c2f",
        900: "#293f28",
      },
    },
    fontFamily: {
      sans: '"Inter", sans-serif',
      inter: '"Inter", sans-serif',
    },
  },
});
