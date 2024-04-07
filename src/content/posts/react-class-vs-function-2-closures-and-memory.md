---
title: "React Class Components VS Functional Components II: Functional Component's Closures, Memory and the Absence of Component Lifecycles"
date: "7/6/2020"
excerpt: This is part II of my long running series of React Class Components VS Functional Components. This post talks about some shortcomings about functional components and how class components still got it in the bag.
---

This is Part II of my ~~long~~ running series, React Class Components VS Functional Components.

We last talked about `this`, and how it leads into pitfalls into React. This time, we'll talk about React hooks pitfalls and how it leads into more pitfalls. Note that React hooks only apply to functional components, not class components.

# Closures, a JavaScript Engineer's tool.

[From MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures):

> A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

```js
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
```

_One of my favorite examples of closures: insert meme that says we know you love functions, so we put a function in a function._

# Where do closures apply in React Hooks?

Event handlers for DOM. Here's an example.

```jsx
import React from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = React.useState(0);
  const handleAlert = React.useCallback(() => {
    alert(count);
  }, []);

  return (
    <div className="App">
      {count}
      <button onClick={handleAlert}>alert</button>
      <button onClick={() => setCount(count + 1)}>increment</button>
    </div>
  );
}
```

The code is broken though. We increment the value, but the alert function never changes. This is because `React.useCallback` never changes and only changes based on the values in the dependency list, which is the 2nd argument.

```jsx
import React from "react";

export default function App() {
  const [count, setCount] = React.useState(0);
  const handleAlert = React.useCallback(() => {
    alert(count);
  }, [count]);

  return (
    <div className="App">
      {count}
      <button onClick={handleAlert}>alert</button>
      <button onClick={() => setCount(count + 1)}>increment</button>
    </div>
  );
}
```

We can then see 2 problems:

- Imagine if the memory we held is **HUGE**. That means if we setup React.useCallback incorrectly with no dependency list, we are telling the garbage collector that huge source of memory can never be cleaned up.
- Nested functions are always recreated on every render / function call.

Let's continue on focusing on the 2nd problem.

# Nested functions are always recreated on every render / function call

In class components, or functional components, this is something common that React developers do. In fact, it's common in JavaScript developers, for those who like closures.

When can it become a problem though?

# Listening to events, handling it without Component LifeCycles

Recently I've been trying to assess my knowledge of React Hooks - I've been using it for a year now, how good is my knowledge with it?

The best way really is to not take a quiz, or a multiple-choice test. It's just to put your skills to the test by converting something that is already coded as a class component - fairly complex enough, to a hooks component.

I came across: https://github.com/danbovey/react-infinite-scroller - it seems to work the way I wanted it to work, which is great. However, I wanted to learn the internals of it, and understand what it really does, so I converted it to a hooks component. I didn't rewrite the entire thing from scratch though - I did it the way a senior software engineer would - refactor.

The code has some event lifecycle paradigms:

```jsx
  componentDidMount() {
    this.pageLoaded = this.props.pageStart;
    this.options = this.eventListenerOptions();
    this.attachScrollListener();
  }

  componentDidUpdate() {
    if (this.props.isReverse && this.loadMore) {
      const parentElement = this.getParentElement(this.scrollComponent);
      parentElement.scrollTop =
        parentElement.scrollHeight -
        this.beforeScrollHeight +
        this.beforeScrollTop;
      this.loadMore = false;
    }
    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
    this.detachMousewheelListener();
  }
```

_Class components have lifecycles. Not in React hooks though._

