# hrgui

# Getting Started

## Installation

```
bun i
```

## Running development

```
bun run dev
```

# Tech Stack

- [astro](https://astro.build/) for the foundation (Markdown, Vite, Islands Architecture)
- [preact](https://preactjs.com/) for the Preact components
- [chart.js](https://www.chartjs.org/) for the Pie component for Portfolio
- [vitest](https://vitest.dev/) for unit testing
- [@testing-library/preact](https://preactjs.com/guide/v10/preact-testing-library/) for testing-library
- [mermaid](https://mermaid-js.github.io/mermaid/#/) for mermaid diagrams for markdown
- [unocss](https://unocss.dev/) for utility-first CSS
- [Vercel](https://vercel.com/) for Build Previews
- [Github Pages](https://pages.github.com/) for Production

Note: I added [remark-mermaid](https://github.com/temando/remark-mermaid) into utils and slightly modified it so that it is always simple mode and always returns a `pre` + `<div class="mermaid"></div>`. This allows mermaid code blocks to be included.

# Adding a New Language

UI strings live in `src/i18n/locales/` and are served via a pure Preact context — no external i18n library required. Adding a new locale takes 3 steps:

## 1. Create the locale file

Copy `src/i18n/locales/en.ts` to a new file, e.g. `src/i18n/locales/es.ts`. Translate all string values. The key structure must stay identical.

```ts
// src/i18n/locales/es.ts
const es = {
  nav: { home: "Inicio", blog: "Blog", portfolio: "Portafolio" },
  hero: { prefix: "Construyo ", highlight: "apps increíbles", ... },
  // ... all other keys translated
} as const;

export default es;
```

## 2. Register it in the context

In `src/i18n/context.tsx`, import the new locale and add it to the `locales` map:

```ts
import en from "~/i18n/locales/en";
import es from "~/i18n/locales/es"; // add

const locales: Record<string, Translation> = { en, es }; // add es
```

## 3. Add it to Astro and create the page

In `astro.config.mjs`, add the locale code to the `locales` array:

```js
i18n: {
  locales: ["en", "es"], // add "es"
  defaultLocale: "en",
  routing: { prefixDefaultLocale: false },
},
```

Then create `src/pages/es/index.astro` (mirroring `src/pages/index.astro`). Astro will set `Astro.currentLocale` to `"es"` for that page, which flows through the layout's `locale` prop into `I18nProvider` — all components then resolve strings from the new locale automatically.

> **Note on islands**: All home-page sections are grouped inside `<HomeSections locale={...} client:visible />`, which wraps them in a single `I18nProvider`. Each Astro `client:*` island is an isolated Preact tree, so any new island components that use `useTranslation()` must also receive `locale` and render inside an `I18nProvider`.

## Non-standard / fun locales

For locales that aren't real BCP 47 language codes (e.g. a "backward" locale that reverses all strings for testing), use Astro's locale **object syntax** to decouple the URL path from the `lang` attribute:

```js
// astro.config.mjs
i18n: {
  locales: [
    "en",
    { path: "backward", codes: ["en-x-backward"] },
  ],
  defaultLocale: "en",
  routing: { prefixDefaultLocale: false },
},
```

- **`path`** — the URL segment (`/backward/`)
- **`codes`** — what goes in `<html lang="...">`. Using `en-x-backward` is a valid BCP 47 private-use extension: screen readers treat it as English while still accurately describing the variant.

Because `Astro.currentLocale` resolves to the first entry in `codes` (`"en-x-backward"`), you must pass `locale` explicitly in the page rather than relying on `Astro.currentLocale`:

```astro
<!-- src/pages/backward/index.astro -->
<DefaultPageLayout description={description}>
  <HomeSections locale="backward" ... client:visible />
</DefaultPageLayout>
```

Then register `"backward"` in `src/i18n/context.tsx` alongside its locale file:

```ts
import backward from "~/i18n/locales/backward";
const locales: Record<string, Translation> = { en, backward };
```

## TODO: Scale with `getStaticPaths`

The current approach (one folder per locale, e.g. `src/pages/es/index.astro`) works but doesn't scale — each new locale requires duplicating every page file.

The better long-term solution is to use a dynamic `[locale]` route with `getStaticPaths` so a single file generates all locale variants:

```astro
---
// src/pages/[locale]/index.astro
export function getStaticPaths() {
  return [{ params: { locale: "es" } }, { params: { locale: "fr" } }];
}
const { locale } = Astro.params;
---
```

This should be done when adding a second language for real, so the routing stays maintainable.

# Outputs

- `dist` - this is the output of the build

# Backgrounds from

1. GPlay BG: https://svgeneration.netlify.app/recipes/gplay/
2. HeroPatterns: heropatterns.com
