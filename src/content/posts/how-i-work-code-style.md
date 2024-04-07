---
title: "How I work: Code Style"
date: "9/10/2022"
excerpt: I'll talk about my philosophy on code style.
---

As a Software Engineer, I believe it may be annoying if a code style is not enforced across a repository.

- Do we want to have 2 spaces? 4 spaces? 8 spaces? Do we use tabs?
- Do we want to have semicolons?
- Where should the bracket be after an `if`? New line or next to it?

# My philosophy

1. **There has to be at least a code style** in a repository when working with a team of folks. That is because everyone has a different sense of style when programming. It's annoying when it isn't consistent.

2. **Automate code style** when possible. Use `eslint`, use `prettier` for JavaScript. Use gofmt for Go. Automating is important, because otherwise code reviews will be littered with `nits`, which is a very bad practice. It's a waste of time needing to mention that a space is needed, or it has to be 2 spaces or tabs. If it can be `--fix`, then there will be less frustrations. If it can be automated in a precommit, do it.

3. **The code style is determined by the team.** I strongly believe that there's no I in team. Programming is a community experience. I believe in listening to teammates and try to unblock the team as much as I could. If a majority of the folks do not like it, we create a pull request and facilitate a discussion.

4. **Delivery > Code Style**. I believe that code style is something that shouldn't impede delivery, despite if it may have terrible code style at first. Code is not written in stone forever. It will change as product requirements grow, and as technology improves, and as the team grows. I wouldn't want to fret over getting the perfect code style up front. Like this famous quote, "Perfection is the root of all evil" - if we spend days on perfecting code style despite the code meeting product requirements, then we are prioritizing the wrong thing. Code style is not reflected upon the code that will run. In fact, in the web site / application world, the code style that is delivered on user's clients is most likely going to be minified.

5. **Code Readability > Code Style**. `eslint` and `prettier` is not going to fix everything. It cannot fix unreadable code. Teams and companies evolve, and the maintainers of a repository may not be always forever. It hurts me when code is written in a way that is unreadable. For example:

```tsx
function X({ is = [], a = 3 }) {
  if (!is || is.length < a) {
    return null;
  }

  return (
    <div className="foo">
      {is.map((x, i) => (
        <img className="bar" key={i} src={x.s} />
      ))}
    </div>
  );
}

<X is={[{ s: "..." }, { s: "..." }, { s: "..." }]} a={3} />;
```

When I write code, I usually think about - how will others read this code? When I look at the above, questions arise:

1. What is `a`? What is `is`?
2. Why is there a `is.length < a` restriction?
3. Could we use a `section` instead of a `div`?
4. What is the purpose of this code - what is it trying to achieve? Can you explain it to a 5-year old?

Now, let's compare it to readable code:

```tsx
function Carousel({ images = [], minImagesCount = 3 }) {
  if (!images || images.length < minImagesCount) {
    return null;
  }

  return (
    <div className="carousel">
      {images.map((image, i) => (
        <img className="carousel-item" key={i} src={image.src} />
      ))}
    </div>
  );
}

<Carousel images={[{ src: "..." }, { src: "..." }, { src: "..." }]} />;
```

Here, when we read the code top to bottom, I can summarize it to the following:

> This is a carousel component that takes a list of images and displays them. It requires at least a default minimum images of 3. Developers can choose to change that restriction to any amount by passing in minImagesCount

Note that, looking at the above - as the code grows, then we ask ourselves the following:

- What is acceptable for `images` ?

