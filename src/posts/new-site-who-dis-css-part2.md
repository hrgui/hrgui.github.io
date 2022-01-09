---
title: "New Site, who dis? Part 2: CSS"
date: "1/8/2022"
excerpt: Now here's the part 2 - let's talk about my take on CSS and how I approached it in my website.
---

Cascading Style Sheets, or better known as CSS is the backbone on how websites look pretty: it contains all the styling rules for a website. I'll talk about what I know about CSS in general, and what's my opinion for each one, and what I ultimately decided for this.

# Before CSS: `<font />`

I often claim that I used to do websites in Macromedia Dreamweaver / Microsoft Frontpage 97. My first webpage was a Power Rangers fansite in Geocities, and I believe I was just a kid. What was special about those programs was that it opened the audience of who can make websites. They didn't have to be coders. They can just be people who just knew how to use Microsoft Word, and knew how to drag and drop certain things.

Back then, it passed as a website, and it worked well with its counterpart, Microsoft Internet Explorer. It looked decent for a webpage in the 90s.

However, when looking at the code of it,

```html
<body>
  <p>
    <font color="red" face="Verdana, Geneva, sans-serif" size="+1"
      >Hello World</font
    >
  </p>
  <p>
    <font color="red" face="Verdana, Geneva, sans-serif" size="+1"
      >Hello World</font
    >
  </p>
  <p>
    <font color="red" face="Verdana, Geneva, sans-serif" size="+1"
      >Hello World</font
    >
  </p>
</body>
```

the output was filled with that everywhere. It was very difficult to maintain as text grew. In addition, I believe `<table />` was the way we would do position + `<img />` with the idea of Photoshop slicing.

This was HTML, and it was passable, but it did not scale.

The `style` attribute did come afterward however, but without CSS, it still did not scale, because we had to repeat in order to make the presentation to look right. Sadly, emails still have to work this way, even in 2022.

# Enter CSS, and what all CSS methodologies end up as.

The `style` tag came, and also the `link` tag. Take the same example.

```html
<head>
  <style>
    p {
      color: red;
      font-family: "Verdana", "Geneva", sans-serif;
      font-size: 1em;
    }
  </style>
</head>
<body>
  <p>Hello World</p>
  <p>Hello World</p>
  <p>Hello World</p>
</body>
```

Much better. The HTML started to care less about the presentation, and there was a section that was just dedicated for styling.

People would then just move the contents of a style tag into a CSS file, using the `link` tag.

```html
<head>
  <link href="main.css" rel="stylesheet" />
</head>
<body>
  <p>Hello World</p>
  <p>Hello World</p>
  <p>Hello World</p>
</body>
```

**This is one of the fundamentals** of how the CSS works in my website. Of course, HTML also grew. `<div />` was a thing to help for positioning. People started using `float`. It was annoying, because there was rules about `float`, which required `clearfix` and understanding BOM. Thankfully we went even further, and introduced the idea of `flexbox`, and now we have sites that are tableless, w/o floats, w/o clearfixes.

# Enter Angular.js, React and the idea of CSS in JS

It doesn't end here though. CSS, despite saving HTML from a disaster, still had it's issues. Here's some of them:

1. All CSS rules are global.
2. CSS Specificity and CSS Order trips people up
3. The idea of Normalization is required to make browsers look consistent

