---
layout: ../../layouts/blog.astro
title: "Part II: I miss TypeScript"
date: "4/16/2022"
excerpt: I've been working without TypeScript for the past 2 months. It is... rough.
---

This is the continuation to [How I Feel about TypeScript](/posts/how-i-feel-about-typescript-part1). If you haven't read it, I would encourage reading it before reading the next post.

I just recently decided to take on a journey without TypeScript for the time being. I wanted to see how it feels like. To me, writing JavaScript without TypeScript is coding with blinders. That's how it felt like for the past 2 months.

# Developing without TypeScript is often a game of guessing

In the current codebase that I work with, everytime an error occurs in the web application, it just shows "An error occurred!". No clear stack trace. It often ends up being a guessing game. Where did I make that mistake?

Here's a trivial example. For strings, we can transform the output of the string to uppercase. There's a function for that. Let's see how that works:

```js
"Hello World".toUppercase();
```

When I run the codebase, I get the infamous "An error occurred!". It'll be somewhere, in the large sea of code. If it's with tests, then it'll be caught. If it's without tests, who knows when this will be caught. It'll most likely be caught when my user works with my application. It could be the most critical portion too! When the user is about to give you money, and if this happens, this is a breaking moment.

If you still haven't figured out the error, here it is:

```ts
"Hello World".toUppercase();
/**               ^ this is the error
any
Property 'toUppercase' does not exist on type '"Hello World"'. Did you mean 'toUpperCase'?ts(2551)
lib.es5.d.ts(494, 5): 'toUpperCase' is declared here.
*/
```

# JSON objects without TypeScript is a guessing game

As a web application developer, I often work with JSON objects as that is the common medium that is used to get data. I often call that a **query**. Suppose we are Star Wars fanatics that want to utilize the https://swapi.dev/ API, and our task is to show all the people associated with Star Wars.

The first typical thing to do is go to that website, and look at the documentation. After reading the documentation, then we figure out we need to do the following:

