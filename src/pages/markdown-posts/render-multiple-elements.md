---
path: '/render-multiple-elements-react'
title: 'How to easily render multiple elements in React'
date: '2019-09-27'
---

## Introduction
I have worked with Vuejs for over a year and made quite a few personal projects with it. Recently, after starting to learn Reactjs, I found out about this certain feature.

In Vue and React, we can only render one element. Even if we have multiple elements to render, there can only be a *single root element*. This means if we want to render two or more elements, we have to wrap them in another element or component. Commonly, the element used for this is a `<div>` tag. It doesn't make much of a difference to the page structure, so a `div` is a popular wrapper element.

Though, sometimes, having a wrapper element can be inefficient. In certain situations, having a wrapping component can cause the CSS to be inconsistent, leading to a headache. This doesn't mean that we absolutely cannot work with a wrapping element. But the workaround can be tough and time-consuming.

## Here are some examples of this
The first example is something I've personally experienced. I wanted to create a countdown timer and add a background image to it. There wasn't much to this project since I was only making it to practice my React skills. Now the structure of the component was roughly like this:

![Countdown timer component structure](https://thepracticaldev.s3.amazonaws.com/i/90pdb7epoz9c0wbksj3y.png)

Now keep in mind that this `div`, and everything inside, will be rendered inside another `div` which is the target element in the DOM. When I tried applying a background image, it was either out of proportion or it left some white-space at the top. I tried everything I could think of but the result was the same. Desperate to make it work, I even added the background image as an inline style to the body in the HTML. Finally, I had to work with `position: absolute` and change the width and height of both `div`s and got it to work. 

It was fine since the only content to be displayed would be a countdown. But if the app was more complex, this would've been even more frustrating to deal with. Of course, it could also be that there is a much better solution to it and I'm just not experienced enough to see it. Anyways, depending on the complexity of the project, the workaround can be just as complex.

---

The second example is from the React docs.

This example has a table in a component with a table row and a child component inside the row.

![Second example Table Component](https://thepracticaldev.s3.amazonaws.com/i/1ak57mbpqcy0sitxni7g.png)

The `Table` component will render the table itself and the rows, while the `Columns` child component will return the columns. All looks fine till here. But take a look at the `Columns` component:

![Second example Columns component](https://thepracticaldev.s3.amazonaws.com/i/f7blebd02x7tqdwfg752.png)

While this is a valid component, which returns multiple elements wrapped in a `div`, this will not work with the parent component `Table`. Take a look at the result of the render:

![Invalid HTML result](https://thepracticaldev.s3.amazonaws.com/i/7banqx1sfxwy8c6173hg.png)

This is completely invalid HTML.

Fortunately, there is a way around this problem. With this, we won't have to worry about tweaking the CSS and will also satisfy the requirements for rendering multiple elements.

There are two ways around this.

# First solution
The first solution is using a feature provided by React, called `Fragments`. A *Fragment* is an empty wrapper component that doesn't render any HTML of its own. It simply returns the contents written inside its tags. Applying this to the React docs example would give us:

![The first solution using Fragments](https://thepracticaldev.s3.amazonaws.com/i/2c7uj2jt7e9req43s08g.png)

The `Table` component would then render valid HTML:

![Valid HTML result](https://thepracticaldev.s3.amazonaws.com/i/0dhw12cdyy8pjeyyz6cd.png)

This feature is available from React v16.2.

`React.Fragment` is not that difficult to implement. We can make an empty component and get the same result.

![Implementing Fragments](https://thepracticaldev.s3.amazonaws.com/i/qq5frqpbi8fra14ztpc1.png)

We can use this custom wrapper component just like a `Fragment`.

![Using the Fragments implementation](https://thepracticaldev.s3.amazonaws.com/i/40b9bu436qga3b2euez8.png)

The resulting HTML will be the same. Although we can implement this ourselves, using `React.Fragment` would mean one less component in our project tree and it will be more efficient to use `Fragments` since it's available by default in the React package. 

There is a new short syntax available which you can use for *Fragments*:

![Short syntax for React.Fragment](https://thepracticaldev.s3.amazonaws.com/i/d82s5v548z359om8g0ix.png)

You can use `<></>` like usual components, but it doesn't support attributes or keys.

# Another solution
The second solution is wrapping the returning  JSX in square brackets instead of parenthesis. 

![Second solution](https://thepracticaldev.s3.amazonaws.com/i/whnm86qzd81xzrnvvrwz.png)

This is completely valid and also does what we intend it to do. The way React renders elements, when we return our entire JSX wrapped inside a single `<div>` element, it passes this single `<div>` to the `ReactDOM.createElement()` method. This method only takes a single argument. 

That is why our solution above works. Even though it's actually a group of elements without any wrapping element like a `<div>`, it is part of a single array (remember, arrays are actually objects). Thus, we pass a single object to `ReactDOM.createElement()`.

But, this does have a drawback. Although this works just fine, React will throw us a warning. Each element has to have a key. This is similar to how we require `v-for` elements in Vuejs to each have a key. Adding the required keys, we see the drawback:

![Second solution with keys](https://thepracticaldev.s3.amazonaws.com/i/p9nutzlacmaiaies38e4.png)

This means we have to add a unique key to each and every element. This can get quite tedious. It might be fine for a small component with little JSX, but for huge and complex components that render a lot of JSX, it might be better to use *Fragments*. You can read more on Fragments [in the React docs](https://reactjs.org/docs/fragments.html).

___

# Finishing off
A component wrapping another component is actually called a Higher Order Component (HOC), but that is not the scope of this article. You can learn more about HOCs in the React docs if you are interested. 

I hope this article taught you something new about how React renders elements. Knowing how multiple elements in React are rendered, what's the reason behind wrapping all elements in a root element and how we can get around it when the situation requires, are beneficial, if not necessary, to becoming a React developer.