Class Components have lifecycles. In React hooks, we don't have that. There's a [stack overflow Q&A](https://stackoverflow.com/questions/53945763/componentdidmount-equivalent-on-a-react-function-hooks-component) on emulating the events, and I decided, hey, I can apply it here. So I gave it a shot:

```jsx
useEffect(() => {
  pageLoadedRef.current = pageStart;
  optionsRef.current = eventListenerOptions();
  attachScrollListener();
  return () => {
    detachScrollListener();
    detachMousewheelListener();
  };
}, []);

useEffect(() => {
  if (isReverse && loadMoreRef.current) {
    const parentElement = getParentElement(scrollComponentRef.current);
    parentElement.scrollTop =
      parentElement.scrollHeight -
      beforeScrollHeightRef.current +
      beforeScrollTopRef.current;
    loadMoreRef.current = false;
  }
  attachScrollListener();
}, [isReverse, attachScrollListener, getParentElement]);
```

_Yes, `this.pageLoaded = this.props.pageStart` is equivalent to making a ref for pageLoaded, then assigning it to the current var, i think. It works though - dont quote me on that. In fact if you find a problem with that let me know _
CodeSandbox: https://codesandbox.io/s/inf-scroll-broken-nvh8l-nvh8l?file=/src/InfiniteScroll.tsx

If you have eslint-create-react-app (CRA), the above code will have a red/yellow squiggly highlight in the empty dependency list in the so-called `componentDidMount` implementation that I have.

Should I ignore the error, or should I fix it by adding dependencies?

- If I fix it by adding dependencies, my so-called componentDidMount will eventually get called more than once. At the same time, the so-called `componentWillUnmount` gets called more than once too.

When I did run the code, I noticed a couple of problems:

- When I scroll down, the infinite scroll is sporadic! It's like if old event listeners are firing and never getting destroyed....

So I decided to fix it by adding the dependencies:

```jsx
useEffect(() => {
  pageLoadedRef.current = pageStart;
  optionsRef.current = eventListenerOptions();
  attachScrollListener();
  return () => {
    detachScrollListener();
    detachMousewheelListener();
  };
}, [
  attachScrollListener,
  detachScrollListener,
  detachMousewheelListener,
  eventListenerOptions,
  pageStart,
]);
```

Tip: neat trick, in devtools, we can get the number of events we have added to the window

```
getEventListeners(window).scroll
(5950) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
```

https://codesandbox.io/s/inf-scroll-broken2-nvh8l-5j4w3 <- WARNING, this code may crash your tab.

WHOA! 5950 events.

So why did this become worse? Honestly, this is what stumbled me for a bit, a long time. It is in the territory of "if it ain't broke, don't fix it."

The class component code itself was working.

The problem lies elsewhere in the code, in which I will copy and paste here.

```jsx
detachScrollListener = React.useCallback(
  function detachScrollListener() {
    let scrollEl = window;
    if (useWindow === false) {
      scrollEl = getParentElement(scrollComponentRef.current);
    }

    scrollEl.removeEventListener(
      "scroll",
      scrollListener,
      optionsRef.current ? optionsRef.current : useCapture
    );
    scrollEl.removeEventListener(
      "resize",
      scrollListener,
      optionsRef.current ? optionsRef.current : useCapture
    );
  },
  [useWindow, scrollListener, useCapture, getParentElement]
);

scrollListener = React.useCallback(
  function scrollListener() {
    const el = scrollComponentRef.current;
    const scrollEl = window;
    const parentNode = getParentElement(el);

    let offset;
    if (useWindow) {
      const doc =
        document.documentElement || document.body.parentNode || document.body;
      const scrollTop =
        scrollEl.pageYOffset !== undefined
          ? scrollEl.pageYOffset
          : doc.scrollTop;
      if (isReverse) {
        offset = scrollTop;
      } else {
        offset = calculateOffset(el, scrollTop);
      }
    } else if (isReverse) {
      offset = parentNode.scrollTop;
    } else {
      offset = el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
    }

    // Here we make sure the element is visible as well as checking the offset
    // console.log(offset, threshold, el.offsetParent)
    if (offset < Number(threshold) && hasOffsetParent(el)) {
      detachScrollListener();
      beforeScrollHeightRef.current = parentNode.scrollHeight;
      beforeScrollTopRef.current = parentNode.scrollTop;
      // Call loadMore after detachScrollListener to allow for non-async loadMore functions
      if (typeof loadMore === "function") {
        loadMore((pageLoadedRef.current += 1));
        loadMoreRef.current = true;
      }
    }
  },
  [
    getParentElement,
    useWindow,
    isReverse,
    detachScrollListener,
    loadMore,
    threshold,
  ]
);
```

Here's my thought process.

These two functions, they depend on each other, at least on how it is implemented. detachScrollListner calls scrollListener to remove the event reference. scrollListener calls detachScrollListener.

When we have a dependency cycle like that, we can then say these two functions always need to be updated despite using `React.useCallback`. When the functions update, the effects need to get re-called because they are the ones that changed.

So, I ended up writing the code like the following:

```jsx
useEffect(
  function () {
    function detachScrollListener() {
      let scrollEl = window;
      if (useWindow === false) {
        scrollEl = getParentElement(scrollComponentRef.current);
      }

      scrollEl.removeEventListener(
        "scroll",
        scrollListener,
        optionsRef.current ? optionsRef.current : useCapture
      );
      scrollEl.removeEventListener(
        "resize",
        scrollListener,
        optionsRef.current ? optionsRef.current : useCapture
      );
    }

    function scrollListener() {
      const el = scrollComponentRef.current;
      const scrollEl = window;
      const parentNode = getParentElement(el);

      let offset;
      if (useWindow) {
        const doc =
          document.documentElement || document.body.parentNode || document.body;
        const scrollTop =
          scrollEl.pageYOffset !== undefined
            ? scrollEl.pageYOffset
            : doc.scrollTop;
        if (isReverse) {
          offset = scrollTop;
        } else {
          offset = calculateOffset(el, scrollTop);
        }
      } else if (isReverse) {
        offset = parentNode.scrollTop;
      } else {
        offset =
          el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
      }

      // Here we make sure the element is visible as well as checking the offset
      // console.log(offset, threshold, el.offsetParent)
      if (offset < Number(threshold) && hasOffsetParent(el)) {
        detachScrollListener();
        beforeScrollHeightRef.current = parentNode.scrollHeight;
        beforeScrollTopRef.current = parentNode.scrollTop;
        // Call loadMore after detachScrollListener to allow for non-async loadMore functions
        if (typeof loadMore === "function") {
          loadMore((pageLoadedRef.current += 1));
          loadMoreRef.current = true;
        }
      }
    }

    function attachScrollListener() {
      const parentElement = getParentElement(scrollComponentRef.current);

      if (!hasMore || !parentElement) {
        return;
      }

      let scrollEl = window;
      if (useWindow === false) {
        scrollEl = parentElement;
      }

      scrollEl.addEventListener(
        "mousewheel",
        mousewheelListener,
        optionsRef.current ? optionsRef.current : useCapture
      );
      scrollEl.addEventListener(
        "scroll",
        scrollListener,
        optionsRef.current ? optionsRef.current : useCapture
      );
      scrollEl.addEventListener(
        "resize",
        scrollListener,
        optionsRef.current ? optionsRef.current : useCapture
      );

      if (initialLoad) {
        scrollListener();
      }
    }

    function componentDidMount() {
      pageLoadedRef.current = pageStart;
      optionsRef.current = eventListenerOptions();
      attachScrollListener();
    }

    function componentDidUpdate() {
      if (isReverse && loadMoreRef.current) {
        const parentElement = getParentElement(scrollComponentRef.current);
        parentElement.scrollTop =
          parentElement.scrollHeight -
          beforeScrollHeightRef.current +
          beforeScrollTopRef.current;
        loadMoreRef.current = false;
      }
      attachScrollListener();
    }

    if (!componentDidMountRef.current) {
      componentDidMount();
      componentDidMountRef.current = true;
      return;
    }

    componentDidUpdate();

    return () => {
      detachScrollListener();
      detachMousewheelListener();
    };
  },
  [
    isReverse,
    loadMore,
    useCapture,
    useWindow,
    hasMore,
    initialLoad,
    pageStart,
    threshold,
    detachMousewheelListener,
    eventListenerOptions,
    getParentElement,
  ]
);
```

Couple of tidbits I had learned

- https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies - when using `useEffect`, when a function depends on something, it is not safe to say hey, `[]` no dependencies. That will only cause the `useEffect` to be called once, and at worse, it will end up being stale.
- If you have two functions that depend on each other, the best thing to do is move both functions inside of the effect.
- [https://reacttraining.com/blog/useEffect-is-not-the-new-componentDidMount/](https://reacttraining.com/blog/useEffect-is-not-the-new-componentDidMount/) Don't use `useEffect` as the new lifecycle manager. Instead, think of the component of, so my state changed, what side effects need to be re-run?

The code works, but perhaps there's more improvement that I could possibly do.

# Summary

Functional components do have their own fair share of problems, just like class components. However, the problems we are facing here now depend on state, its dependencies and its side effects. It enforces engineers to write better code without needing to write quirky JavaScript code to make things work (ahem, `this` binding).

We highlighted a couple of things:

- When using `React.useCallback`, we can really end up traveling back in time with the DOM if we don't clean up the DOM correctly. We also have to be mindful of the dependency list here. This can present memory issues if we don't handle this correctly.
- When using `React.useEffect`, specify the dependencies, otherwise most likely we are going to write buggy code. Think about code as hey, state changed - what side effects need to be re-run? This can present unwanted re-renders that lead into infinite loops, or memory issues, if we don't handle this correctly.

Now, what will be my part III of this series? We'll see.
