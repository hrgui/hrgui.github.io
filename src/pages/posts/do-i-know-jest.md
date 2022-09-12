---
layout: ../../layouts/blog.astro
title: "Do I know: Jest and Cypress"
date: "9/12/2022"
excerpt: Does Harman know how to use Jest and Cypress? He just uses Vitest for everything.
---

TLDR, to sum it up in one word:

# Yes

Do you want to know more? _Read below_.

---

# Are you experiencing Déjà vu?

In my last [blog post](/posts/do-i-know-webpack), I talked about my history with [webpack](https://webpack.js.org/). Now, let's talk about my history with testing.

In 2014, I started testing in Angular.js with [Karma](https://karma-runner.github.io/latest/index.html) and [Jasmine](https://github.com/karma-runner/karma-jasmine). That would define the foundation on how I do tests.

In 2015, I was working with JavaScript repos that use [Mocha](https://mochajs.org/) which would use [Chai](https://www.chaijs.com/). It wasn't a UI that I worked with, it was a javascript library that folks put on websites. Why mocha? I didn't have a choice, nor I was the software architect for that project. I follow the phrase `don't fix what isn't broken`.

In 2016, when React started to blow up, [Jest](https://jestjs.io/) started to became the kreme de la kreme when it comes to testing. It utilized the test fundamentals that I knew - which was jasmine. It has snapshot testing. It has a great API. I mean look at the code:

```js
describe("addition", () => {
  it("should know how to add 1 + 1", () => {
    expect(1 + 1).toEqual(2);
  });
});
```

It didn't require that much configuration. It was awesome, until I met [vitest](https://vitest.dev/).

# The problems with Jest

## Importing and the environment differences

When importing file into Jest, I find it very confusing. It's because it doesn't run webpack, nor vite. That's why we get stack overflow questions like [jest unexpected token when importing css?](https://stackoverflow.com/questions/54627028/jest-unexpected-token-when-importing-css).

We would need to use `moduleNameMapper`, and tell jest to mock things whenever it comes across a CSS or image files.

```ts
moduleNameMapper: {
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/test/jest/__mocks__/fileMock.js',
  '\\.(css|less)$': '<rootDir>/test/jest/__mocks__/styleMock.js',
},
```

This then ends up making a zero configuration file into a _some_ configuration file... which then could grow as large as create-react-app's [jest.config.js](https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/scripts/utils/createJestConfig.js).

It needs the following:

1. Knowing what the files to look at
2. Knowing where to collect coverage from
3. Knowing where the setup file is.
4. knowing where the tests are
5. Knowing what environment it should run
6. Knowing how to interpret jsx/tsx files.
7. Knowing how to interpret css files.
8. knowing how to interpret other files.
9. knowing what to ignore
10. knowing how to deal with CSS modules, react-native
11. knowing what extensions (.ts, .js, .tsx, ...) it can import

This then ends up creating a bad experience because what works in webpack/vite may not work in jest. However, if we follow [test driven development](https://en.wikipedia.org/wiki/Test-driven_development), we will know that up front prior to making it work in webpack/vite.

So jest is not really zero configuration when it comes to React-based code or anything that requires babel or typescript. However, once the configuration is place, I usually never touch it anymore.

## Is there any other problems?

The only gripe that I have with jest is just how I deal with imports and how it deals with them. It is a time-suck when it doesn't work but it works in webpack/vite.

Once everything has been resolved, I install [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/), and the experience of using jest is awesome.

# Vitest

When I am starting something new, I would reach out to [vitest](https://vitest.dev/). That is because it uses vite under the hood, which means the developer experience is going to make it same. No need to deal with differences between browser and testing anymore.

Look at how simple the configuration can be:

```ts
/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import preact from "@preact/preset-vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.tsx",
    coverage: {
      reporter: ["text", "text-summary", "html"],
    },
  },
});
```

There's no need for a transformer. There's no need for ignoring things. There's no need for figuring out how to deal with CSS files.What is outside of the `test` property is the vite configuration that I use.

Vitest uses the same Jest API also, so it's not like I am learning anything new!

# Concluding thoughts

I've used many JavaScript unit testing frameworks and libraries. Just look at this list:

- [Karma](https://karma-runner.github.io/latest/index.html) and [Jasmine](https://github.com/karma-runner/karma-jasmine)
- [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/)
- [QUnit](https://qunitjs.com/) (forgot to mention)
- [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/) - forgot to mention
- [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest](https://vitest.dev/) and React Testing Library

It's a long list! When I start something new, I like to leverage Vite and Vitest if I can. However, I don't mind using other systems as well if it makes sense for the use case we are trying to solve.

Also, I follow the principle of `don't fix what's not broken`. I only change test frameworks when:

1. I have time.
2. When it makes sense to.

Otherwise, I just leverage the API that is given to me and focus at the task at hand.

---

# What about e2e?

I've worked with the following:

- [Selenium](https://www.selenium.dev/), but very seldomly, and it was already in place with Python
- [Puppeteer](https://pptr.dev/), seldomly
- [Cypress](https://www.cypress.io/) - most frequently

I know there's also [Nightwatch.js](https://nightwatchjs.org/) and [Playwright](https://playwright.dev/).

Here, I apply the same principle - if there's something in place, I just use whatever we use.

# Example public PRs that show cases my Jest and Cypress knowledge

1. https://github.com/mermaid-js/mermaid/pull/3310 - Jest
2. https://github.com/hrgui/chord-charts-manager/blob/master/jest.config.js - this repo used jest, but it was convereted to vitest in the [chord-charts-app](https://github.com/hrgui/chord-charts-app)
3. https://github.com/hrgui/hrgui.github.io uses cypress for a smoke test to ensure there are no fatal errors.
