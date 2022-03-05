---
hidden: true
template: blog
title: "How I Feel About TypeScript - Part II"
date: "3/5/2022"
excerpt: If you're a TypeScript developer that wished everything was just JavaScript, think about it, especially in large teams, or introverts.
---

This is the continuation to [How I Feel about TypeScript](/posts/how-i-feel-about-typescript-part1). If you haven't read it, I would encourage reading it before reading the next post.

I label myself as a [introvert](https://www.webmd.com/balance/introvert-personality-overview). To this day, I am still improving the way I communicate across family, team, and across people in general. I think TypeScript can help Frontend developers who lean towards being more introverted, because it enables better code without needing to communicate a lot. TypeScript will do the communication for us.

# TypeScript is a great documentation tool without requiring developers to read or write long documentation.

A common problem that I often encounter in my day-to-day with Frontend Engineering is when thinking about the following scenario:

## If I wanted to recreate scenario X in a test, what are the steps to recreate it?

## How do I use this function?

## What's the shape of this variable?

# TypeScript is a great communication tool between Backend and Frontend developers, especially mixed developers.

## OpenAPI

## GraphQL

# TypeScript allows you to write better tests

# Wrap-up - How I really feel about TypeScript

## The analogy of TypeScript vs JavaScript

When finding an item in a supermarket, the quickest way is to ask a store clerk.

> Exxcuse me, where can I find this item X?

In a small store, the answer is usually concise:

> Aisle Y

In a large store, the answer could be one of the following:

> Sorry, I don't work here, I just work in this booth.
> Sorry, I don't really remember, but I think it's somewhere in the northwest of this building.
> Aisle Y.

In the first 2 responses, it requires asking more than 1 store clerk. For the response of `Aisle Y`, about 90% of the time it should be correct, but there is a 10% chance that it may require an update (for example, aisles were recently switched). For that case, that also may require asking another store clerk.

We can say the same for JavaScript-only repos. When things aren't documented, we'll need to ask the team on how to use and develop on top of the code. However, when they are documented statically (e.g. a Markdown / PDF / a Person), it requires the team to maintain it, and may get out of date soon.

The TypeScript equivalent of the analogy is the following:

When finding an item in a supermarket, use the app.

If the store clerks only have 1 way of managing and sorting items (aka using a device), then we can say that is closer to a `strict:true` TypeScript environment - when using type X, it will be always up to date.

If the store clerks have more than 1 way, then we can says its closer to a `strict:false` or JavaScript environment with documentation - because the App itself can mislead the direction. It could say aisle Y, but it moved to aisle X.

# TODO

- [ ] Remove this TODO
- [ ] Provide examples for TypeScript is a great documentation tool
- [ ] Finish the other sections.
