---
title: "React Class Components VS Functional Components I: Class Component's this"
date: "7/5/2020"
excerpt: This is part I of my long running series of React Class Components VS Functional Components
---

I am a Frontend Software Engineer, I love making user interfaces, I love making applications work.

One of the tools in my toolbox is the [React.js](https://reactjs.org/) (React) JavaScript library for building user interfaces.

What I love about React is how easy it is to build building blocks of interfaces, in which they call **components**. This is how the React website advertises their way of making components:

```jsx
import React from "react";
import ReactDOM from "react-dom";

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById("hello-example")
);
```

**Components** have the following specs:

- **Input (props)** Input to the component. An example would be `color`. Changing the `color` influences the render method to adjust to the color if the render method has something that changes accordingly to that.
- **State** Data that the component holds that is local to the component. It may be also be props for other components. State also influences the react component, but it is not visible/ necessarilly controllable to the user of the component. Think of it like a smartphone. A smartphone has an operating system which has a lot of internal state. It helps the smartphone function and show certain apps in a certain way, but the user may or may not have control over internal state functions.
- **Output: A render method**: It is a function; given props (inputs) and state, what should the output look like? In Web development, the output is something that's usable for the web, which uses the Document Object Model (DOM). In Mobile / Native, the output is something that's usable for mobile devices, which depends on what we're outputting to - which could be Android, iOS, or Windows devices.

Now I am quite surprised that the React team hasn't changed the way they advertise making components. Ever since [October 2015 (0.14)](https://reactjs.org/blog/2015/10/07/react-v0.14.html) and this [talk](https://www.youtube.com/watch?v=dpw9EHDh2bM), we have another way of creating components:

```jsx
import React from "react";
import ReactDOM from "react-dom";

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById("hello-example")
);
```

To me, this was a mindblower: with just a **function** we can write a user interface. We don't need a class to make a component.

I then ask myself, is the really a reason to write class components anymore? We'll find out in this blog series.

# Part I: `this`

One of the things that always confused me for class components is `this`. `this` is a way to access member properties in a JavaScript class instance, whether it's in the constructor, or whether it's in a member function.

## 1.1 this needs to be binded to the React Class Component's instance.

In `React.Component` it works similarish, with one exception: All member functions need to be rebinded by `this`.

```jsx
import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Compnent {
  state = {
    count: 0,
  };

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));
```

When clicking on + or -, we get `Cannot read property 'count' of undefined`. Now I haven't really looked under the hood of React much, but I can infer the following:

```jsx
<button onClick={this.increment}>+</button>
```

We are telling React, hey, for the `onclick` property of the DOM button, we pass in the function `this.increment`. The function `this.increment`, when called by itself does not know about the class instance.

We can confirm this by `console.log(this)`, which gives us `Window {parent: null, opener: null, top: null, length: 1, frames: Window…}`.

An easy way to fix it is to wrap the onClick prop as an arrow function:

```jsx
<button onClick={() => this.increment()}>+</button>
<button onClick={() => this.decrement()}>-</button>
```

Note: why an arrow function? If we didn't use an arrow function, like so, what would happen?

```jsx
  <button
    onClick={function onClick() {
      this.increment();
    }}
  >
    +
  </button>
  <button
    onClick={function onClick() {
      this.decrement();
    }}
  >
    -
  </button>
```

We would get the same problem as before. This is because arrow functions inherit `this` from the last function or class that is not an arrow function; a function that uses the `function` keyword or `class / constructor` keyword. So in the case for `render`, the `this` keyword is correctly bound to the instance, becuase React is the caller; React calls render - not the DOM. The DOM was called by the user's click event.

Using what we learned, we have a couple more ways to solve the problem:

```jsx
import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  state = {
    count: 0,
  };

  constructor() {
    super();

    this.increment = () => this.setState({ count: this.state.count + 1 });
    this.decrement = () => this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  rootElement
);
```

_Traditional way, but wait, state is initialized in a non-traditional way??_

```jsx
import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  state = {
    count: 0,
  };

  increment = () => this.setState({ count: this.state.count + 1 });
  decrement = () => this.setState({ count: this.state.count - 1 });

  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  rootElement
);
```

_The non-traditional way, using_ [public instance fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields).

Both ways produce the same result: the component works, which is what matters.

In fact, if we bring in the principles we know about `this` from ES5, we could also leverage our friend [`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)

```jsx
import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Compnent {
  state = {
    count: 0,
  };

  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));
```

Problem with `bind` is that it is easily forgettable, and Software Engineers love shortcuts. We prefer to write less if we can. (That's me.)

That is why when React hooks was introduced, I was immediately hooked. (did you love that pun?)

We can do the same with functional components, with a function call, called `useState`:

```jsx
import React from "react";
import ReactDOM from "react-dom";

function Counter() {
  const [count, setCount] = React.useState(0);

  function increment() {
    return setCount(count + 1);
  }

  function decrement() {
    return setCount(count - 1);
  }

  return (
    <div>
      {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  rootElement
);
```

The component works. I didn't have to worry about `this`. In fact, we could possibly simplify to the following:

```jsx
import React from "react";
import ReactDOM from "react-dom";

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  rootElement
);
```

That is amazing. However, functional components do have it's own share of problems, which I will talk about in a later part of the series. Let's move on to the next problem with `this`.

## 1.2 `this` can hold state, but don't rely on it.

Let me get this straight and clear: Classes is something that JavaScript has. It's not a React principle. React's `React.Component` class is what React brings to the table for making user interfaces.

Typically with classes, you can put all sorts of member properties, e.g. `gender`, `age` to describe a `Person` class. We can access the member properties via `this`, e.g. `this.gender`, `this.age`.

We can do the same in React class components:

```jsx
import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  state = {
    count: 0,
  };
  renders = 0;
  increment = () => this.setState({ count: this.state.count + 1 });
  decrement = () => this.setState({ count: this.state.count - 1 });

  render() {
    // please dont rely on this
    this.renders += 1;

    return (
      <div>
        Renders: {this.renders} <br />
        {this.state.count}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  rootElement
);
```

It does beg the question though: do we need to even have `this.state.count`? Why can't it just be `this.count`?

```jsx
import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  count = 0;
  increment = () => (this.count = this.count + 1);
  decrement = () => (this.count = this.count - 1);

  render() {
    return (
      <div>
        {this.count}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  rootElement
);
```

_a bad React component._

Coming from Angular.js / Angular 2+, this is how someone would think it should work. However, that is not how React works. Unlike Angular, React needs to know when a change is supposed to happen, which is why we have methods like `setState`, and React hooks like `useState`. This signals React to re-render the necessary components.

Using that principle, we could fake it til we make it, right?

```jsx
import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  state = {
    toggle: false,
  };

  count = 0;

  increment = () => {
    this.count = this.count + 1;
    this.setState({ toggle: !this.state.toggle });
  };
  decrement = () => {
    this.count = this.count - 1;
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    return (
      <div>
        {this.count}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  rootElement
);
```

A force updating mechanism. The bad component now works, with a confusing prop called `this.state.toggle`. In fact, in the class component lifecycle, there's a [`forceUpdate`]([https://reactjs.org/docs/react-component.html#forceupdate]) method we could call:

```jsx
import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  count = 0;

  increment = () => {
    this.count = this.count + 1;
    this.forceUpdate();
  };
  decrement = () => {
    this.count = this.count - 1;
    this.forceUpdate();
  };

  render() {
    return (
      <div>
        {this.count}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  rootElement
);
```

Neato. We have to be careful though, as we're working against the library here:

> Calling forceUpdate() will cause render() to be called on the component, skipping shouldComponentUpdate(). This will trigger the normal lifecycle methods for child components, including the shouldComponentUpdate() method of each child. React will still only update the DOM if the markup changes.

Although, it does remind me of how I used to make user interfaces in the DOM way before Angular and React. Everytime a change happens, I would just re-render the entire DOM. React brings ways to optimize the re-rendering of the entire DOM, and `forceUpdate` is really just a emergency exit way's out.

# Summary

The `this` keyword in classes is confusing for React developers when making class components. I've described 2 reasons why it's confusing:

- member methods of a class instance requires proper binding to `this` if it's meant to be called by the DOM (e.g. click, scroll, etc)
- `this` can hold state, but don't rely on it.

This does seem like functional components do take the winning prize for today. However, functional components do have it's own share of problems coming from another realm of JavaScript entirely - which may be even more difficult to understand.

_This blog post is part of the series React Class VS Functional Components_:

1. [React Class Components VS Functional Components I: Class Component's this](/posts/react-class-vs-function-1-this)
2. [React Class Components VS Functional Components II: Functional Component's Closures, Memory and the Absence of Component Lifecycles](/posts/react-class-vs-function-2-closures-and-memory)
