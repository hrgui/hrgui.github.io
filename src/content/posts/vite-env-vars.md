---
title: "Vite and its environment variables"
date: "5/9/2024"
excerpt: "Vite exposes environment variables on the special `import.meta.env` object, which are statically replaced at build time. It will, right? RIGHT?"
---

# When Vite will not statically replace environment variables

## Input

```jsx
import "./App.css";

function App() {
  return (
    <>
      <div>A: {import.meta.env.VITE_A}</div>
    </>
  );
}

export default App;
```

- Important:
- There is no `.env` file.
- `VITE_A` is not defined in the environment.

## Output

```js
var Rd = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
function Od() {
  return (
    el.useState(0),
    St.jsx(St.Fragment, {
      children: St.jsxs("div", { children: ["A: ", Rd.VITE_A] }),
    })
  );
}
```

Note that anything that was in `import.meta.env` and anything that was prefixed with VITE\_ will be in the Rd var. **It won't get every single variable in `process.env`, which would be dangerous!**

_Unless you make it do so, but I will not be writing any of that code as that is a bad practice._

# When Vite will statically replace env variables

### Input

Either `VITE_A` is defined prior to running the build

```bash
VITE_A=foo yarn build
```

**OR**

`VITE_A` is defined within a `.env` file.

```dosini
VITE_A="foo"
```

```jsx
import "./App.css";

function App() {
  return (
    <>
      <div>A: {import.meta.env.VITE_A}</div>
    </>
  );
}

export default App;
```

### Output

```jsx
function Rd() {
  return St.jsx(St.Fragment, {
    children: St.jsxs("div", { children: ["A: ", "foo"] }),
  });
}
```

# Why is this distinction important?

This can be used for removing code. Suppose we have the following example:

## Input

config.js

```js
export const isDevToolsEnabled = () => import.meta.env.VITE_DEVTOOLS === "1";
```

App.jsx

```jsx
import { DevTools } from "./DevTools";
import { isDevToolsEnabled } from "./config";

function App() {
  return <>{isDevToolsEnabled() && <DevTools />}</>;
}

export default App;
```

Devtools.jsx

```jsx
export function DevTools() {
  return <div>Imagine if this was some fancy devtools</div>;
}
```

## Output

- This is `VITE_DEVTOOLS` is never defined

```js
function Rd() {
  return Wn.jsx("div", { children: "Imagine if this was some fancy devtools" });
}
var Od = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Dd = () => Od.VITE_DEVTOOLS === "1";
function Md() {
  return Wn.jsx(Wn.Fragment, { children: Dd() && Wn.jsx(Rd, {}) });
}
Wl.createRoot(document.getElementById("root")).render(
  Wn.jsx(gc.StrictMode, { children: Wn.jsx(Md, {}) })
);
```

Notice how `Od` doesn't have VITE_DEVTOOLS, but it includes the entire import.meta.env - and also includes `<DevTools />` in `Rd`.

- This is `VITE_DEVTOOLS` defined as "" in a .env file:

```dosini
VITE_DEVTOOLS=""
```

```jsx
const Rd = () => !1;
function Od() {
  return zr.jsx(zr.Fragment, { children: Rd() });
}
```

Now, what if `isDevToolsEnabled` wasn't a function?

```js
export const isDevToolsEnabled = import.meta.env.VITE_DEVTOOLS === "1";
```

then...

the output becomes

```jsx
const Rd = !1;
function Od() {
  return zr.jsx(zr.Fragment, { children: Rd });
}
```

Which is fine... but it doesn't always work that way.

# Now do this in Vue.

## Input

Let's suppose we use Vue instead of React.

Here's another example.

App.vue

```vue
<script setup>
import DevTools from "./components/DevTools.vue";
import { isDevToolsEnabled } from "./config";
</script>

<template>Some text here: <DevTools v-if="isDevToolsEnabled" /></template>
```

DevTools.vue

```vue
<template>
  <div>Imagine if this was some fancy devtools</div>
</template>
```

config.js

```js
export const isDevToolsEnabled = import.meta.env.VITE_DEVTOOLS === "1";
```

## Output

- Without `VITE_DEVTOOLS` defined

```js
function qo(e, t) {
  return St(), lr("div", null, "Imagine if this was some fancy devtools");
}
const zo = Ko(Wo, [["render", qo]]);
var Go = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Jo = Go.VITE_DEVTOOLS === "1",
  Yo = {
    __name: "App",
    setup(e) {
      return (t, n) => (
        St(),
        lr(
          pe,
          null,
          [
            ar("Some text here: "),
            Ns(Jo) ? (St(), cr(zo, { key: 0 })) : so("", !0),
          ],
          64
        )
      );
    },
  };
Uo(Yo).mount("#app");
```

Notice the variable `Go`, notice `qo` is our DevTools... so it'll still include DevTools by default if `VITE_DEVTOOLS` env var is not defined.

Now suppose if it was defined to `VITE_DEVTOOLS=""`

```js
function qo(e, t) {
  return St(), lr("div", null, "Imagine if this was some fancy devtools");
}
const zo = Ko(Wo, [["render", qo]]),
  Go = !1,
  Jo = {
    __name: "App",
    setup(e) {
      return (t, n) => (
        St(),
        lr(
          pe,
          null,
          [
            ar("Some text here: "),
            Ns(Go) ? (St(), cr(zo, { key: 0 })) : so("", !0),
          ],
          64
        )
      );
    },
  };
```

That ain't good! It's `<DevTools />` is still there! How do we get rid of it in the bundle?

Now suppose if we inlined the `isDevToolsEnabled` var instead:

```vue
<script setup>
import DevTools from "./components/DevTools.vue";

const isDevToolsEnabled = import.meta.env.VITE_DEVTOOLS === "1";
</script>

<template>Some text here: <DevTools v-if="isDevToolsEnabled" /></template>
```

## Output

```js
const Ko = {
  __name: "App",
  setup(e) {
    return (t, n) => (
      rr(), Qi(pe, null, [cr("Some text here: "), so("", !0)], 64)
    );
  },
};
Vo(Ko).mount("#app");
```

# Key Takeaways

- Always define `VITE_*` environment variables, otherwise the output in Vite is always going to be something like this:

```js
var Go = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Jo = Go.VITE_DEVTOOLS === "1";
```

This makes it very difficult for code to be removed if the environment variable is not defined.

- For Vue, it's always best to inline environment variable checks. It makes it easier to statically replace.

For example:

Instead of doing this:

App.vue

```vue
<script setup>
import DevTools from "./components/DevTools.vue";
import { isDevToolsEnabled } from "./config";
</script>

<template>Some text here: <DevTools v-if="isDevToolsEnabled" /></template>
```

DevTools.vue

```vue
<template>
  <div>Imagine if this was some fancy devtools</div>
</template>
```

config.js

```js
export const isDevToolsEnabled = import.meta.env.VITE_DEVTOOLS === "1";
```

It should be:

```vue
<script setup>
import DevTools from "./components/DevTools.vue";

const isDevToolsEnabled = import.meta.env.VITE_DEVTOOLS === "1";
</script>

<template>Some text here: <DevTools v-if="isDevToolsEnabled" /></template>
```

This will make sure `<DevTools />` is not included if `VITE_DEVTOOLS` is a value other than `""`.
