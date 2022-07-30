---
layout: ../../layouts/blog.astro
title: "Overusing useSelector() in react-redux"
date: "5/29/2022"
excerpt: useSelector is an easy way to get data for your component. Why not just use it for everything?
---

[useSelector](https://react-redux.js.org/api/hooks#useselector) is a way for a [React](https://reactjs.org/) component to get data for a React app using [react-redux](https://react-redux.js.org/). It is what should be used instead of [`connect`](https://react-redux.js.org/api/connect). Does that mean we omit props and prop drilling? Let's see...

# The scenario

Let's say we're building a review component. We just need to display 1 _review_ for the product. [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) principle, right?

The Review component consists of the following:

- The user's name / nickname / or anonymous
- The avatar
- The title
- The Rating
- When they reviewed it
- The description

Suppose we decided that **every component** must use useSelector():

1. We set the review to setup the root reducer and store in redux.
2. As for the action, we can call it `SET_REVIEW/setReview()` to set the review to the state.
3. Each of the selectors will read from the `review` property.

The `<Review />` component now has the following structure:

```tsx
export function Review() {
  return (
    <ReviewContainer>
      <ReviewUser />
      <ReviewSection>
        <ReviewRating />
        <ReviewTitle />
      </ReviewSection>
      <ReviewDate />
      <ReviewDescription />
    </ReviewContainer>
  );
}
```

Out of the components mentioned, only `ReviewContainer` and `ReviewSection` are just React components. The rest are not **just** React. The component works, we create a pull request, it ends up getting merged without any issues. We followed the rule - every component that needs data uses `useSelector()`.

A few weeks later, we found out that 1 review is a terrible idea, because a voice of 1 person does not really quantify what the product is supposed to be. So we need to display more than one review.

# The pitfall(s) of over-relying `useSelector`()

## 1: The components become coupled to the singleton's data structure

To show a list, can't we just do the following?

```tsx
export function ReviewList({ reviews }) {
  return (
    <ul>
      {reviews.map(({ id }) => (
        <Review key={id} />
      ))}
    </ul>
  );
}
```

The answer is no. This is because the Review family of components does not accept any `props` and relies heavily on Redux to do so.

We could update our store to be an array of reviews, then in our selector we could the following:

```jsx
const review = useSelector(state => state.reviews[props.id]);
```

Crisis averted, or are we leading into another pitfall?

## 2: The reusability of the component(s) are poor.

Suppose we wanted to show just one review in 1 page, maybe because that review can also have comments. That is the next product feature we are building. In that case, we can just change our selector:

```jsx
const review = useSelector(state => state.review || state.reviews[props.id]);
```

When it's just one review, state.review will be populated, otherwise it is state.reviews. We do this for all of our selectors and components. That works, until the next feature comes.

In the `<ReviewUser />` component, we have the following:

```jsx
export function ReviewUser({ id }) {
  const review = useSelector(state => state.review || state.reviews[props.id]);

  return (
    <div>
      <ReviewAvatar id={id} />
      <span>{review.user.fullName}</span>
    </div>
  );
}
```

We want to use the same ReviewAvatar component for our User profile feature and for the dropdown. We didn't think about having that same shared component until now.

```jsx
export function ReviewAvatar({ id }) {
  const review = useSelector(state => state.review || state.reviews[props.id]);
  const initials = getInitials(review.user.fullName);

  return (
    <div
      style={{
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        backgroundColor: review.user.background,
      }}
    >
      {initials}
    </div>
  );
}
```

This component cannot be reused for those two features, because it is still coupled to the dependency of `state.review` or `state.reviews` being available.

## 3: It becomes hard to express as a story in storybook, and it becomes very difficult to test by itself.

If we wanted to show `<ReviewAvatar />` in [Storybook](https://storybook.js.org/), and isolate it by itself, what do we do?

Is this enough?

```tsx
import React from "react";
import { Story, Meta } from "@storybook/react";
import { ReviewAvatar } from "./ReviewAvatar";
const meta: Meta = { title: "ReviewAvatar", component: ReviewAvatar };

const Demo: Story = props => <ReviewAvatar {...props} />;

export const Default = Demo.bind({});
Default.args = {};

export default meta;
```

When we run this in storybook, it simply does not work. This is because, again - the component is dependent on `review` or `reviews` in the redux store. We need to set that up for this page.

We can say the same for the tests.

```tsx
it("should display the initials of the username", () => {
  render(<ReviewAvatar id={25} />);
  expect(screen.getByText("HG")).toBeInTheDocument();
});
```

The test will always fail, because we need to have the redux store present.

# So when is the best time to use useSelector()?

It's when the state has to be global. For example, the logged in user. Or the user's settings. Or the user's cart.

However, I wouldn't go recommend to use it for every element in those respective trees. Even though React Hooks may make dumb and smart components obsolete, I would argue that they still have their use.

Let's take the user's cart for example. We've seen the overuse of `useSelector()` with `<Review />`, but now let us see the polar opposite: when it's only used once. Let's start with the Cart component:

```jsx
function Cart() {
  const items = useSelector(state => state.cart.items);
  return <ItemList items={items} />;
}
```

Now we have `ItemList`:

```tsx
export function ItemList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <Item item={item} key={item.id} />
      ))}
    </ul>
  );
}
```

However, component developers stylistically have a choice at this point on how their component API should work. In the example above, the developers chose to be coupled to the `Item`'s data model shape. That may seem fine at the moment, but if the `Item`'s model structurally changes every single time, it may cause an emotional re-visiting of the component, every, single, time. That is because of the `.` operator in JavaScript. The more `.`'s a JavaScript expression has, the more suspectible it becomes to an error:

```jsx
a; // either the variable a is undefined or defined (severity level 0)
a.b; // if a is undefined, b throws an error.  (1 way of getting an error)
a.b.c; // if a is undefined, c throws an error. Same with b. (2 ways of getting an error)
a.b.c.d; // ... (3 ways of getting an error)
a.b.c.d.e; // ... (4 ways of getting an error)
```

Thankfully, JavaScript does offer ways of protection using the `?.` operator, but it ends up costing more computation as it boils down to doing something like

```jsx
a && a.b && a.b.c && a.b.c.d;
```

for every usage of the `?.`

Let's try a different approach: What if the `<Item />` had the same `props` of `Item`?

So instead of

```jsx
<Item item={item} key={item.id} />
```

we do something like

```jsx
<Item
  picture={item.picture}
  price={item.price}
  name={item.name}
  key={item.id}
/>
```

That is better, because now we've delegated the component prop management to the `<ItemList />` component. We also avoid using the `.` within the Item component also! The only issue is that it ends up in a little more work in using the component. However, the component is now more dumb: It has absolutely no idea what the actual API data model is like - it just knows that it has a picture, a price, and a name. It's no longer bound to the data model's shape anymore.

The more components care less about the data model's shape, the more reusability we can have across different entities of the application.

# Conclusion

As developers, it's easy to reach out for the toolbox and over-use the same tool over, and over again. In this case, we are talking about `useSelector`. When we use it too often, our components become:

1. Too coupled to the singleton's data structure
2. Not reusable for other features
3. Becomes hard to express in Storybook or to test

It immediately defeats the purpose of making it a React component to begin with. The component itself could have been within the parent component itself.

`useSelector()` is great for accessing global state. Even then, it is best to use it as sparingly as we can - because not every component is concerned about Redux. We can even also say that a component's properties should even care less about the data model itself - because if it did, then it is still bound to the API it is being used with. If we delegated that to a smart component, only the smart component has to update, instead of the entire tree of components.
