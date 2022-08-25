---
layout: ../../layouts/blog.astro
title: "The road to becoming a TypeScript Ninja: JSON, keyof, typeof"
date: "8/25/2022"
excerpt: "I'm currently on a journey to make myself a TypeScript ninja. Come join me for a long part series of things I learn new on TypeScript!"
---

Just recently I read [TypeScript is terrible for library developers](https://erock.prose.sh/typescript-terrible-for-library-developers). I am not a library developer. The TypeScript I write is more of an app developer. I consume libraries, and I use them. I don't feel the pain, but I think I should to understand TypeScript like a ninja.

<div class="flex items-center justify-items-center w-full bg-black p-4 m-4">
<div class="mx-auto"><blockquote class="twitter-tweet"><p lang="en" dir="ltr">The more your <a href="https://twitter.com/hashtag/TypeScript?src=hash&amp;ref_src=twsrc%5Etfw">#TypeScript</a> looks like <a href="https://twitter.com/hashtag/JavaScript?src=hash&amp;ref_src=twsrc%5Etfw">#JavaScript</a>, the better the libraries / abstractions you use are. Juggling all the generics and overloads and madness internally, so you don&#39;t have to :)</p>&mdash; Dominik 🇺🇦 (@TkDodo) <a href="https://twitter.com/TkDodo/status/1507683205310291972?ref_src=twsrc%5Etfw">March 26, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div>
</div>

# Today I learned TypeScript knows how to import JSON files.

This was introduced in TypeScript 2.9+. TypeScript is now at 4.7. I feel my knowledge of TypeScript is antiquated... but that's okay. I am ready to learn.

To import a JSON file, the tsconfig.json must have the following:

```json
"resolveJsonModule": true
```

```json
{
  "a": "apple",
  "b": "boy",
  "c": "cat"
}
```

```ts
import messages from "./i18n.json";

messages.a; // doesn't
messages.e; // would error
```

This can be useful for dealing with static i18n files - local. I believe we can then type our component in a certain way!

```tsx
import React from "react";
import messages from "./i18n.json";

type Props = {
  i18nKey: keyof typeof messages;
};

const Trans = ({ i18nKey }: Props) => {
  return <div>{messages[i18nKey]}</div>;
};

const App = () => {
  return <Trans i18nKey="d" />; // errors because d is not part of messages
};

export default Trans;
```

# Woah, hold up, what's typeof?

`typeof` only works in TS files, not `.d.ts` files. This takes in any JavaScript type and runs type inference for it.

So...

```ts
type Messages = typeof messages;
```

becomes...

```ts
type Messages = {
  a: string;
  b: string;
  c: string;
};
```

# OK, what about keyof?

If I just want the keys, then... how does that work? We can use `keyof`:

> The keyof operator takes an object type and produces a string or numeric literal union of its keys.

So in the case above:

```ts
type MessageKeys = typeof keyof messages;
```

is now the same as

```ts
type MessageKeys = "a" | "b" | "c";
```

# But I have my own object though!

That's where it gets tricky. Not sure how that would work. If I find something, or if anyone finds something, would love to know!
