# hrgui

# Getting Started

## Installation

```
yarn
```

## Running development

```
yarn dev
```

# Tech Stack

- [astro](https://astro.build/) for the foundation (Markdown, Vite, Islands Architecture)
- [preact](https://preactjs.com/) for the Preact components
- [chart.js](https://www.chartjs.org/) for the Pie component for Portfolio
- [vitest](https://vitest.dev/) for unit testing
- [@testing-library/preact](https://preactjs.com/guide/v10/preact-testing-library/) for testing-library
- [mermaid](https://mermaid-js.github.io/mermaid/#/) for mermaid diagrams for markdown
- [tailwindcss](https://tailwindcss.com/) for CSS
- [Vercel](https://vercel.com/) for Build Previews
- [Github Pages](https://pages.github.com/) for Production

Note: I added [remark-mermaid](https://github.com/temando/remark-mermaid) into utils and slightly modified it so that it is always simple mode and always returns a `pre` + `<div class="mermaid"></div>`. This allows mermaid code blocks to be included.

# Outputs

- `dist` - this is the output of the build

# Backgrounds from

1. GPlay BG: https://svgeneration.netlify.app/recipes/gplay/
2. HeroPatterns: heropatterns.com
