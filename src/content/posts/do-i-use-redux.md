---
title: "Do I use Redux?"
date: "11/3/2020"
excerpt: I am a React Developer. Do I use Redux? Insert attention-grabbing thing here to make you click.
---

Usually, when someone thinks of making user interfaces in web applications these days, the number one library they go to is [React.js](https://reactjs.org/). It's my number one library that I think of also - and I just love expressing my input, putting into a function, and the output is going to be a component, or heck, a master component that represents a user interface.

Now, React is not a framework. (I've just added myself to the number of articles that say this.) It does provide a way to manage global state called React Context. In simple cases, it works fairly well. In complex cases, it starts to run into performance problems, or the only problem that React developers worry about: Rerendering too often. React does provide ways to also solve that, by providing `shouldComponentUpdate` in class components, which is a great way to prevent complex trees from getting re-rendered; and the `memo` class of things for functional components. However, if you have components that directly subscribe to the context, it will be subject to a re-render in the following situation:

Some component out there:

```
Update {theme.backgroundColor: "white"}
```

Component that suffers from a re-render due to theme.backgroundColor:

```
Reads {theme.textColor: "black"}
```

There are roughly [3 popular options](https://github.com/facebook/react/issues/15156) as of today to solve this problem in React. There is another way that people tend to grab right away, though, and for some reason.... it's the first or only option that people think of: using Redux. [Redux](https://redux.js.org/) is a predictable state container for applications, and is much more performant since it doesn't use React Context and doesn't suffer in those problems if the selectors are correct. Redux, I can bet, is the closest thing to React in resumes because people are just too eager to jump to it.

# Only when it makes sense

**When managing user state?** Yes. User state is across multiple components, and we have to deal with permissions.
**When managing Global UI Look and Feel, e.g. Dark Mode?** Yes. Global UI Look and Feel tends to affect other components fairly easily.

Now for both, Redux isn't the only solution. React Context can do it too. Heck, we can also just use CSS variables for Global UI Look and Feel.

# When it simplifies the problem, not complicate it

If my app is a single component, it's debatable whether we really need Redux right away.

Take a counter, for example:

```js
import React from "react";
import ReactDOM from "react-dom";

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

ReactDOM.render(<Counter />, document.getElementById("root"));
```

Now, with Redux, perhaps we start with something like

```js
import React from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";

function counter(state, action) {
  if (typeof state === "undefined") {
    return 0;
  }

  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);

export function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
```

Note: I didn't do the traditional action creators, because I find that it is not necessary for this application. If we did want action creators and what not, it's always best to use something that takes care of that for us, e.g. [`@reduxjs/toolkit`](https://www.npmjs.com/package/@reduxjs/toolkit), which becomes like:

```js
import React from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment(state) {
      state = state + 1;
      return state;
    },
    decrement(state) {
      state = state - 1;
      return state;
    },
  },
});

const store = createStore(counterSlice.reducer);

export function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>
        +
      </button>
      <button onClick={() => dispatch(counterSlice.actions.decrement())}>
        -
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
```

Now, we need to ask ourselves - did we really need Redux here? It's a single component application. Will it become a larger application? Who knows.

Often times, I come across this problem - I tend to anticipate the application growing larger, so I tend to set myself up for the future. The past me would often just grab Redux because hey, I think the application will grow larger and I didn't want to write any more code later on.

That isn't always the case. Sometimes, we tend to have applications that just do it's job fine as is; which ultimately, we can say Redux can become a trap for overengineering something when we actually didn't need in the first place.

# What's a good application of Redux?

Redux is great when:

- the whole application needs to know about the change, e.g. a Login / Logout
- UI skins, UI state
- Storing data in terms of fetching for caching purposes

Redux is not great when:

- the whole application could care less about the state change, e.g. forms, local state

In the counter example, I'd say an incrementing counter / decrementing counter needs more justification to why the whole application needs to know about it. If it was part of a cart in online store, it can make sense. For example, you're adding items in your cart, and then you need to show what's in stock. The cart and the search list are in two seperate component trees, but they share the cart data model. If the list knew how many were in stock and we know how much we put in the cart, instead of drilling down state, we can use Redux for this.

Yet, Redux isn't the only choice for a cart. React Context, Client-Side GraphQL, and anything anyone could potentially come up with could be an answer. Redux is the most popular choice.

# Summary / Conclusion

Do I use Redux? Yes, I do. If I do, I do it when it makes sense - global state, the whole application needs to know about it, or caching purposes. If it's a simple application, and if I can get away with local state, then I will use local state.

At the same time, I am a GraphQL developer. [GraphQL does have solutions for a cart, via local data](https://www.apollographql.com/docs/react/local-state/local-state-management/), but from my past experiences, it's not so straightforward compared to Redux.

Yet, there's always another solution out there that everyone's coming up with. That's what I love about web development - there isn't 1 solution that fits all and we have to use it that way. For example, I could do the same counter with [React Query](https://github.com/tannerlinsley/react-query).

At the end of the day, I see code always something that evolves as requirements evolve. It stops evolving when there are no requirements, and when there's nothing else we can potentially do to improve it. When working with teams, no matter what we choose for state management, always do what makes sense during that time - not for the future. We don't know what the future could entail, and if we tend to over-anticipate a future, sometimes that effort may be in vain if that future doesn't end up holding true. The most important thing with teams is the understandability of the code, not what we chose. So if we choose Redux, but only 1 person understands it or is for it, we need to discuss what we need to do to improve the maintainability of the code.
