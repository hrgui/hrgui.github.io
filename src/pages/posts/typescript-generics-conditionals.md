---
layout: ../../layouts/blog.astro
title: "TypeScript: Applying an idea from stackoverflow."
date: "9/3/2022"
excerpt: "Continuing from the TypeScript Ninja... I have my own object, that I passed in as a prop. I want the other prop to only be a key of the other prop."
---

I came across a [stackoverflow question](https://stackoverflow.com/questions/52188399/typescript-constrain-argument-of-function-to-be-a-key-of-an-object-associated-w) that was similar to the problem I thought about in my last post. From that post, I was able to conjure up something interesting:

```ts
function getFromObject<
  T,
  K extends keyof any &
    {
      [K in keyof T]: T[K] extends any ? K : never;
    }[keyof T]
>(obj: T, key: K): T[K] {
  return obj[key]; // okay
}

getFromObject({ dog: 2, cat: "hey", moose: 24 }, "dog"); // okay
getFromObject({ dog: 2, cat: "hey", moose: 24 }, "cat"); // error
getFromObject({ dog: 2, cat: "hey", moose: 24 }, "moose"); // okay
getFromObject({ dog: 2, cat: "hey", moose: 24 }, "apple"); // error
```

But how can we apply this to React?
