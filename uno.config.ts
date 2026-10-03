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
    "label-mono": "font-mono text-label-sm uppercase tracking-[0.14em]",
    "hr-focus-ring":
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    btn: "inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md border border-solid border-transparent text-sm font-medium no-underline whitespace-nowrap cursor-pointer transition-colors duration-150 ease-out hr-focus-ring disabled:opacity-50 disabled:pointer-events-none",
    "btn-lg": "h-12 px-6 text-base",
    "btn-sm": "h-8 px-3 text-[13px]",
    "btn-primary": "btn bg-cta text-fg-on-emphasis hover:bg-cta-hover",
    "btn-secondary":
      "btn bg-transparent text-fg border-border-control hover:bg-surface-overlay hover:border-fg-subtle",
    "btn-accent": "btn bg-accent-emphasis text-on-accent hover:bg-accent",
    "btn-ghost": "btn bg-transparent text-fg hover:bg-surface-overlay",
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
          font-family: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
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
          font-family: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
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
          font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }
      `,
    },
  ],
  theme: {
    colors: {
      // hrgui v2 design-system tokens
      canvas: "rgb(var(--color-canvas-rgb) / <alpha-value>)",
      "canvas-inset": "rgb(var(--color-canvas-inset-rgb) / <alpha-value>)",
      "surface-raised": "rgb(var(--color-surface-raised-rgb) / <alpha-value>)",
      "surface-overlay":
        "rgb(var(--color-surface-overlay-rgb) / <alpha-value>)",
      fg: "rgb(var(--color-fg-rgb) / <alpha-value>)",
      "fg-muted": "rgb(var(--color-fg-muted-rgb) / <alpha-value>)",
      "fg-subtle": "rgb(var(--color-fg-subtle-rgb) / <alpha-value>)",
      "fg-on-emphasis": "rgb(var(--color-fg-on-emphasis-rgb) / <alpha-value>)",
      "border-muted": "rgb(var(--color-border-muted-rgb) / <alpha-value>)",
      "border-control": "rgb(var(--color-border-control-rgb) / <alpha-value>)",
      accent: "rgb(var(--color-accent-rgb) / <alpha-value>)",
      "accent-emphasis":
        "rgb(var(--color-accent-emphasis-rgb) / <alpha-value>)",
      "on-accent": "rgb(var(--color-on-accent-rgb) / <alpha-value>)",
      success: "rgb(var(--color-success-rgb) / <alpha-value>)",
      cta: "rgb(var(--color-cta-rgb) / <alpha-value>)",
      "cta-hover": "rgb(var(--color-cta-hover-rgb) / <alpha-value>)",
      coral: "rgb(var(--color-coral-rgb) / <alpha-value>)",
      "grid-line": "rgb(var(--color-grid-line-rgb) / <alpha-value>)",
      "frame-bg": "rgb(var(--color-frame-bg-rgb) / <alpha-value>)",
      // "border" is a utility name, so the mid border color is exposed as "edge"
      edge: "rgb(var(--color-border-rgb) / <alpha-value>)",
      "accent-muted": "var(--color-accent-muted)",
      "success-muted": "var(--color-success-muted)",
      "coral-muted": "var(--color-coral-muted)",
      background: "rgb(var(--color-background-rgb) / <alpha-value>)",
      "on-background": "rgb(var(--color-on-background-rgb) / <alpha-value>)",
      primary: "rgb(var(--color-primary-rgb) / <alpha-value>)",
      "primary-container":
        "rgb(var(--color-primary-container-rgb) / <alpha-value>)",
      "primary-fixed": "rgb(var(--color-primary-fixed-rgb) / <alpha-value>)",
      "primary-fixed-dim":
        "rgb(var(--color-primary-fixed-dim-rgb) / <alpha-value>)",
      "on-primary": "rgb(var(--color-on-primary-rgb) / <alpha-value>)",
      "on-primary-container":
        "rgb(var(--color-on-primary-container-rgb) / <alpha-value>)",
      "on-primary-fixed":
        "rgb(var(--color-on-primary-fixed-rgb) / <alpha-value>)",
      "on-primary-fixed-variant":
        "rgb(var(--color-on-primary-fixed-variant-rgb) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary-rgb) / <alpha-value>)",
      "secondary-container":
        "rgb(var(--color-secondary-container-rgb) / <alpha-value>)",
      "secondary-fixed":
        "rgb(var(--color-secondary-fixed-rgb) / <alpha-value>)",
      "secondary-fixed-dim":
        "rgb(var(--color-secondary-fixed-dim-rgb) / <alpha-value>)",
      "on-secondary": "rgb(var(--color-on-secondary-rgb) / <alpha-value>)",
      "on-secondary-container":
        "rgb(var(--color-on-secondary-container-rgb) / <alpha-value>)",
      "on-secondary-fixed":
        "rgb(var(--color-on-secondary-fixed-rgb) / <alpha-value>)",
      "on-secondary-fixed-variant":
        "rgb(var(--color-on-secondary-fixed-variant-rgb) / <alpha-value>)",
      tertiary: "rgb(var(--color-tertiary-rgb) / <alpha-value>)",
      "tertiary-container":
        "rgb(var(--color-tertiary-container-rgb) / <alpha-value>)",
      "tertiary-fixed": "rgb(var(--color-tertiary-fixed-rgb) / <alpha-value>)",
      "tertiary-fixed-dim":
        "rgb(var(--color-tertiary-fixed-dim-rgb) / <alpha-value>)",
      "on-tertiary": "rgb(var(--color-on-tertiary-rgb) / <alpha-value>)",
      "on-tertiary-container":
        "rgb(var(--color-on-tertiary-container-rgb) / <alpha-value>)",
      "on-tertiary-fixed":
        "rgb(var(--color-on-tertiary-fixed-rgb) / <alpha-value>)",
      "on-tertiary-fixed-variant":
        "rgb(var(--color-on-tertiary-fixed-variant-rgb) / <alpha-value>)",
      error: "rgb(var(--color-error-rgb) / <alpha-value>)",
      "error-container":
        "rgb(var(--color-error-container-rgb) / <alpha-value>)",
      "on-error": "rgb(var(--color-on-error-rgb) / <alpha-value>)",
      "on-error-container":
        "rgb(var(--color-on-error-container-rgb) / <alpha-value>)",
      surface: "rgb(var(--color-surface-rgb) / <alpha-value>)",
      "surface-dim": "rgb(var(--color-surface-dim-rgb) / <alpha-value>)",
      "surface-bright": "rgb(var(--color-surface-bright-rgb) / <alpha-value>)",
      "surface-container-lowest":
        "rgb(var(--color-surface-container-lowest-rgb) / <alpha-value>)",
      "surface-container-low":
        "rgb(var(--color-surface-container-low-rgb) / <alpha-value>)",
      "surface-container":
        "rgb(var(--color-surface-container-rgb) / <alpha-value>)",
      "surface-container-high":
        "rgb(var(--color-surface-container-high-rgb) / <alpha-value>)",
      "surface-container-highest":
        "rgb(var(--color-surface-container-highest-rgb) / <alpha-value>)",
      "surface-variant":
        "rgb(var(--color-surface-variant-rgb) / <alpha-value>)",
      outline: "rgb(var(--color-outline-rgb) / <alpha-value>)",
      "outline-variant":
        "rgb(var(--color-outline-variant-rgb) / <alpha-value>)",
      "surface-tint": "rgb(var(--color-surface-tint-rgb) / <alpha-value>)",
      "inverse-primary":
        "rgb(var(--color-inverse-primary-rgb) / <alpha-value>)",
      "inverse-surface":
        "rgb(var(--color-inverse-surface-rgb) / <alpha-value>)",
      "inverse-on-surface":
        "rgb(var(--color-inverse-on-surface-rgb) / <alpha-value>)",
      "on-surface": "rgb(var(--color-on-surface-rgb) / <alpha-value>)",
      "on-surface-muted":
        "rgb(var(--color-on-surface-muted-rgb) / <alpha-value>)",
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
      sans: '"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
      inter:
        '"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
      body: '"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
      display:
        '"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
      headline:
        '"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
      mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      code: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSize: {
      "display-xl": [
        "5rem",
        {
          "line-height": "5.25rem",
          "letter-spacing": "-0.04em",
          "font-weight": "800",
        },
      ],
      "display-md": [
        "3.5rem",
        {
          "line-height": "3.75rem",
          "letter-spacing": "-0.035em",
          "font-weight": "800",
        },
      ],
      headline: [
        "2.5rem",
        {
          "line-height": "2.875rem",
          "letter-spacing": "-0.025em",
          "font-weight": "700",
        },
      ],
      "title-lg": [
        "1.5rem",
        {
          "line-height": "2rem",
          "letter-spacing": "-0.01em",
          "font-weight": "600",
        },
      ],
      lead: ["1.25rem", { "line-height": "1.875rem" }],
      "display-lg": [
        "clamp(2.75rem, 7vw, 5rem)",
        {
          "line-height": "1.05",
          "letter-spacing": "-0.04em",
          "font-weight": "800",
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
          "letter-spacing": "0.14em",
          "font-weight": "500",
        },
      ],
    },
    boxShadow: {
      card: "var(--shadow-card)",
      glow: "var(--shadow-glow)",
      overlay: "var(--shadow-overlay)",
      // v1 names, kept for existing pages
      ambient: "var(--shadow-card)",
      floating: "var(--shadow-card)",
      hologram: "var(--shadow-glow)",
      "hologram-strong": "var(--shadow-glow)",
    },
  },
});
