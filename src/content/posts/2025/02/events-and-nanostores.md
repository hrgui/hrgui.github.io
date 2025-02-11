---
title: "Counter: React, Custom Events and Nano Stores"
date: "2/10/2025"
excerpt: Ever used custom events, but find it cumbersome to work with React due to useEffect and the fear of component re-rendering? Try using nano stores instead.
---

Let's take another Counter example, but done completely in [Custom Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) / the [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) model and [React](https://react.dev/), with a state of just `let count = 0`, like so:

```jsx
import { Counter } from "./Counter";

let count = 0;

window.addEventListener("CounterRequest", (event) => {
  count += event.detail?.by || 0;
  window.dispatchEvent(
    new CustomEvent("CounterResponse", {
      detail: count,
    })
  );
});

export default function App() {
  return <Counter />;
}
```

The Counter component would be something like this:

```jsx
import { useEffect, useRef } from "react";

export function Counter() {
  const ref = useRef();

  useEffect(() => {
    const listener = (event) => {
      ref.current.textContent = event.detail;
    };
    window.addEventListener("CounterResponse", listener);
    return () => {
      window.removeEventListener("CounterResponse", listener);
    };
  });

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("CounterRequest"));
  }, []);

  return (
    <div>
      <button
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("CounterRequest", { detail: { by: 1 } })
          )
        }
      >
        +
      </button>
      <span ref={ref} />
      <button
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("CounterRequest", { detail: { by: -1 } })
          )
        }
      >
        -
      </button>
    </div>
  );
}
```

Now you might be wondering, is there a way to remove the `useEffect` hooks? [Everyone hates useEffect](https://www.reddit.com/r/reactjs/comments/1dtqk2s/why_everyone_hate_useeffect/). There's a chance that if the component re-renders, which the events fire more than once. This would then cause the events to be added and removed due the component re-rendering. I kinda wish I can just use custom events without needing to worry about what React will do!

## Entering: Nano Stores.

We can take the same example but now let's start incorporating [Nano Stores](https://github.com/nanostores/nanostores)... but not fully. _See the end for how to do this fully with nano stores._

App would look like the following:

```jsx
import { Counter } from "./Counter.jsx";

export default function App() {
  return <Counter />;
}
```

`Counter.jsx` would look like the following now:

```jsx
import { useStore } from "@nanostores/react";
import { $counter } from "./counter.js";

export function Counter() {
  const counter = useStore($counter);

  return (
    <div>
      <button
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("CounterRequest", { detail: { by: 1 } })
          )
        }
      >
        +
      </button>
      <span>{counter}</span>
      <button
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("CounterRequest", { detail: { by: -1 } })
          )
        }
      >
        -
      </button>
    </div>
  );
}
```

There's no useEffects now! Less business logic in the component! But there's a cost - the cost is an extra import to `$counter`:

```js
import { atom } from "nanostores";

let count = 0;

export const $counter = atom(count);

window.addEventListener("CounterRequest", (event) => {
  count += event.detail?.by || 0;
  window.dispatchEvent(
    new CustomEvent("CounterResponse", {
      detail: count,
    })
  );
});

window.addEventListener("CounterResponse", (event) => {
  $counter.set(event.detail);
});
```

The benefit to this is that we're no longer subjected to the quirks of React or any UI library or framework. React is known to re-render. This may cause events to mount and unmount. This may cause events to be sent more than once due to the re-rendering of components.

That's because Nano Stores is designed for moving logic not related to UI to stores. However, if there's a way to achieve the same thing without Nano Stores, and without useEffect, but still with React, then feel free to make a pull request to this repo: https://github.com/hrgui/counter-events. I did it without using `useState`!

https://github.com/hrgui/counter-events/commit/1ee381a931f5f310811f197e615eba82a436beae is the diff.

## But wait, why even use custom events?

In this example, it could be argued that everything can be done in one file:

```jsx

import { useStore } from "@nanostores/react";
import { $atom } from "nanostores";

const $counter = atom(0);

export function Counter() {
  const counter = useStore($counter);

  return (
    <div>
      <button
        onClick={() =>
          $counter.set(counter + 1);
        }
      >
        +
      </button>
      <span>{counter}</span>
      <button
        onClick={() =>
          $counter.set(counter - 1);
        }
      >
        -
      </button>
    </div>
  );
}
```

However, in this particular case, we need a reference to `$counter` to manipulate `$counter` in DevTools. We would need to add `$counter` to window, like the following: `window.$counter = $counter`. In in the Custom Events and Nano Stores example, we can just simply do `window.dispatchEvent(new CustomEvent('CounterRequest'))` to get or manipulate the counter value, and add a listener for `CounterResponse` to read the value, e.g. `window.addEventListener('CounterResponse', e => console.log(e.detail))`. Plus, I can add more event listeners if I want to!

Try doing the following: Go to https://www.hrgui.dev/counter-events

1. Open up DevTools
2. In the console, type the following: `window.addEventListener('CounterResponse', e => console.log(e.detail))`;
3. Repeat it again 2 more times.
4. Now run the following: `window.dispatchEvent(new CustomEvent('CounterRequest', {detail: {by: +1}}));`
5. Run it a couple more times.

Notice that React updates, but in the devtools we also get rhe newly updated values printed 3 times! This is quite useful when thinking about situations where we need to also fire off data to API due to certain situations like an Error.
