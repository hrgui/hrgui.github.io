---
title: "Nano Stores"
date: "2/9/2025"
excerpt: Lately, I wanted something similar to Vue's Pinia but for React. Nanostores may be the one.
---

In my past year or so, I've been learning different JavaScript libraries and frameworks. I wanted to pursue how to make the best and most performant applications. I wanted to spread my wings.

I learned about [Vue 3](https://vuejs.org/), with its reactivity system and learned about [Pinia](https://pinia.vuejs.org/), and deployed to production, with about 500K to 600K views a day and 100K unique viewers per day. It is performant, but I learned Vue requires a fairly [modern ecosystem](https://vuejs.org/about/faq#what-browsers-does-vue-support) due to usage of Proxy. It also doesn't always work for all the browsers I need to work on in my day-to-day work. In that situation, I would often tend to using [React](https://react.dev/), and that is battle-tested and I know that works in a fair number of browsers.

However, when it comes to state and event management, I often tend to think that [Redux](https://redux.js.org/) is the solution to use, as it is widely known across the industry. It has gotten better with [redux-toolkit](https://redux-toolkit.js.org/), but there is still a lot involved:

- I have to make a [slice](https://redux-toolkit.js.org/api/createslice), which consists of the initialState and reducers.
- I have to think about the right way to make the initialState, otherwise it ends up becoming a problem due to violations of global and local state. Normalization of the state is the way to go when it comes to non-global data.
- There are ["reducers"](https://redux-toolkit.js.org/usage/immer-reducers), in which I can export from the [slice](https://redux-toolkit.js.org/api/createslice)
- I have to dispatch the action, otherwise it doesn't do anything.
- People think I need to be in React to do anything to the redux store, but we can simply call `store.dispatch(action())` and that should be sufficient. This often ends up causing a false sense of thinking Redux is tightly coupled to React.
- People think that a redux thunk (asyncThunk in redux-toolkit) is necessary, and the setup of the state is necessary, but the redux-toolkit library provides [rtk-query](https://redux-toolkit.js.org/tutorials/rtk-query) which reduces all the boilerplate for you.
- I have to make a selector, and if I don't use [createSelector](https://reselect.js.org/api/createselector/), it's not memoized well enough, thus resulting in re-renders.
- I need to have a Provider higher up in the tree.

Take a look at the [counter example](https://redux-toolkit.js.org/tutorials/quick-start#full-counter-app-example):

```js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
```

The component:

```js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, selectCount } from "./counterSlice";
import styles from "./Counter.module.css";

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
    </div>
  );
}
```

It's still a bit verbose, which is why people aren't really so fond on using Redux. React has evolved, so has the other libraries around state management, and so has other competing libraries against React. It's time I learn something new around state management.

My criteria:

- Solution must work in older browsers
- Can work for many frameworks/libraries, not just React
- Must also work in plain JavaScript DOM manipulation (Redux can work this way through subscriptions).

Redux, of course fits all these criteria. However, I want something else that is simpler.

# Enter Nano Stores

I thought about using [jotai](https://jotai.org/), but I wasn't able to manipulate jotai outside of React effectively, and the documentation for [Store](https://jotai.org/docs/core/store) was lacking. I still needed a provider.

When sharing state between [Astro](https://astro.build/) islands, Astro talks about using [Nano Stores](https://github.com/nanostores/nanostores). I fell in love with it as state management became simple again, and I can manipulate state outside of React. React will just update. It also supports other frameworks such as Preact, React, Solid, Svelte, Vue and Lit, which is pretty amazing - and of course, we can also use standard DOM manipulation too!

It all starts off with an `atom`, just like jotai and the deprecated library [recoil](https://github.com/facebookexperimental/Recoil). Let's take a counter for example:

```ts
import { atom } from "nanostores";
const count = atom(0);
```

I can manipulate the count by doing the following:

```ts
count.set(count + 1);
```

Now, if I want to use it in React, I can use the [@nanostores/react](https://github.com/nanostores/nanostores?tab=readme-ov-file#react--preact) integration:

```tsx
import { atom } from "nanostores";
const count = atom(0);

export const Counter = () => {
  const $count = useStore(count);
  return <div>{$count}</div>;
};
```

There's no selector needed, there's no provider needed, and I can manipulate everything outside of React, which I find very powerful. It feels very similar to how I felt with [Pinia](https://pinia.vuejs.org/), Vue's most popular management system. Pinia's usage in Vue is simple as `const myStore = useWhateverStore();`, and then I can manipulate the store outside or inside Vue, which is what made me fell in love with Vue and Pinia. It made me realize to go back to the basics, and made me realize that keeping it simpler is better.

Now if we compare the counter from Redux, this is how it'll look like in [nanostores](https://codesandbox.io/p/devbox/sleepy-leaf-tmghsy):

```jsx
import { atom } from "nanostores";
import React from "react";
import { useStore } from "@nanostores/react";
import styles from "./Counter.module.css";

const $count = atom(0);

export function Counter() {
  const count = useStore($count);
  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => $count.set(count + 1)}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => $count.set(count - 1)}
        >
          -
        </button>
      </div>
    </div>
  );
}
```

That's it. Just one file. I can also set `window.$count = $count` if I wanted to, and I can go to town, just like [Pinia](https://pinia.vuejs.org/). There's no need to bring the `store`, there's no need to bring the actions associated to the window... Everything is awesome again, and everything is now back to JavaScript.
