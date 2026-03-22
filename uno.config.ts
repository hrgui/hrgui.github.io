import { defineConfig } from "unocss";
import {
  presetWind3,
  type Theme as PresetWind3Theme,
} from "@unocss/preset-wind3";
import presetTypography, {
  type TypographyTheme,
} from "@unocss/preset-typography";

type AppTheme = PresetWind3Theme & TypographyTheme;

export default defineConfig<AppTheme>({
  presets: [presetWind3({ dark: "class" }), presetTypography<AppTheme>()],
  rules: [
    [
      "bg-hologram-gradient",
      {
        "background-image": "linear-gradient(135deg, #8fd6ff 0%, #00bfff 100%)",
      },
    ],
    [
      "bg-bio-signal-gradient",
      {
        "background-image": "linear-gradient(135deg, #66dd8b 0%, #25a55a 100%)",
      },
    ],
    [
      "bg-alert-gradient",
      {
        "background-image": "linear-gradient(135deg, #ffbeb3 0%, #ff9585 100%)",
      },
    ],
  ],
  shortcuts: {
    "glass-panel":
      "bg-surface-container-low/72 backdrop-blur-xl border border-outline-variant/15 shadow-ambient",
    "glass-panel-strong":
      "bg-surface-container-high/78 backdrop-blur-2xl border border-outline-variant/15 shadow-floating",
    "control-panel":
      "bg-surface-container-lowest/84 backdrop-blur-2xl border border-outline-variant/15",
    "ghost-border": "border border-outline-variant/15",
    "cta-hologram":
      "bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-hologram hover:shadow-hologram-strong",
    "surface-module": "bg-surface-container-low text-on-surface",
    "surface-module-raised":
      "bg-surface-container-high text-on-surface shadow-ambient",
    "surface-module-highest":
      "bg-surface-container-highest text-on-surface shadow-floating",
    "label-mono": "font-mono text-label-sm uppercase tracking-[0.24em]",
  },
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
          font-family: "Inter", sans-serif;
          background-color: var(--color-background);
          color: var(--color-on-background);
        }

        iframe {
          border: none;
        }
        
        h1, h2, h3, h4, h5, h6 {
          padding: 0;
          margin: 0;
          font-size: inherit;
          font-weight: inherit;
          font-family: "Space Grotesk", sans-serif;
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

        code,
        kbd,
        pre,
        samp {
          font-family: "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }
      `,
    },
  ],
  theme: {
    colors: {
      background: "var(--color-background)",
      "on-background": "var(--color-on-background)",
      primary: "var(--color-primary)",
      "primary-container": "var(--color-primary-container)",
      "primary-fixed": "var(--color-primary-fixed)",
      "primary-fixed-dim": "var(--color-primary-fixed-dim)",
      "on-primary": "var(--color-on-primary)",
      "on-primary-container": "var(--color-on-primary-container)",
      "on-primary-fixed": "var(--color-on-primary-fixed)",
      "on-primary-fixed-variant": "var(--color-on-primary-fixed-variant)",
      secondary: "var(--color-secondary)",
      "secondary-container": "var(--color-secondary-container)",
      "secondary-fixed": "var(--color-secondary-fixed)",
      "secondary-fixed-dim": "var(--color-secondary-fixed-dim)",
      "on-secondary": "var(--color-on-secondary)",
      "on-secondary-container": "var(--color-on-secondary-container)",
      "on-secondary-fixed": "var(--color-on-secondary-fixed)",
      "on-secondary-fixed-variant": "var(--color-on-secondary-fixed-variant)",
      tertiary: "var(--color-tertiary)",
      "tertiary-container": "var(--color-tertiary-container)",
      "tertiary-fixed": "var(--color-tertiary-fixed)",
      "tertiary-fixed-dim": "var(--color-tertiary-fixed-dim)",
      "on-tertiary": "var(--color-on-tertiary)",
      "on-tertiary-container": "var(--color-on-tertiary-container)",
      "on-tertiary-fixed": "var(--color-on-tertiary-fixed)",
      "on-tertiary-fixed-variant": "var(--color-on-tertiary-fixed-variant)",
      error: "var(--color-error)",
      "error-container": "var(--color-error-container)",
      "on-error": "var(--color-on-error)",
      "on-error-container": "var(--color-on-error-container)",
      surface: "var(--color-surface)",
      "surface-dim": "var(--color-surface-dim)",
      "surface-bright": "var(--color-surface-bright)",
      "surface-container-lowest": "var(--color-surface-container-lowest)",
      "surface-container-low": "var(--color-surface-container-low)",
      "surface-container": "var(--color-surface-container)",
      "surface-container-high": "var(--color-surface-container-high)",
      "surface-container-highest": "var(--color-surface-container-highest)",
      "surface-variant": "var(--color-surface-variant)",
      outline: "var(--color-outline)",
      "outline-variant": "var(--color-outline-variant)",
      "surface-tint": "var(--color-surface-tint)",
      "inverse-primary": "var(--color-inverse-primary)",
      "inverse-surface": "var(--color-inverse-surface)",
      "inverse-on-surface": "var(--color-inverse-on-surface)",
      "on-surface": "var(--color-on-surface)",
      "on-surface-muted": "var(--color-on-surface-muted)",
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
      body: '"Inter", sans-serif',
      display: '"Space Grotesk", sans-serif',
      headline: '"Space Grotesk", sans-serif',
      mono: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      code: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSize: {
      "display-lg": [
        "clamp(3.5rem, 7vw, 6.5rem)",
        {
          "line-height": "0.95",
          "letter-spacing": "-0.04em",
          "font-weight": "500",
        },
      ],
      "headline-lg": [
        "clamp(2.25rem, 4vw, 3.5rem)",
        {
          "line-height": "1",
          "letter-spacing": "-0.03em",
          "font-weight": "500",
        },
      ],
      "title-md": [
        "1rem",
        {
          "line-height": "1.5rem",
          "letter-spacing": "0.01em",
          "font-weight": "500",
        },
      ],
      "label-md": [
        "0.8125rem",
        {
          "line-height": "1.125rem",
          "letter-spacing": "0.16em",
          "font-weight": "500",
        },
      ],
      "label-sm": [
        "0.75rem",
        {
          "line-height": "1rem",
          "letter-spacing": "0.24em",
          "font-weight": "500",
        },
      ],
    },
    boxShadow: {
      ambient:
        "0 0 24px rgba(229, 241, 242, 0.06), 0 0 40px rgba(143, 214, 255, 0.04)",
      floating:
        "0 0 32px rgba(229, 241, 242, 0.06), 0 0 56px rgba(143, 214, 255, 0.05)",
      hologram:
        "0 0 0 1px rgba(143, 214, 255, 0.14), 0 0 24px rgba(143, 214, 255, 0.28)",
      "hologram-strong":
        "0 0 0 1px rgba(143, 214, 255, 0.2), 0 0 32px rgba(143, 214, 255, 0.36)",
    },
  },
});
