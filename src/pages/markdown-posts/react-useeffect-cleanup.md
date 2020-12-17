---
path: '/cleanup-with-useeffect-hook'
title: 'Are you taking care of memory leaks with the useEffect hook?'
date: '2020-12-12'
cover: 'https://dev-to-uploads.s3.amazonaws.com/i/ws4h4h6h1hexics86fg5.png'
description: 'The useEffect React Hook does the job of 3 lifecycle methods that class-based components have. Here’s how it does the work of componentWillUnmount()'
---

![Cover image](https://dev-to-uploads.s3.amazonaws.com/i/ws4h4h6h1hexics86fg5.png)

<br />

This article does not tell you the benefits and drawbacks of the `useEffect()` hook nor is it going to persuade you to use React Hooks. The fact that you clicked to read this means you already use Hooks, but want to make sure you're cleaning up resources and canceling all requests and event subscriptions properly. 

If you're still undecided whether to use Hooks, read [this article](https://overreacted.io/a-complete-guide-to-useeffect/). To learn about cleaning up with the `useEffect()` hook, continue reading.

## What makes useEffect different?
In a class-based component, there are three lifecycle methods that are invoked when a component mounts, unmounts and is updated. They are - `componentDidMount()`, `componentWillUnmount()` and `componentDidUpdate()` respectively.

A functional component that uses Hooks has `useEffect()` handling the work of these 3 lifecycle methods. Although this gathers things in one place, it also raises the complexity of this Hook. If you do not know what you're doing, it is easy to end up with a component that keeps updating endlessly.

You can read [this article](https://overreacted.io/a-complete-guide-to-useeffect/) and learn how to not commit this common mistake. There is no need to know this Hook inside-and-out, you can get by with knowing just enough. But knowing more can't hurt.

> The article gives a lot of information on the `useEffect()` hook. 

But it is very long. I suggest you grab some water or a cup of coffee, settle down, and take some notes while reading it. Although it's lengthy, once you get through it, your understanding of the `useEffect()` hook will improve.

Let's see how to clean resources before a component is unmounted with the help of the `useEffect()` hook.

## Cleaning up after a component
To set up some event subscriptions or request data from an external source, you only need to add them in the `useEffect()` hook.

![Subscribing to an event](https://dev-to-uploads.s3.amazonaws.com/i/2yc7nlssy76p9ffogaxc.png)

Here, we set a click listener in the useEffect hook. This event listener will register when the component mounts. 

To remove this event listener, we need to return a function. The `useEffect()` hook will execute this function right before the component is unmounted.

![Cleaning subscriptions](https://dev-to-uploads.s3.amazonaws.com/i/iv6eiovchhhk4txbjs1m.png)

Here, I've named the function `clean()`. This `clean()` function will execute and unsubscribe from the event right before the component is unmounted. 

It does not matter what you name the function nor does the function need to be a named one. You can return an arrow function if you want.

## Wrapping up
This article is aimed towards specifically avoiding memory leaks by closing any requests still running and terminating any timers, etc that are still executing. Although this means you prevent an unmounted component from occupying resources, that is not the sole cause of memory leaks. 

Like I mentioned previously if you don't apply `useEffect()` properly you will end up with an unending loop of updates. `useEffect()` is a powerful hook, but it is just as difficult to get used to. [Here](https://overreacted.io/a-complete-guide-to-useeffect/) is the link to that article again. Knowing how to make full use of this hook will save you hours of debugging.
