---
path: '/how-does-a-react-class-component-perform-cleanup'
title: 'How does a React class-based component perform cleanup?'
date: '2020-11-20'
description: 'Do you clean up event subscriptions and cancel network requests when a component is unmounted?'
---

## Why is it necessary?
When a component is subscribed to an event listener, initializes an interval, or does any other asynchronous task, it uses resources. These resources are used by the component when it is active. 

But, once the component's work is done and it is removed from the DOM, cleanup is needed to free up those resources. All the asynchronous tasks the component had been running, might still continue executing even though the component instance has already been unmounted and destroyed. This might cause memory leaks and result in errors. To plug up these memory leaks, clearing out these tasks is crucial.

## How is this cleanup done?
In React, class-based components have various methods that are invoked during the different stages of a component's lifecycle. Using these lifecycle methods, we can even perform asynchronous tasks. 

Right before a component is unmounted, the `componentWillUnmount()` lifecycle method is invoked. This method is the place for any necessary cleanups. If we have any timers, event listeners, or ongoing network requests, they should be closed or canceled in this lifecycle method.

Here is a simple example of removing an event subscription to free some memory.

![Cleaning up event listener subscription](https://dev-to-uploads.s3.amazonaws.com/i/el4xuzpp6ctssum66s2c.png)

## Wrapping up
Resources occupied by tasks that are no longer needed can slow down the performance of an application significantly. To avoid this, cleanup is necessary. While in a class-based component, we have the `componentWillUnmount()` lifecycle method, this can also be done with Hooks. I will write an article on how to perform cleanup in a React application using Hooks.