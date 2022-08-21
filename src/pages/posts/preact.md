---
layout: ../../layouts/blog.astro
title: "Going from React to Preact"
date: "08/15/2022"
excerpt: "I've crossed the dark side to the light: I switched to Preact for this website only. I still will develop websites and web apps in React though."
---

<a href="https://preactjs.com/" target="__blank">
  <div class="aspect-w-16 aspect-h-9 p-4 bg-[#673ab8]">
    <div class="flex items-center justify-center">
      <img class="w-3/4 h-auto max-h-16 sm:max-h-32" src="/images/blog/preact.svg" alt="Preact">
    </div>
  </div>
</a>

I made the jump from [React](https://reactjs.org/) to [Preact](https://preactjs.com/) just recently for this website. It was interesting.

# Why did I do it?

My mission for this website is to always chase after speed. Make the website extremely fast without sacrificing anything.

> Fast 3kB alternative to React with the same modern API

- [React-DOM is a 42kB](https://bundlephobia.com/package/react-dom@18.2.0) bundle minified + gzipped.
- [React is 2.5 kB](https://bundlephobia.com/package/react@18.2.0) bundled minified + gzipped.

In total, that would be **44.5 kb**, while Preact alone is just [4kB](https://bundlephobia.com/package/preact@10.10.2) minified and gzipped. That's a **10x** reduction!

Note that I did not add [preact-compat](https://preactjs.com/guide/v10/switching-to-preact/), because for my use case in the website, I don't need it.

There's also performance claims [that preact's faster](https://javascript.plainenglish.io/i-built-the-same-app-with-react-and-preact-here-are-the-differences-b0da382a6f72), but for what I have here, it is probably negligible.

So that's why I did it. I just wanted this website to be fast. I wanted to show what I am capable of doing when it comes to reaching out for speed.

# Losses

- [React DevTools](https://www.npmjs.com/package/react-devtools) doesn't work. However, [Preact DevTools](https://preactjs.github.io/preact-devtools/) does work.
- I cannot just simply import React libraries. I need to evaluate whether I need preact-compat.

# Issues I encountered and how I fixed them

## `React.Children`

`props.children` is always an array in Preact. However, I used [`toChildArray`](https://preactjs.com/guide/v10/api-reference/#tochildarray) to also guarantee it.

## `@testing-library/react`

I have to use [`@testing-library/preact`](https://preactjs.com/guide/v10/preact-testing-library/) instead.

## Hooks

Hooks comes from `preact/hooks` instead of `react`.

## Renderer

Since I use TypeScript and Vite, this was easy:

In `tsconfig.json`, I added the following:

```json
{
  "jsx": "react-jsx",
  "jsxImportSource": "preact"
}
```

In [Astro](https://astro.build/), I switched to [`@astrojs/preact`](https://www.npmjs.com/package/@astrojs/preact) instead of [`@astrojs/react`](https://www.npmjs.com/package/@astrojs/react).
In [vitest](https://vitest.dev/), I used [`@preact/preset-vite`](https://www.npmjs.com/package/@preact/preset-vite) instead of [`@vitejs/plugin-react`](https://www.npmjs.com/package/@vitejs/plugin-react).

## TypeScript

Now this is the stuff that requires a Google or search in Stack Overflow.

I cannot just simply use `@types/react`. It doesn't work that way. I have to use the `preact` types. It's probably because I don't have preact-compat.

- `React.ReactNode` is `ComponentChildren`
- `React.HTMLProps` and `React.SVGProps` is `JSX.HTMLAttributes` and `JSX.SVGAttributes`
- `React.ReactElement` is `JSX.Element`

Everything else was similar. I either imported from `preact` or `preact/hooks`.

# Moving forward

I am always striving to make this website the fastest possible to demonstrate what I can do as a Software Engineer. I want to see how I can surpass my limits to deliver the best and awesome web applications. I'm not attached to any JS framework out there. I want to learn how to give the best for our users.

To see these changes in action, here were the relevant commits:

- https://github.com/hrgui/hrgui.github.io/commit/9bcbc051169f783ee409a2db129d02a0466503d7 - the initial preact conversion
- https://github.com/hrgui/hrgui.github.io/commit/ddd2d1b0b8fdc7402ac8c35eba081cb8c687dd5d - fix that I needed to make Vite happy with chart.js (it doesn't support ESM yet)
- https://github.com/hrgui/hrgui.github.io/commit/fcfbc87a54025b6f616e6fa3d37d1cf226a4774a - for TypeScript

---

# Addendum

> Fitting a square peg in a round hole.

Don't get me wrong. It doesn't mean that if I converted my website to Preact that I'll move everything to React. I'll only do it if it makes sense. I work on my website by myself, and the website is very minimal in footprint. It also gives me good practice to become a better Frontend Engineer than relying on React libraries like material-ui or react-bootstrap for my site. So that is why I moved my entire website to Preact. I am always trying to improve my craft, or what we call, surpass my limits (anime reference).

Moving actual, real-life applications with large teams with Preact requires a lot of research and buy-in from the team. If the team isn't for it, I would not do it. It just carries more tech debt. Later on, they might re-convert it back to React.
