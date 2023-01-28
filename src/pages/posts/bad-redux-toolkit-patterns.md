---
layout: ../../layouts/blog.astro
title: "How to fix bad Redux-Toolkit code: Data Fetching"
date: "1/28/2023"
excerpt: Redux Toolkit is great, but only if used correctly. In this blog post, I'll show some bad redux toolkit code used to do data fetching, and improve it to become resilient for our developers and users.
---

# What is Redux Toolkit?

NOTE: I am assuming you know what Redux is. If you do not, [read about it here](https://redux.js.org/), then come back.

[Redux Toolkit](https://redux-toolkit.js.org/) is my recommendation of using [Redux](https://redux.js.org/), hands down. It has everything out of the box:

1. `createSlice` to create the redux slice - the segment within our redux store where we can store our state. It's also powered with immer, so you're doing the latest and greatest patterns.
2. `createSelector` to create selectors that are powered by `reselect`, which memoizes selector functions. It's to help select data within our store's slice.
3. [`createAsyncThunk`](https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk) which can do data fetching, and anything promise-related.

However, when used incorrectly, Redux Toolkit will still lead into problems for our users and developer. Let's describe a common scenario: data fetching.

# How to do Data Fetching with Redux Toolkit?

There are many ways to data fetching with Redux Toolkit. I'll start off with the basic way of fetching data.

[`PokeAPI-TypeScript`](https://github.com/monbrey/pokeapi-typescript) is what we will be using to fetch data. It uses the public API [PokeAPI](https://pokeapi.co/). It also provides typings for Pokemon, which makes typing easy.

We can use `createSlice` to store the `status` of the data fetching and store the `data` received with the Pokemon.

Let's create the `PokemonState` type:

```ts
import { IPokemon } from "pokeapi-typescript";
type Status = "idle" | "loading" | "succeeded" | "failed";

type PokemonState = {
  data?: IPokemon;
  status?: Status;
};
```

1. `import { IPokemon } from "pokeapi-typescript";` contains the Pokemon type that we will need when the data is received. We initially set it to `null`.
2. `type Status = "idle" | "loading" | "succeeded" | "failed";` is the 2nd type that explains where we are in the data fetching cycle.
   a. `idle` - no work has been done.
   b. `loading` - we are in the process of fetching data
   c. `succeeded` - we have completed fetching data.
   d. `failed` - we are unable to fetch data.

We then can create our `initialState`. Our initial state does not have any data, so we pass in `null`, and the initial status is `idle` - no work has been done.

```ts
const initialState: PokemonState = {
  data: null,
  status: "idle",
};
```

We then can create the redux `slice` and the `selector`:

```ts
const pokemon = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
});

export const selectPokemon = (state: AppState) => state.pokemon;
```

To hook up `pokemon` reducer, we do the following:

```ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import pokemon from "./pokemon";

const rootReducer = combineReducers({
  pokemon: pokemon.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
```

It looks like it's doing a lot, but the most important bit to focus on is:

```ts
const rootReducer = combineReducers({
  pokemon: pokemon.reducer,
});
```

Every time we add another slice to our root reducer's store, we just import our slice, reference the reducer, and name the slice in our reducer ^. This defines how our state will look like.

We then can now use `react-redux` in our index.tsx:

```tsx
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Pokemon from "./components/Pokemon";

function App() {
  return (
    <Provider store={store}>
      <Pokemon name={"pikachu"} />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
```

But wait, we haven't defined what `<Pokemon />` is! Let's write that down in `/components/Pokemon.tsx`:

```tsx
type Props = {
  name: string;
};

export default ({ name }: Props) => {
  const pokemon = useAppSelector(selectPokemon);

  return <div>{JSON.stringify(pokemon)}</div>;
};
```

When we run our application, it will output the following:

```json
{ "data": null, "status": "idle" }
```

Now we're ready to do create an async thunk that fetches data. In our pokemon slice, we need to add the following:

```ts
import PokeAPI from "pokeapi-typescript";

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async (pokemonName: string) => {
    return PokeAPI.Pokemon.fetch(pokemonName);
  }
);
```

This creates an async thunk that we can dispatch. Calling it does nothing to our component, as we need to **react** to it.

In order to create a **reaction** to it, we use the `extraReducers` property in `createSlice`, and build cases for it:

```ts
const pokemon = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
```

1. When `fetchPokemon` is first dispatched, the status property becomes `loading`.
2. When `fetchPokemon` has completed (Promise fulfilled) fetching data, the status property becomes `succeeded` and we deliver the data via the `data` property.
3. When `fetchPokemon` has failed fetching data (Promise rejected), the status property becomes `failed`.

Still, nothing happens in our component. That's because we haven't dispatched the action/thunk yet. Let's update our component to do so:

```ts
export default ({ name }: Props) => {
  const dispatch = useAppDispatch();
  const pokemon = useAppSelector(selectPokemon);
  useEffect(() => {
    dispatch(fetchPokemon(name));
  }, [dispatch, name]);

  if (pokemon.status === "failed") {
    return <div>Error</div>;
  }

  if (pokemon.status !== "succeeded") {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>
        #{pokemon.data.id} {pokemon.data.name}
      </h1>
      <img
        src={pokemon.data.sprites.front_default}
        alt={pokemon.data.name}
      ></img>
    </div>
  );
};
```

Now, a Pikachu should be showing in our code.

I've attached this as a codesandbox below:

<iframe src="https://codesandbox.io/embed/redux-toolkit-basic-pokemon-93os18?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; padding: 16px; border:0; border-radius: 4px; overflow:hidden;"
     title="redux-toolkit-basic-pokemon"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

# And that's it!\*

Thanks for following along on this tutorial. In this tutorial, we learned how to fetch data from a public API using Redux Toolkit's `createSlice` and `createAsyncThunk`.

---

# That's not what you came here for though... are there problems with the code?

**Yes**, there are significant problems with the code. Here are the problems as bullet points:

1. The component can only be used once due to our redux state structure.
2. When 2 or more instances of `<Pokemon />` fetch the same data, it won't reuse the same XHR endpoint, it'll just use it's own.
3. If we choose to change Pokemon, it will show the previous Pokemon, switch to Loading, then load the next Pokemon

Lets improve the code to make it somewhat usable for a production application.

## Problem 1: The component can only be used once due to our redux state structure.

Suppose we do the following:

```tsx
<Pokemon name={"pikachu"} />
<Pokemon name={"charizard"} />
```

What will happen is that Pikachu will show up, then it flickers immediately to Charizard. It could also be the reverse also, depending on what comes first.

That is undesirable. We want to see both Pikachu and Charizard in the screen. How can we achieve something like that?

To fix, we need to change the way we handle our state. We need to assume that there can be many instances of `<Pokemon />` being called. We can use a Map data structure to resolve that, but in JavaScript we can use our friendly object - as it can act like a Map:

```ts
type PokemonState = {
  data?: {
    [name: string]: {
      data: IPokemon;
      status?: Status;
    };
  };
};

const initialState: PokemonState = {
  data: {},
};
```

When the application starts up, it has `{data: {}}` as the initial state. Later, when we start fetching for `pikachu`, we can use its name as the key to our map, and store the status and data:

```json
{ "data": { "pikachu": { "status": "loading", "data": null } } }
```

When we have finished loading the data, it'll look something like this:

```json
{ "data": { "pikachu": { "status": "succeeded", "data": {...} } } }
```

When we load Charizard, we'll have a separate entry in our map:

```json
{ "data": { "pikachu": { "status": "succeeded", "data": {...} }, "charizard": { "status": "succeeded", "data": {...} }  } }
```

Now we need to update our reducers, our selectors, and our `<Pokemon />` component. Let's start with our reducers:

```ts
const pokemon = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state, action) => {
        state.data[action.meta.arg] = { status: "loading", data: null };
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.data[action.meta.arg] = {
          status: "succeeded",
          data: action.payload,
        };
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.data[action.meta.arg] = { status: "failed", data: null };
      });
  },
});
```

1. We can use `action.meta.arg` as the key, as that is what is passed into `fetchPokemon`.
2. We need to create a new object in the `loading` state, as we don't have an entry for the specified key yet.
3. For every status, we provide the status / data keys appropriately. We create new objects per each case, but we can choose to reference the object directly. For this tutorial, assigning a new object is cleaner.

The selector now is updated to the following:

```ts
export const selectPokemon = (state: AppState, pokemonName: string) =>
  state.pokemon.data[pokemonName];
```

This is so that `pikachu` is only concerned with loading its own data. There's no need to re-render again when `charizard` is being loaded. Same for the other one.

The `<Pokemon />` component updates slightly:

```tsx
export default ({ name }: Props) => {
  const dispatch = useAppDispatch();
  const pokemon = useAppSelector((state) => selectPokemon(state, name));

  useEffect(() => {
    dispatch(fetchPokemon(name));
  }, [dispatch, name]);

  if (pokemon?.status === "failed") {
    return <div>Error</div>;
  }

  if (!pokemon || pokemon?.status !== "succeeded") {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>
        #{pokemon.data.id} {pokemon.data.name}
      </h1>
      <img
        src={pokemon.data.sprites.front_default}
        alt={pokemon.data.name}
      ></img>
    </div>
  );
};
```

Note that `pokemon` can return `undefined` or `null` now. When we check for the status, and data we need to have a defensive check `pokemon?` by [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining).

Of course, we can use [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), but that is an exercise left for the reader.

_Hint, this won't work:_

```ts
const { status, data } = useAppSelector((state) => selectPokemon(state, name));
```

Now we should see both Charizard and Pikachu in our page... but what if we wanted to have 2 charizards and 1 pikachu?

## Problem 2: When 2 or more instances of `<Pokemon />` fetch the same data, it won't reuse the same XHR endpoint, it'll just use it's own.

Ideally, if we have the following scenario, there is no point fetching the same data twice from the API:

```tsx
<Pokemon name={"pikachu"} />
<Pokemon name={"pikachu"} />
<Pokemon name={"charizard"} />
```

It's a waste to fetch pikachu twice. Imagine having `<Pokemon name={"pikachu"} />` 20 times. Do we want to make 20 calls to the API? Or just one?

We can do so with just one.

### A solution: via a promise cache

To solve this, we need to add a promise cache. The goal of the promise cache is to reuse the initial same promise if the same one has already came in.

The thunk slightly changes:

```tsx
type PromiseCache = {
  [id: string]: Promise<any>;
};

const promiseCache: PromiseCache = {};

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async (pokemonName: string, thunkAPI) => {
    if (promiseCache[pokemonName]) {
      return promiseCache[pokemonName];
    }

    promiseCache[pokemonName] = PokeAPI.Pokemon.fetch(pokemonName);
    return promiseCache[pokemonName];
  }
);
```

Now, when we call for Pikachu, we only do that once, and when we call for Charizard, it only happens once.

There might be other solutions that can solve this problem, but this is the one that I would come up with on the spot.

The updated code sandbox is below:

<iframe src="https://codesandbox.io/embed/redux-toolkit-pokemon-normalization-w7144z?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; padding: 16px; border-radius: 4px; overflow:hidden;"
     title="redux-toolkit-pokemon-normalization"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Problem 3: If we choose to change Pokemon, it will show the previous Pokemon, switch to Loading, then load the next Pokemon.

This is an exercise left for the reader. Here are the things to think about:

1. Does the problem exist in our first version of the state ` { data: IPokemon, status: Status}` OR does it exist in the second version `{data: {[name: string]: {data: IPokemon, status: Status}}}`? _Hint: it should only happen in one of these versions._
2. Why does this bug occur?

# It's better, but...

The new and improved solution still has issues. I can go on and on, but this becomes increasingly more expensive to maintain. Here are the other concerns that could occur:

1. How do we do retries? What if the first call failed? What happens?
2. How do we invalidate the cache(s)? We have two of them now. We're wasting space by `O(2n)`.
3. Why did we have `status !== "succeeded"` as `loading`? This is because we have two states, `idle` and `loading`. We don't have a `idle` state, so we lumped it with `loading`.

In the tutorial, I have written a lot of code. It feels like we require a lot of code just to do data fetching in React. This is where a lot of people start to deliberately hate React, because they immediately jump to conclusions that this is the only maintainable way of writing React.

Don't lose hope though! There are better ways! Let's start with one of them, while still using redux.

# Enter Redux Toolkit Query (rtk-query)

[rtk-query](https://redux-toolkit.js.org/rtk-query/overview) is a powerful data fetching and caching tool included with Redux Toolkit. A lot of the code that I have written today, we can throw away. It ends up becoming maintainable.

Remember our pokemonSlice? Since we used it for data fetching, **we no longer need it**. In fact, we are going to setup **rtk-query** instead.

First, our pokemon slice becomes an `api`:

```ts
import { createApi } from "@reduxjs/toolkit/query/react";
import PokeAPI, { IPokemon } from "pokeapi-typescript";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: async (pokemonName) => {
    const data = await PokeAPI.Pokemon.fetch(pokemonName);
    return { data };
  },
  endpoints: (builder) => ({
    getPokemonByName: builder.query<IPokemon, string>({
      query: (name) => `${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;

export default pokemonApi;
```

We have to define `endpoints` and a `baseQuery`, or each `endpoint` needs to have their own `queryFn`.

In this case, we are using `endpoints` and `baseQuery`.

```ts
endpoints: (builder) => ({
  getPokemonByName: builder.query<IPokemon, string>({
    query: (name) => `${name}`,
  }),
});
```

This tells rtk-query that there is an endpoint called `getPokemonByName`. Since we aren't using `queryFn`, the `query` we pass in is an argument to `baseQuery`.

Our `baseQuery` is defined as the following:

```tsx
baseQuery: async (pokemonName) => {
  const data = await PokeAPI.Pokemon.fetch(pokemonName);
  return { data };
};
```

The return type of `baseQuery` needs to be either one of the following:

Success

```ts
return { data: YourData };
```

Error

```ts
return { error: YourError };
```

The TypeScript type looks like the following:

```ts
Promise<
  | {
      data: any;
      error?: undefined;
      meta?: { request: Request; response: Response };
    }
  | {
      error: {
        status: number;
        data: any;
      };
      data?: undefined;
      meta?: { request: Request; response: Response };
    }
>;
```

For every endpoint we write, it is now a react hook that we can use, since we are using `@reduxjs/toolkit/query/react`:

```ts
export const { useGetPokemonByNameQuery } = pokemonApi;
```

All of this can be found in the [redux-toolkit API docs](https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-queries-with-basequery).

Now what about our component? Here's how it will look now:

```tsx
import { useGetPokemonByNameQuery } from "../store/pokemon";

type Props = {
  name: string;
};

export default ({ name }: Props) => {
  const { data, isLoading, isError } = useGetPokemonByNameQuery(name);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>
        #{data.id} {data.name}
      </h1>
      <img src={data.sprites.front_default} alt={data.name}></img>
    </div>
  );
};
```

1. We no longer need to use `useEffect`, `dispatch`, `useSelector(...)` explicitly. The code no longer knows it's a part of Redux.
2. We no longer need to maintain our own `status` and handle each case.
3. Everything is encapsulated into `const { data, isLoading, isError } = useGetPokemonByNameQuery(name)`.

<iframe src="https://codesandbox.io/embed/pokemon-rtk-query-2i4034?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; padding: 16px; border-radius: 4px; overflow:hidden;"
     title="pokemon-rtk-query"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

# So what have we learned today?

In my career, I've met a lot of folks that are quick to bash on React. I believe it has to do with the environment they were grown in. They were led to believe that the only way to do React is with Redux.

Then they are left to believe that the only way to do data fetching is with Redux, and they are led to believe that it is the only maintainable way. However, as I proved in this blog post, that itself can **also** lead into unmaintainable code, and code that only works for one use case. That was the first example, where we use redux-toolkit's `createSlice`, `createAsyncThunk` with a state slice structure like `{data: IPokemon, status: Status}`.

If we wanted to reuse the code, call it more than once, we then have to add normalization to our code, which then transforms the state slice structure to `{data: {[name: string]: {data: IPokemon, status: Status}}}`. While that allows us to reuse the code a little bit more, it still has a lot of problems, and the code still becomes less resilient.

At this point, this is where I see a lot of people tend to give up and immediately bash React. React did not tell you to use it with Redux. You chose to do it that way. React could care less. In fact, we could have done the following:

```tsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
useEffect(() => {
  async function doFetchPokemon() {
    setLoading(true);
    try {
      await fetchPokemon(name);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  doFetchPokemon();
}, []);
```

This works, and we did not have to use Redux. However, this has its own share of problems that a lot of React developers have faced. It is less code though than what I have shown for the first part of my tutorial, though!

The nice thing about React, and modern frontend technologies is that there is a lot of us that has faced the same kind of problems. To truly make your application code resilient, you can either create your own, or use a library that has solved this problem. That is why I recommend to use the following when we want to scale with data fetching in our frontend applications:

1. [rtk-query](https://redux-toolkit.js.org/rtk-query/overview), which solves the problem of data fetching in Redux entirely, and eliminates a lot of boilerplate. This leaves the option of integrating it with our Redux states, but then it begs the question - do I really need these redux states anymore? What redux do I need now?
2. [tanstack/query](https://tanstack.com/query/latest) are for folks that do not have Redux in their stack. It does everything `rtk-query` can, but I believe this came first. It also works for Solid, Vue, and Svelte.
3. [SWR](https://swr.vercel.app/) is an alternative to tanstack/query.

All of these libraries have solved the problems that I have mentioned in today's blog post, and we end up creating more resilient code. Hopefully, this makes data fetching in React more fun, and more to the point of getting data effectively to our users.
