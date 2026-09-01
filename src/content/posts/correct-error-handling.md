---
title: "What is the correct way to handle an Error in Software?"
date: "1/12/2025"
excerpt: I'll talk about my opinion on the correct way to handle an error in software.
---

Over the past year, I've been improving the way I handle errors in software. I often thought it would be sufficient enough to just try/catch the entire application and log an exception to a service. However, when developing an application in a large organization which requires communicating with other teams and with millions of users, it requires more thoughtfulness and attentiveness to how errors are handled.

# The wrong way to handle an error: To not consider that the application will go into an error.

Let's take an example:

```ts
async function fetchPokemon(nameOrId: string) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + nameOrId);
  const json = await response.json();
  return json;
}
```

This function, for its worth: it does fetch a pokemon that exists, such as `pikachu`. However, it begs questions:

- **What if the Pokemon does not exist? Like `pikablu`**?
- **What will happen to `fetchPokemon` if it was used this way, in a React component?**

```ts
// somewhare up above
const [isLoading, setIsLoading] = useState(false);
const [pokemon, setPokemon] = useState(null);

// in a useEffect probably
function doFetchPokemon(nameOrId: string) {
  setIsLoading(true);
  const pokemon = await fetchPokemon(nameOrId);
  setPokemon(pokemon);
  setIsLoading(false);
}

// somewhere else in the component
doFetchPokemon("pikablu");
```

At this point, while it could be sufficient enough to say we've completed our job since a Pokemon's data could be fetched, I would argue that we need to take care of these cases. It falls under the quote for user interfaces:

> A user interface is like a joke. If you have to explain it, it’s not that good.

https://x.com/martinleblanc/status/466638260195041280

A function that someone can use is an application programming interface, an API, technically the most primitive version of a user interface. It's a user interface for a developer. Typically, people often resort to using jsdoc next, and explain it there.

As an exercise for the reader, this is something to think about. Why are the `fetchPokemon` and `doFetchPokemon` functions presented here, terrible jokes?

# The wrong way to handle an error: On Error Resume Next... and that's it.

I used to work on VBScript scripts that can be used to automate certain workflows. On some scripts, I often see this statement:

```vb
On Error Resume Next
```

While that is a way to handle errors, sometimes people forget in VBScript that it has to be followed with the following block:

```vb

SomeCodeHere

' error handling block
If Err.Number <> 0 Then
  WScript.Echo "Error in SomeCodeHere: " & Err.Number & ", " & Err.Source & ", " & Err.Description
  ' Clear the error or you'll see it again when you test Err.Number
  Err.Clear
End If
```

Without this error handling block, the application may run into unusual side effects. Sometimes when I was debugging this type of script, often times I would get logs that are just

```
undefined is not a function
```

The number, and source may not always be filled in (for some reason it was not for me, but it was quite a long time ago).