From there, a [jsdoc](https://jsdoc.app/) could help, or just use [TypeScript](https://www.typescriptlang.org/).

To summarize, I always write code to make it at least somewhat readable. If it's a hack, I add commentary on how that works. That is because I believe in documenting as much as possible. I believe that code should be written for posterity.

---

# An opinionated JavaScript/TypeScript style automation setup in 2022 - what I use in my personal repos.

Now that I have written my philosophy, I'll describe how to setup automation for achieving a consistent style across a JavaScript/TypeScript. I'll also explain some of the decisions made.

## 1. Install prettier

[Prettier](https://prettier.io/) is a way to enforce an opinionated code formatting across a repository.

```
yarn add -D prettier
```

After, I apply the following configuration:

```js
{
  "singleQuote": false,
  "trailingComma": "es5"
}
```

I have a force of habit using double quotes in JavaScript instead of single quotes, so for my personal repos I tend to use double quotes. **So don't follow this recommendation.**

Enforcing single quotes makes sense. Often times,3 we need to embed double quotes in a string. Embedding double quotes when using double quotes requires either using escaping, which is painful. Using single quotes fixes that problem.

For `trailingComma`, JavaScript hates it when a comma is missing in a JSON object. For example,

```js
const foo = {
  a: "foo",
  b: "bar"
  myNewProperty: "apple"
}
```

It is not discernible to see that `b: "bar"` is missing a comma. With trailing commas, it always enforces a comma to be added at the end of every object when `es5` is set.

## 2. Install eslint

Now, `prettier` is not going to fix problems in code. It just formats it with an opinion.

[eslint](https://eslint.org/) fixes problems in code.

```
yarn add -D eslint
```

Afterwards, we can run this command:

```
npm init @eslint/config
```

This will then ask questions about the repository, and installs what is needed.

### My configuration

```
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-prettier eslint-plugin-react
```

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "plugin:import/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/prop-types": [0],
    "@typescript-eslint/no-explicit-any": [0],
    "@typescript-eslint/ban-types": [0],
    "@typescript-eslint/no-non-null-assertion": [0],
    "import/order": [
      1,
      {
        "newlines-between": "always",
        alphabetize: {
          order:
            "asc" /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
        groups: [
          "external",
          "builtin",
          "internal",
          "sibling",
          "parent",
          "index",
        ],
      },
    ],
  },
};
```

I install everything that is recommended by eslint. I also do add `eslint-plugin-prettier` into eslint to ensure that eslint is in sync with prettier.

From there, I set the following:

1. `"react/prop-types": [0]` - I use TypeScript, so I don't believe I need to have proptypes.
2. `"@typescript-eslint/no-explicit-any": [0]` - I don't believe in a strict configuration, and I believe `any` is acceptable, but let's try to avoid it when we can. It follows the philosophy `Delivery > Code Style`.
3. `"@typescript-eslint/ban-types": [0]` - I believe this banned types that were used in my repository, but I could not find an equivalent type. It follows the philosophy `Delivery > Code Style`.
4. `"import/order"` - This is something I just picked up recently. Having a good import order and structure makes it easier to figure out how dependent the file is with external modules and internal modules. It makes it easier to test. I just use what was recommended + alphabetizing and newlines-between.

## 3. Add `husky` and `lint-staged`

To have the linter run during commits, I use [husky](https://github.com/typicode/husky), which can run JavaScript during a commit.

To only run the linter on changed files, I use [lint-staged](https://github.com/okonet/lint-staged).

```
yarn add -D lint-staged husky
```

Setup Husky and lint-staged

```
npm set-script prepare "husky install"
npm run prepare

npx husky add .husky/pre-commit "npx lint-staged"
```

I add the following file `.lintstagedrc`:

```json
{
  "*.{js,jsx,ts,tsx}": "eslint --fix",
  "*.{js,jsx,ts,tsx,md,html,css}": "prettier --write"
}
```

## 4. Run the linter in CI

This helps commits that did not run `yarn` to be consistent. It's a 2nd wave of defense.

I use [Github Actions](https://github.com/features/actions). Here's what my test yml file looks like:

````yml
name: Run Linting and Unit Testing
on:
  workflow_dispatch:
  pull_request:
  push:
    paths:
      - "src/**"
      - ".github/workflows/**"
      - "package.json"
      - "vite.config.ts"
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 🛑 Cancel Previous Runs
        uses: styfle/cancel-workflow-action@0.6.0
        with:
          access_token: ${{ secrets.GITHUB_TOKEN }}

      - name: ⬇️ Checkout repo
        uses: actions/checkout@v3

      - name: ⎔ Setup node
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: 📥 Download deps
        uses: bahmutov/npm-install@v1

      - name: 🧪 Lint and Test
        run: |
          yarn lint
          yarn test --silent --coverage
          echo "### Test Results 🧪 "  >> $GITHUB_STEP_SUMMARY
          echo "\`\`\`"  >> $GITHUB_STEP_SUMMARY
          yarn c8 report >> $GITHUB_STEP_SUMMARY
          echo "\`\`\`"  >> $GITHUB_STEP_SUMMARY```
````

---

# Concluding Thoughts

I believe having a code style helps the health of a code repository, and making it awesome for posterity. I believe it's better than nothing and having code style all over the place.

On the other end, **I am not a stickler on code style**. If it has to be skipped, then using `//eslint-next-line-disable`, `any` is okay to me. Don't abuse it though!