```jsx
export function getStarWarsCharacter(id) {
  const res = await fetch(`https://swapi.dev/api/people/${id}/`);
  const json = res.json();
  return json;
}
```

When there's a test, it may or may not be helpful for describing the JSON object's return. Let's describe what are useful tests, and what aren't useful tests:

```jsx
it("should give me Luke Skywalker back when I fetch id=1", async () => {
  const data = await getStarWarsCharacter(1);
  expect(data.name).toEqual("Luke Skywalker");
});
```

This test is useful for only 1 thing: If I get the Star Wars character, it will for sure have the `name` property. What if I wanted something else? This test won't give you that information. Someone could even argue that this is 100% coverage for the happy path. However, it actually has a lot of other useful properties, e.g. height, mass, hair_color, skin_color, eye_color, birth_year, and the list goes on.

```jsx
it("should give me Luke Skywalker back when I fetch id=1", async () => {
  const data = await getStarWarsCharacter(1);
  expect(data).toMatchSnapshot();
});
```

This is better, but in the first glance it is not so obvious. What is `toMatchSnapshot()`? It is a part of [Snapshot Testing](https://jestjs.io/docs/snapshot-testing). On the test first run, we create a `.snapshot` file, then it saves a record of what it was at that time. Upon consecutive runs, the test will evaluate and check the `.snapshot` file. If there's a difference, it will be a failure (red), and we'll be asked if that is correct or if it requires to update.

Now, does a snapshot help describe the object? Yes, but only if you knew that piece of information my last paragraph was describing. If you did not, then the test actually adds a layer of extra direction on what the test is trying to describe. In fact, you'll need to know where the snapshot is saved before actually understanding what the shape is supposed to look like.

Luckily there is something better. It is called `toMatchInlineSnapshot()`. Take a look:

```jsx
// note, the actual output will look similar to this, but i was too lazy to actually run it on an actual app
// the spacing is probably better in a right app
it("should give me Luke Skywalker back when I fetch id=1", async () => {
  const data = await getStarWarsCharacter(1);
  expect(data).toMatchInlineSnapshot(
    `{
	"name": "Luke Skywalker",
	"height": "172",
	"mass": "77",
	"hair_color": "blond",
	"skin_color": "fair",
	"eye_color": "blue",
	"birth_year": "19BBY",
	"gender": "male",
	"homeworld": "https://swapi.dev/api/planets/1/",
	"films": [
		"https://swapi.dev/api/films/2/",
		"https://swapi.dev/api/films/6/",
		"https://swapi.dev/api/films/3/",
		"https://swapi.dev/api/films/1/",
		"https://swapi.dev/api/films/7/"
	],
	"species": [
		"https://swapi.dev/api/species/1/"
	],
	"vehicles": [
		"https://swapi.dev/api/vehicles/14/",
		"https://swapi.dev/api/vehicles/30/"
	],
	"starships": [
		"https://swapi.dev/api/starships/12/",
		"https://swapi.dev/api/starships/22/"
	],
	"created": "2014-12-09T13:50:51.644000Z",
	"edited": "2014-12-20T21:17:56.891000Z",
	"url": "https://swapi.dev/api/people/1/"
}`
  );
});
```

This is **much** better than `toMatchSnapshot()`. This is because the snapshot is colocated with the code. It also describes the shape in the test at this point.

So let's recap on where we arrived at so far.

1. We read swapi.dev and that's how we get the shape. We created a function for others to use.
2. We created a simple test and it shows that it has a name property.
3. We created another simple test and it has a snapshot in another file.
4. We created another simple test that describes the shape inline the test.

So it seems like we moved the swapi.dev documentation in the code, which is the unit test. That is a lot better, but opening unit tests or website documentation to understand a JSON shape is a pain. Ideally when I call `await getStarWarsCharacter(x)` I expect that the autocomplete would know what to do. My editor doesn't know Star Wars characters though! That's when TypeScript is useful.

In an ideal world, every API that I work with describes itself programatically, not just through documentation. In the case of swapi.dev, it has a schema endpoint, but currently at the time of writing, it returns the following:

```json
{ "detail": "Not found" }
```

If it did work, and it returned JSON Schema, we then can use [JSON Schema To TypeScript](https://www.npmjs.com/package/json-schema-to-typescript). From there, we then can improve our function:

```tsx
export function getStarWarsCharacter(id): Promise<SWPerson> {
  const res = await fetch(`https://swapi.dev/api/people/${id}/`);
  const json = res.json();
  return json;
}
```

```ts
interface SWPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}
```

Now, when I do use the `getStarWarsCharacter()` function, and if I make a typo like the following:

```tsx
const data = await getStarWarsCharacter(1);
console.log(data.Mass);
/*                ^ this is the error
SWPerson
Property 'Mass' does not exist on type '"SWPerson"'. Did you mean 'mass'? ts(2551)
*/
```

I will know before I even go to swapi.dev. I will know before I even read the unit test. That is how great TypeScript is. In fact, I can even say I don't need Internet. However, in this case I do because I need it to fetch something from the internet.

# TypeScript can enables better workflow if used correctly

In the swapi.dev example earlier, if there was a change in the swapi.dev endpoints, the most typical thing that people love to do is do the change manually. That is only needed if it is the API is not self-describing at all. That is prone to mistakes, because a human is behind this change - and humans are suspectible to errors.

If the API was self-describing, with either [OpenApi](https://swagger.io/specification/), [GraphQL](https://graphql.org/) or with anything that describes the shape through an endpoint [Django REST Framework](https://www.django-rest-framework.org/), stop what you're doing. Just stop. Seriously. You are wasting time.

For OpenAPI, we can use [openapi-typescript](https://www.npmjs.com/package/openapi-typescript), which auto generates a TypeScript client for you. You won't even need to know if your endpoint was called `/meow` or `/meowwww`. You could care less what it was called, as long it was described well.

For GraphQL, we can use [graphql-codegen](https://www.graphql-code-generator.com/), which auto generates any code for you from your GraphQL Schema and operations.

I could go on and on. If paired with Github Actions, we could leverage repository dispatch between 2 repos to always constantly update TypeScript repos. If everything was in 1 repo, we can update everything, the UI and the API. Not manually. Automatically. That is how powerful it is. No need to have a manually created documentation website.

# Summary

I miss TypeScript. I've been working with only JavaScript for the past month or so, and it feels like I've gone back in timem where I often code JavaScript by guessing. I also miss workflows that inform or update me on API changes. I know in my last post I might have been against TypeScript. However, with large teams, and in large corporations, TypeScript will save the organization a lot of time. That is how great TypeScript is.
