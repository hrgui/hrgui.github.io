---
layout: ../../layouts/blog.astro
title: "Not again..."
date: "7/30/2022"
excerpt: I did it again.
---

I changed my website again. Notice anything different? Probably not.

That's because I did not change the look and feel. I just changed the underlying technology that powers this website.

# What was the problem with my previous developer experience (DX)?

As per my [last blog post about changing my website](/posts/new-site-who-dis-buildchain-part1), I went from [Gatsby](https://www.gatsbyjs.com/) -> [Next.js](https://nextjs.org/). The Next.js iteration of my website lasted about 8 months. It had a fair share of problems:

## Markdown did not live-reload.

I used [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) for my blog posts and portfolio. Most of my content are written in [Markdown](https://www.markdownguide.org/), except for the home page. When I was created a blog post, it was annoying to have to refresh the page over and over again in the workflow. I would write, for a long time, then I would see that it doesn't compile correctly. I would then have to trace back my steps, removing a lot of my blog post. I felt like I was trapped in 2012, as when I was writing blog posts back then with a server, I had to do that. It was a very slow developer experience, and I hated writing because of this. However, it's 2022. DX doesn't have to be terrible, _ahem_.

I believe the DX was bad was because I was using `getStaticPaths()` in Next.js. This required reading from the filesystem, and was not hot-reloadable because this was not within React or the client scope. It was within Next.js. The bandaid was worse because I was using `[dynamic].tsx` pages, and to get that information, Next.js would need to continually watch the filesystem to prompt Next.js to hot reload.

I believe there might be a solution for my problem, if I google hard enough.

```
next.js markdown live reload
```

I came up with this result: [next-remote-watch](https://github.com/hashicorp/next-remote-watch). It continually watches the filesystem for markdown files and reloads the Next.js server in response. Was this enough for me to stay with Next.js?

## I like to play the JavaScript limbo these days

When I converted my website to Next.js, my lighthouse score was already at 97+. For a website like this, I believe I can deliver content faster to you. I believe I can go faster.

To me, the _fastest_ pages are pages that do not need to render with JavaScript or any framework/library at all. How can I achieve this while still achieving for a cool-looking website? Or can I do a hybrid approach?

## I wanted to be able to go beyond React.js.

With Next.js, I was stuck with [React.js](https://reactjs.org/). Next.js doesn't have support for other frameworks.
[Remix](https://remix.run/) will someday have support for other frameworks - but not now.

_START SIDE TANGENT_

Also, Remix does not believe in my use case. My use case is that **I do not want to spend any money whatsoever in my site**, except for my domain name. Remix requires using a server. There is [Vercel](https://vercel.com/), but I wanted to not write any server-side code whatsoever. The less code that I write, the less worry, the less anxiety I have with my site.

I publish my pages on [Github Pages](https://pages.github.com/). It's free, if the code is open source.

_END SIDE TANGENT_

I am strong advocate that we, as humans, should always constantly strive to learn to be better at their craft. I believe React.js is not the end of all frameworks; nor is any other JavaScript framework out there. It is really up to us to choose whether we want to learn, or we stay safe with the normal. We can stay in the monotony of the endless repeating cycle of doing the same thing. Or we can strive to learn. Not learning anything new is not fun for me, nor it will make me any better as a Software Engineer.

On the side from work, I have been learning things beyond what I know. At work, I do React and [Node.js](https://nodejs.org/). On the side, I am currently learning [Vue.js](https://vuejs.org/) and [Go](https://go.dev/). I've learned a lot of interesting concepts that I hope I can apply to the web apps I create in the future. The reason why I do this is because I always believe that we should be able to the serve the best, or serve even better web applications - and that requires getting more than just 1 opinion.

So what will allow me to do this?

# Enter Astro

<a href="https://astro.build/" target="__blank">
  <div class="aspect-w-16 aspect-h-9 p-4 bg-black">
    <div class="flex items-center justify-center">
      <img class="w-3/4 h-auto max-h-16 sm:max-h-32" src="/images/blog/astro.svg" alt="Astro">
    </div>
  </div>
</a>

[Astro](https://astro.build/) is the new kid on the block.

- I would say it's the hot lady in a meme that's walking and the guy is looking at it. React/Next.js is looking at the guy astonished.
- It's the Buzz Lightyear, while Next.js is the Andy (_I dont want to play with you anymore_)

I'll go into detail to why I changed to this in 1 day.

## Markdown are native pages by default, so they hot reload.

With [Astro, Markdown pages have built-in support.](https://docs.astro.build/en/guides/markdown-content/) I'm currently writing this blog post with Astro, and it's bliss to have the markdown on the left, and the actual output on the right hot-reloading as I go.

I also didn't have to use libraries like [gray-matter](https://www.npmjs.com/package/gray-matter), or use next-mdx-remote, or write my own glob matcher for it. It's already baked in by default. Sweet.

## Astro is framework agnostic.

With [Astro, I do not have to be bound to React.js.](https://astro.build/integrations/). I can choose to make Astro components. I can choose to use React. I can choose to use Vue. The possibilities are endless, and that is what makes me excited. I've opened up a new simple platform that allows me to learn new technology for making web applications.

I believe how it does this is through Web Components. While inspecting the output of this page, I've noticed that I see `<astro-island />` and `<astro-slot />`, which I believe are web components defined by Astro.

## Astro utilizes the idea of partial hydration.

[Partial Hydration](https://docs.astro.build/en/concepts/islands/) (islands architecture) is the idea that page components can be seperated by islands. Islands are interactive, while static HTML aren't islands. By default, Astro generates every website with 0 client-side JavaScript, by default. If I choose to use a frontend UI component built with a library like React, [Preact](https://preactjs.com/) or Vue, Astro will automatically render it to HTML ahead of time, and then strip out all of the JavaScript. This will allow me to keep my site fast, by only requiring the user to download what they see.

<div class="aspect-w-16 aspect-h-9 bg-black">
  <div class="flex items-center justify-center">
    <img class="w-3/4"  src="/images/blog/islands-architecture-1.png">
  </div>
</div>

_[Islands Architecture, Jason Miller](https://jasonformat.com/islands-architecture/)_

To make the island interactive, I have to use `client:` directives in Astro components. For the time being, most of these pages will be rendered and hydrated with React, as I did a lift-and-shift port. However, I plan to go beyond that. I want to see how far I can go shipping only the JavaScript I need. Time to play [limbo](<https://en.wikipedia.org/wiki/Limbo_(dance)>) with web speed.

# How did I do this all in 1 day?

I have fully migrated the website as is, like if nothing changed. That is always my guiding principle when it comes to migrating things, otherwise I will never be done. I do not want scope creep.

I migrated the application incrementally, even though it may seem like I did it in a big bang. I used a long-living branch, and in each commit, I always ensured each commit was safe enough and demoable. When I commit, I try to make each commit meaningful as possible. I don't make commits that are half-baked, e.g. nothing works, or just random gibberish of a commit.

In my website, there are 3 sections:

- Home
- Blog
- Portfolio

The home was migrated first, and I created the [base layout](https://docs.astro.build/en/core-concepts/layouts/). At the same time, I swapped the packages from next.js to astro. I also tried to have the unit tests continously running so I update the unit tests as needed as I migrate. I call this the foundation layer of a web app, which I needed first. I could have tried to migrate everything all at once, but nothing will get done that way. That's because the rabbit hole is too big, and it becomes intimidating as the number of problems arised.

When the foundation layer was complete, then I was confident that I could get started with the other sections of the pages. Here, if I had a team, I could seperate the team into 2 tracks as each of sections described are like countries - they share the same world (the same layout), but they don't have too much of an overlap. Thie pitfall is that in team development, this may result in 3 different silos, at the cost of speed of delivery. However, I am only a single developer for my own website. I continued doing everything in incrementals in a serial fashion. That's how I was able to get everything done in 1 day, as I've limited the amount of problems I had as I incrementally migrated the website.

# The future

This is just the beginning. What you see now is not the final product, but it at least works.

The future will be faster, as that is the goal I am trying to achieve. I want to return to a time where JavaScript is just a cherry on top and something that is not required for viewing the application. The website will eventually be like that, and I will do that without the expense of interactivity.

This website serves as a testing ground of technologies that I want to try out and productionalize in a future app that I create some day. It will always evolve, but I just didn't find the right technology that allowed me to evolve the website in the idea of islands. Thanks to Astro, I am able to do that. I am able to play around with other frameworks and learn how to most effectively make a web application great for the end user.

I believe that is what seperates the extraordinary developers from the normal developers. I never settle, unlike _ahem, insert phone manufacturer here_. Never settling makes programming fun.
