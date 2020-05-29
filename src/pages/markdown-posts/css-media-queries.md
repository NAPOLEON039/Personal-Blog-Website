---
path: '/how-to-write-media-queries'
title: 'An instructive how-to on writing CSS media queries'
date: '2019-12-25'
---

## Introduction
When I first encountered media queries, I had no clue what to write and what everything means. All I could understand was the `width`, `max-width`, and `min-width` parts. The rest was all guesswork. I avoided using media queries since I had no idea what they were and how they affect my code. But after studying them, I know how useful they are for making a responsive app.

Media queries can be as simple as you want or be complex and very specific. This article only aims to show you some moderately simple ones so you know what you're doing when you have to use one.

## What are they?
CSS media queries are like `if` statements for stylesheets. In languages like JavaScript, Python, or Java, an `if` statement signifies a branch of code that will only be executed when the condition of the `if` statement is satisfied. 

Media queries in CSS do the same. If the condition in the media query is satisfied or becomes true, then what we write inside is executed.

## Writing media queries
A media query starts with the `@media` keyword followed by the conditions. A condition can be the type of the device - a device with a screen (like a laptop or a computer), a print medium (a printed paged material or documents viewed on a screen in print preview mode), etc. This is not the only condition. For instance, we can also specify width and height.

> A typical media query will query the width and height of *the browser window* as well as the type of device 

Let's jump into some examples:

```css
@media screen and (width: 500px) {
    .heading {
        padding: 20px;
    }
}
```

In this example, if our device type is `screen` and the width of our *browser window* is 500px, the element with class `heading` will have a padding of 20px. We can also use `height` which corresponds to the height of the browser window. 

Usually, you'd want to check if the width or height falls within a certain range instead of a fixed value like 500px. For that, we have `min-width`, `min-height`, `max-width` and `max-height`. 

In the query above, `and` is a logical operator. `screen` and `(width: 500px)` are two separate queries. We combine them with the logical operator `and`. With a logical operator, like in `if` statements, we can combine multiple queries together.

Next is an example where we check if the width falls in a certain range:

```css
@media screen and (min-width: 500px) and (max-width: 700px) {
    .heading {
        padding: 25px;
    }
}
```

We have 3 different queries here all combined with a logical operator - `screen`, `(min-width: 500px)` and `(max-width: 700px)`. The above media query will only apply to the element `.heading` if the device is of type *screen* and the browser window has a width that falls between 500px and 700px.

The last example will have a query for all device types and use the logical `or` operator.

```css
.heading {
    background-color: red;
    margin-right: 15px;
}
@media all and (min-width: 500px) and (max-width: 720px), (min-width: 1000px) {
    .heading {
        background-color: aqua;
        font-size: 37px;
        margin: 25px 0;
    }
}
```

This query is similar to the previous one. Instead of `screen`, we use `all`. It means instead of a particular device, we want this query to be executed for all devices. Next we have the two queries we saw previously - `(min-width: 500px)` and `(max-width: 720px)`. They check if the width falls in the range of 500px to 720px.

We have some new conditions in this query - `, (min-width: 1000px)`. We know from our examples so far that `(min-width: 1000px)` is a query. So what does the comma mean? It is the logical `or` operator. 

The meaning of our media query is - apply the following CSS to `.heading` if there is any device (since we used `all`, it doesn't matter which type of device it is) and the width of the browser window is between 500px and 720px _**or**_ if the browser window has a minimum width of 1000px.

This example also has another set of styles for our `.heading` element. There, a background color of red is applied. So if we want the styles in our media query to be applied, our browser window must either have a width between 500-720px *or* it must have a minimum width of 1000px. If neither of those conditions can be fulfilled, then the styles outside of the media query will be applied to the element with class `heading`.

## Wrapping up
Simple media queries check for width and device type as shown in the examples above. Although simple, it is quite useful when making responsive websites and apps that work well on a variety of device types - from mobile phones to tablets to wide-screen desktops. Knowing how they work and being able to use them is very beneficial.

## More resources

* Read [this article](https://css-tricks.com/css-media-queries/) on CSS-Tricks to learn more about media queries. 
* [Here](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) is another good one by MDN.