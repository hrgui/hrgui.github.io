---
template: blog
title: "How I Feel About TypeScript - Part I"
date: "2/13/2022"
excerpt: Listen, I use TypeScript, but...
---

[TypeScript](https://www.typescriptlang.org/) is probably one of the most essential languages to learn as a Frontend Engineer today. Jobs need it, teams love it, or do they?

# Story 1: TypeScript as a blocker for a build

I once worked with a team where TypeScript had `strict` mode turned on. Back then, TypeScript wasn't really widely used across NPM libraries, and we would have to work with [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) to get types to work, or add own `.d.ts` files to make it work.

We had issues with a library because it didn't have types, so the build wouldn't work.

However, The application works. We even had unit tests to prove it! We needed to deploy today!

We ended up doing some hackery with really convoluted types (would take some time reading it) in the end to make it work, but we spent a day or two fixing the build. It was quite frustrating.

We had to explain why everything was delayed. It was tough to explain because the counterargument is that TypeScript could be tuned or turned off. We also ended up having to change to `strict: false` because other packages that we working with also had issues too not being typed.

## Rule 1: Make TypeScript a documentation tool in types, not a blocker for a release.

Browsers don't run TypeScript. TypeScript is just static checking at the end of the day. If your favorite package doesn't have TypeScript typings, making it type `any` and calling it a day is not the end of the world. In fact, it won't even make a difference for the release, actually, because it doesn't change the nature of the code.

I believe TypeScript is an effective way to communicate the types, the functions, the variables, the components, the enums, you name it. It is great as an effective communication tool, and it helps developers not have to guess types. However, we cannot trust it completely, and it should never be a blocker for a release. Time for story 2.

# Story 2: Don't hide a problem by solving it with TypeScript

I once worked with an API that had data something like this:

```ts
interface Product {
  title: string
  category: string
  price: number
  image: string
  metadata: Metadata
}
```

The API didn't have a way to expose types for `Metadata`, so we had to type it ourselves. Here's what we came up with when looking at the requirements:

```ts
interface Metadata {
  level: number
  images: { left: string; right: string }
}
```

In a perfect set of teams in a company, this would work. However, this wasn't the case that I had dealt with. In fact, this was what we call, a case of **covering up a problem**.

I figured that out by noticing there was reports of the UI not working in some instances one day - something about `images is not defined`. This was because the backend team decided the following:

> Oh, we changed our metadata to be everything of type `string`. Also, metadata could be anything, so imagine it would work for anything possible - to support different types of products.

I had to fix the problem on the spot by assuming Metadata was `Partial<Metadata>` - it was an interesting fire drill. Questions came up to mind:

1. Why wasn't I informed of all of these changes?
2. Why did I naively assume that the metadata was going to be that interface?
3. Is `any` or `unknown` bad in this case?

In the long run, I made Metadata as `Partial<Metadata>`, and I unioned it with all the possible types. In the JavaScript code, I ended up using [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) for parts that could fail, like the following:

```js
metadata?.images?.left || image
```

Yet, I think in the long run, if I wanted to be faster and more lazy, I could have just assumed metadata at the top most level is just going to be of type `any`. I would then probably then type it based on `category`, which I know TypeScript can do, but `any` would get me done quickly.

## Rule 2: TypeScript is not going to cover up poor communication across teams. Something else will.

What I learned here was when working with other teams, if they aren't going to give me types for a property, don't type it for them. Don't assume a type. Just make it ~`any`~ `unknown`, even if it makes us TypeScript-ists angry in TypeScript.

What is better is to always best to make the code resilient against the problems that could occur. Otherwise, when that type of error occurs, and when we don't have an ErrorBoundary...

The customer just gets a blank, empty white screen.

I always imagine myself in the customer's shoes. Having to explain that kind of bullshit to support is bad, because it wastes the customer's own time. It makes it look like the company doesn't care about quality. If I see something like that, I just do my business elsewhere.

My philosophy here is the following:

1. Never strictly type something that isn't typed to begin with. If you can type it, but its not consistent / or it could change, make them `optional` using `Partial`.
2. Even if it makes us cringe, `any` is not a bad thing in TypeScript. In fact, perhaps it is fair game to say it's type `any` and we need to use optional chaining if we don't trust the source.
3. Make components resilient in the face of improper or partial data. If the component can render partial data, then do it. Something is better than nothing. Use [zod](https://github.com/colinhacks/zod) or [tiny-invariant](https://www.npmjs.com/package/tiny-invariant) if contracts are broken due to poor communication.

And more importantly...

# If you ask me about what I think about TypeScript

At the end of the day, TypeScript is a great communication tool because it tells everyone about your function, your component, your class. It makes developers confident enough to say, okay - if I use X, it will most likely certainly be of type X and of shape Y.

However, it can also be a `double edged sword` if you use it naively. Even if you use `X`, since TypeScript is only a static-type checker, we need to back it up with runtime-type checkers like [zod](https://github.com/colinhacks/zod) or [yup](https://github.com/jquense/yup). Something else could make it type Y - and it is up to us as developers to make our code resilient against that with... what?

_How do we make our code resilient?_ TypeScript won't. Tests will.

I am going to say it here right now. TypeScript alone will not make your code resilient. TypeScript alone is just a great communication tool for developers. When it's paired with great tests, only then we will make quality applications that are great for the customer.

_Updated 3/5/2022_ Updated with what I think now. I'll have the followup to this post soon.