Of course, there are more issues than 3. At this time, I learned [Angular.js](https://angularjs.org/), which introduced the idea of creating components for every single thing, and so did a library called [React.js](https://reactjs.org/). We decided to extend that to CSS also. Take the same example:

```tsx
import styled from "styled-components"
import React from "react"
import ReactDOM from "react-dom"

const Greeting = styled.p`
  color: red;
  font-family: "Verdana", "Geneva", sans-serif;
  font-size: 1em;
`

ReactDOM.render(
  <Greeting>Hello World</Greeting>,
  document.getElementById("root")
)
```

This is how plenty of websites do the CSS today. While it gave structure, solved many of CSS problems, it has its own share of issues. I'll talk about some of them in detail.

## Sharing CSS styling is done through JS, but can go many ways

In CSS, when you want to share a style, just use a class:

```html
<p class="paragraph first">Hello World</p>
<p class="paragraph">Hello World</p>
```

In CSS in JS, it depends on the codebase.

### Imports, and sharing and spreading `objects` - this is common with JSS.

JSS is a common CSS in JS library used in Material-UI v4 and below. It looked like something like this:

```jsx
const useStyles = makeStyles(theme => {
  return {
    greeting: {
      color: "red",
      fontFamily: '"Verdana", sans-serif',
      fontSize: "1em",
    },
  }
})

function Greeting({ children }) {
  const classes = useStyles()
  return <p className={classes.greeting}>{children}</p>
}
```

Now if you wanted to share that everything used the color `red` and the same fontFamily and same font size, we can do it like this:

```jsx
// in 1 other file
export const greetingStyle = {
  color: "red",
  fontFamily: '"Verdana", sans-serif',
  fontSize: "1em",
}

import { greetingStyle } from "./sharedStyles"

const useStyles = makeStyles(theme => {
  return {
    greeting: greetingStyle,
  }
})

function Greeting({ children }) {
  const classes = useStyles()
  return <p className={classes.greeting}>{children}</p>
}
```

Sometimes I even share the `useStyles` hook that Material-UI provides.

### The idea of scoped components that provide classes - more common with styled components, less common with JSS

Another way of sharing styles is to have a wrapper component that contains the style. Here's an example:

```jsx
const Wrapper = styled.div`
  & .greeting {
    color: red;
    font-family: "Verdana", "Geneva", sans-serif;
    font-size: 1em;
  }
`

function Greeting({ children }) {
  return (
    <Wrapper>
      <p className="greeting">{children}</p>
    </Wrapper>
  )
}
```

### So what's better?

In my time with CSS in JS, I often see developers often copying shared styles rather than sharing styles across components unfortunately. This is because it embraces the idea that components aren't affected by any external source, whether it was imports, or a CSS file.

So most of the time, sharing styles are actually quite uncommon, and I feel like we've ended up going a little bit backwards, but a little bit forwards. Unlike HTML, who couldn't handle the duplication, JavaScript has mechanisms like imports, variables, loops, whatever to help handle the duplication. In fact, the idea of components also help bring structure.

## Inclined to use JS to do Responsiveness

If JS is so good, why not just do JS for everything? Literally everything. Here's an example:

```jsx
import { useState } from "react"
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core"
import "./styles.css"

const useStylesMobile = makeStyles(
  {
    root: {
      display: "block",
    },
    count: {
      fontSize: "319px",
      display: "block",
    },
  },
  { name: "CounterMobile" }
)

const useStylesDesktop = makeStyles(
  {
    root: {
      display: "block",
    },
    count: {
      fontSize: "319px",
    },
  },
  { name: "CounterDesktop" }
)

function CounterMobile() {
  const [count, setCount] = useState(0)
  const classes = useStylesMobile()

  return (
    <div className={classes.root}>
      <span className={classes.count}>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  )
}

function CounterDesktop() {
  const [count, setCount] = useState(0)
  const classes = useStylesDesktop()

  return (
    <div className={classes.root}>
      <span className={classes.count}>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  )
}

function Counter() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("sm"))

  return matches ? <CounterDesktop /> : <CounterMobile />
}

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  )
}
```

Here we have a counter, and we are using material-ui's `useMediaQuery` to have different styles for mobile and desktop. The application does work and compile. Yet, it has a drawback. It can get slow.

## The dependency of JavaScript leads to a slower time to first paint

One of the biggest problems with CSS in JS is that it relies on JavaScript in order to paint. In fact, we've relied on JS to also do the HTML also. This ends up becoming a single point of failure - JavaScript is necessary to run a website.

I once went into scenarios where we would have single page web applications where JavaScript files end up totaling 25 mbs, which lead to a weird user experience where there's a white screen for a while, then it finally loads. This becomes a problem for most people, and there's a saying:

> If it takes longer than 150ms, people will notice it.

Why was the JavaScript file huge?

1. Node module dependencies <- number 1 problem
2. CSS and the fact we're duplicating a lot w/ the many ways of tackling CSS
3. JS and HTML together w/ the many ways of tackling this problem

To improve on this, we start breaking up JavaScript and going back to each have HTML, CSS and JavaScript have their own responsibilites, but powered by JavaScript as the toolchain.

For HTML, we used principles of Static Site Generation or Server Side Rendering so that the HTML appears before the JavaScript needs to load. We also focused on having more HTML files instead of 1 single HTML file, which help focused to load only what was needed.

JS also did the same thing - we started to only load whatever JS is necessary, and CSS followed that due to CSS in JS.

This created another problem. While the HTML did load first, the CSS came when the JS came. There was a flash where the content was unstyled, and that looked ugly.

We call this problem: `Flash of Unstyled Content (FOUC)`. The longer it was, the worse it was. The shorter, the better, but the amount of flickering in the application are things that people notice too.

# Going back to just CSS, or Tailwind? The idea of Utlity Classes

A common way to fix FOUC is to pre-render the CSS. However, to extract the CSS from CSS in JS is quite difficult, so most approaches end up resulting in CSS bloat due to the idea that we have to duplicate CSS in order to achieve individuality in components and ensuring components are not affected by any external source.

I won't stop here though. I care about performance. I want the HTML, CSS to load as fast as possible without FOUC and a fast paint. Now suppose if we didn't duplicate CSS between components. Sure, we can use JS to stop duplication, but what if we took that same principle into just CSS? We can do that by classes:

```html
<p class="font-sans text-red-500">Hello World</p>
<p class="font-sans text-red-500">Hello World</p>
```

Enter [TailwindCSS](https://tailwindcss.com/). In a sense, one can argue that we've gone backwards to having `style` attributes everywhere - but I'd argue this is `style` attributes based on the design system that you're working on. The team decides how this should be. We can use convert the duplication above into a upper-level class via `@apply`:

```css
.greeting {
  @apply font-sans text-red-500;
}
```

Ultimately, this ends up in a smaller build-size. [Netflix Top 10](https://top10.netflix.com/) uses Tailwind CSS, and it is [small](https://tailwindcss.com/docs/optimizing-for-production):

> Combined with minification and network compression, this usually leads to CSS files that are less than 10kB, even for large projects. For example, Netflix uses Tailwind for Netflix Top 10 and the entire website delivers only 6.5kB of CSS over the network.

**This is the other core principle** of how my current website is developed. I wanted to show that I care about performance, and I believe Tailwind was one way to solve performance issues of CSS.

# Summary, or TLDR

This website is developed with TailwindCSS for its CSS. Despite it feels like we're going backwards with the class name declarations since utlity classes look like we're mimicing style tags, it allowed me to create a design system, and I ended up created utility classes that I can use on my own - I think of it as `style` for myself.

As a result, this makes the website fast and snappy. That's what I want to advertise - that I am always on a mission to make web apps the best as they can, and the most performant as possible.

_P.S. I still do CSS in JS though for other things / work though! It all depends on the team, and the usecase of the application._
