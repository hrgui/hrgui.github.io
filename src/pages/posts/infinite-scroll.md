---
layout: ../../layouts/blog.astro
title: "How I do infinite scroll"
date: "08/21/2022"
excerpt: "I'll talk about my secret technique about infinite scroll. The same technique is actually used for this site!"
---

Websites like [LinkedIn](https://www.linkedin.com/), [Twitter](https://twitter.com/) and [Instagram](instagram.com) all share this one UI characteristic: It's a endless content feed where the user can swipe down on the mobile phone, or scroll down on the desktop. In UI engineering, that term has been coined as **infinite scroll**.

## How I used to do infinite scroll

[react-window](https://github.com/bvaughn/react-window) or [react-virtualized](https://bvaughn.github.io/react-virtualized/) are two libraries that I used to jump to when developing for infinite scroll. They're two great libraries that know how to deal with long lists, and only renders what is needed at the time. It's also more efficient than what I am about to eventually describe because of what it keeps.

I used to even fork an entire lib, maintained my own [@hrgui/react-infinite-scroll](https://github.com/hrgui/react-infinite-scroll), which is a fork of https://github.com/danbovey/react-infinite-scroller, which is another fork of https://github.com/guillaumervls/react-infinite-scroll. This was in one of my blog posts about [Class VS Hooks part 2](/posts/react-class-vs-function-2-closures-and-memory). The flow required the following:

- Attach a scroll listener to a component.
- Attach a mousewheel, resize listener also.
- The algorithm checks if we've reached the bottom or top. There's thresholds involved, and heights to calculate, and it's quite involved. If it hits the goal, then it'll call the callback to load more.

## How I do infinite scroll now

Now, I use an API called the [IntersectionObserver](https://caniuse.com/intersectionobserver). The trick is to insert an element to the end of the list. If the element is visible (which IntersectionObserver can do), then we call the callback.

If I use React, I like to use a library called [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer). I really love it's API. Just look at this example:

```js
import { InView } from "react-intersection-observer";

const Component = () => (
  <InView as="div" onChange={(inView, entry) => console.log("Inview:", inView)}>
    <h2>Plain children are always rendered. Use onChange to monitor state.</h2>
  </InView>
);

export default Component;
```

It also provides a good testing developer experience:

```tsx
import { render, screen } from "@testing-library/react";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import App from "./App";

it("should show an infinite list of projects that can be endlessly scrolled down", async () => {
  render(<App />);

  expect(await screen.findByText(/Dog 1/)).toBeVisible();

  mockAllIsIntersecting(true);

  expect(await screen.findByText(/Dog 6/)).toBeVisible();

  mockAllIsIntersecting(true);

  expect(await screen.findByText(/Dog 11/)).toBeVisible();
});
```

The method `mockAllIsIntersecting()` can simulate whether the user sees the item or not in your favorite testing library. I use `vitest`.

Next, I pair it with [@tanstack/react-query's useInfiniteQuery](https://tanstack.com/query/v4/docs/reference/useInfiniteQuery):

```tsx
const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery(
  ["items"],
  ({ pageParam = 1 }) => fetchPage(pageParam),
  {
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
  }
);
```

The `useInfiniteQuery` hook has a method that we can leverage, `fetchNextPage`, which we can call whenever the dummy element we have is in view.

I've written up an example. See it action [here](https://www.hrgui.dev/infinite-scroll-demo). The code is [here](https://github.com/hrgui/infinite-scroll-demo).

## Closing Thoughts

Infinite Scroll is one of the patterns that frontend engineers should at least have a fundamental working knowledge of. Folks often jump up to do `npm install X` whenever they are tasked to, but if we step back, simplify the problem, then we get better control over all the code we have written.

---

IntersectionObserver isn't just for infinite scroll. It can be used for more than that. Now these days, folks love to create an animation on an element when the user scrolls down. For my homepage, the hero element has an animation. When it's visible, it starts an animation. That is how the hero element of my homepage works.
