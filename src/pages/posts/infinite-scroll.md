---
layout: ../../layouts/blog.astro
title: "How I do infinite scroll"
date: "08/21/2022"
excerpt: "I'll talk about my secret technique about infinite scroll. The same technique is actually used for this site!"
---

Websites like [LinkedIn](https://www.linkedin.com/), [Twitter](https://twitter.com/) and [Instagram](instagram.com) all share this one UI characteristic: It's a endless content feed where the user can swipe down on the mobile phone, or scroll down on the desktop. In UI engineering, that term has been coined as **infinite scroll**.

## How I used to do infinite scroll

[react-window](https://github.com/bvaughn/react-window) or [react-virtualized](https://bvaughn.github.io/react-virtualized/) are two libraries that I used to jump to when developing for infinite scroll. They're two great libraries that know how to deal with long lists, and only renders what is needed at the time. It's also more efficient than what I am about to eventually describe because of what it keeps.

I used to even fork an entire lib, maintained my own [@hrgui/react-infinite-scroll](https://github.com/hrgui/react-infinite-scroll), which is a fork of https://github.com/danbovey/react-infinite-scroller, which is another fork of https://github.com/guillaumervls/react-infinite-scroll. This was in one of my blog posts about Class VS Hooks part 2. The flow required the following:

- Attach a scroll listener to a component.
- Attach a mousewheel, resize listener also.
- The algorithm checks if we've reached the bottom or top. There's thresholds involved, and heights to calculate, and it's quite involved. If it hits the goal, then it'll call the callback to load more.

## How I do infinite scroll now

Now, I use an API called the [IntersectionObserver](https://caniuse.com/intersectionobserver). The trick is to insert an element to the end of the list. If the element is visible (which IntersectionObserver can do), then we call the callback.

If I use React, I like to use a library called [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer) along with [@tanstack/react-query's useInfiniteQuery](https://tanstack.com/query/v4/docs/reference/useInfiniteQuery).

See it action [here](https://www.harmanradix.com/infinite-scroll-demo). The code is [here](https://github.com/hrgui/infinite-scroll-demo).

---

We can do the same principle with animations that we'd like to show when the user scrolls. If the element is visible, then we can start an animation. That is how the hero element of my homepage works.
