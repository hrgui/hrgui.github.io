---
{
  category: "github",
  title: "infinite-scroll-demo",
  slug: "infinite-scroll-demo",
  githubUrl: "https://github.com/hrgui/infinite-scroll-demo",
  demoUrl: "https://www.hrgui.dev/infinite-scroll-demo",
  thumbnail: "/images/portfolio/infinite-scroll-demo.webp",
  iframe:
    {
      scrolling: "yes",
      height: 538,
      src: "https://www.hrgui.dev/infinite-scroll-demo",
    },
  whatIDid:
    [
      "Demo of a photo reel on how infinite scroll can work with IntersectionObserver",
    ],
  technologiesUsed:
    [{ type: "JAVASCRIPT", value: 95 }, { type: "CSS", value: 5 }],
}
---

## About

I've had some cases when I needed to do infinite scroll. In the past, I've used libraries and event listeners. Now, I just use [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). I also paired it with [`@tanstack/react-query`'s `useInfiniteQuery`](https://tanstack.com/query/v4/docs/reference/useInfiniteQuery).

See my [blog post](/posts/infinite-scroll) for more insight.
