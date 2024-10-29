---
title: "NPM Packages that are only TypeScript"
date: "10/28/2024"
excerpt: "I have only a TypeScript module. I npm install it. What happens if I install it for a specific environment? Find out here."
---

I admit, TypeScript is a pain to work with when exporting it as a library. However, I am writing this from 2024. Not from 2014. How far has TypeScript support gone? Let's see.

I have a a repo called [`ts-only-module`](https://github.com/hrgui/ts-only-module), which only has its main file as TypeScript. It has one export, `helloWorld`. When evaluating that function, it prints out `helloWorld()`.

## Vite

https://vite.dev/

No issues. Just install it, import it, and it evaluates. Works out of box.

## Rsbuild

https://rsbuild.dev/guide/start/quick-start

No issues. Just install it, import it, and it evaluates. Works out of box.

## Create React App (Webpack)

It has issues. This is because `babel-loader` is only to evaluated on the `src` directory for create react app.

```
Compiled with problems:
×
ERROR in ./node_modules/@hrgui/ts-only-module/index.ts 1:28
Module parse failed: Unexpected token (1:28)
File was processed with these loaders:
 * ./node_modules/source-map-loader/dist/cjs.js
You may need an additional loader to handle the result of these loaders.
> export function helloWorld(): string {
|   return "Hello World";
| }
```

The only way to make this work is to make a custom webpack implementation instead, where we can specify the `include` and `exclude` of `babel-loader`.

However, babel can get slow, and now these days, people use swc or esbuild. With esbuild, we don't have to specify much configuration, and webpack becomes similar to vite:

```json
{
  test: /\.tsx?$/,
  loader: "esbuild-loader",
  options: {
    loader: "tsx", // Or 'ts' if you don't need tsx
    target: "es2015",
  },
},
```

This blog post will evolve over time - more incoming!
