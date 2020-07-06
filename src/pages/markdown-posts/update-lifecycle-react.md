---
path: '/update-lifecycle-of-a-react-component'
title: 'Update lifecycle of a class-based React component'
date: '2020-07-06'
---

## Update lifecycle
The previous article was about the lifecycle hooks of a class-based component when it is being created. In this article, we will see the hooks that come into play when a class-based component is updated.

## When is a component updated?
A component is updated when there are changes made to the component's props or state. When this happens, the component is re-evaluated and goes through a different lifecycle than the creation lifecycle.

#### 1. getDerivedStateFromProps
Since this hook gives us state derived from the changes in props, it is the very first lifecycle hook invoked when a component is updated.

It checks whether there have been any changes made to the props and derives the new state from these changes. Just like in the creation lifecycle, this lifecycle hook is rarely necessary, since there will most probably be a more elegant solution available.

#### 2. shouldComponentUpdate
This lifecycle hook is invoked after *getDerivedStateFromProps* and before the *render* function and allows us to **cancel** the update process. It can be used to let React know whether the changes in the state or props of the component affect the component's output. For performance optimizations, we can then decide whether React should continue updating and re-rendering the component.

By default, a component will re-render on every state change, but with this hook, we can prevent unnecessary re-renders. This makes this hook pretty powerful since we can prevent unnecessary render cycles. But, if done incorrectly, we might end up blocking an update and break the component.

[React docs](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) recommend using `PureComponent` if you are not confident of manually implementing *shouldComponentUpdate*.

#### 3. render
Next comes the *render* function. If *shouldComponentUpdate* returns false, which means the component should **not** update, the render function is not invoked.

During the creation lifecycle, the render function evaluates all the JSX and renders the component to the DOM. During the update lifecycle, however, after evaluating the JSX, the render function constructs the virtual DOM and checks if it needs to update the real DOM. If an update is necessary, instead of updating the entire DOM, it compares the virtual DOM and the real DOM and makes changes to only those parts which need updating.

This means changing a button's color will only update that button and not the entire page.

#### 4. getSnapshotBeforeUpdate
Although *getSnapshotBeforeUpdate* comes after the render function in the update lifecycle of a React component, it is invoked right before any updates are actually committed to the real DOM. This is also a lifecycle hook that is not used often and is mostly used for last-minute operations like capturing some information from the DOM before it is updated.

This hook receives the previous state and props as parameters and can either return a snapshot object or null. One use-case of this hook is for capturing the scroll position on the page before the DOM is updated and setting the current scroll position to that value. This will make sure that even after the DOM is re-rendered, the scroll position will remain the same.

Any value returned by *getSnapshotBeforeUpdate* is passed as a parameter to *componentDidUpdate*.

#### 5. componentDidUpdate
This hook is invoked after the *render* function has finished executing and the DOM has been updated. This hook is not called on the initial render of the page but when the component is updated.

Asynchronous tasks like executing HTTP requests can be done in this hook. Although updating state in this hook will not block the updating process since the rendering has finished, we still need to take care since we might end up in an infinite loop of re-renders.

If you need to update the state, make sure to use *setState()* inside a Promise to avoid causing an unnecessary re-render. While this re-render will not cause any visible changes, it will still affect the component's performance.

This hook takes the previous state and props, before the component was updated, as arguments. The previous props can be compared to the current props to check whether it is necessary to execute a network request if the prop has changed. If your component implements the rarely-used *getSnapshotBeforeUpdate()* lifecycle hook, then *componentDidUpdate()* will receive a third argument - **snapshot**. If *getSnapshotBeforeUpdate()* has not been implmented, the third argument will be undefined.

> *Note: If `shouldComponentUpdate()` returns false, `componentDidUpdate()` will not be invoked*

## Wrapping up
These are the lifecycle hooks which are invoked when a component goes through an update. In the next article we will see the *useEffect* hook which can be used in a functional component in place of these lifecycle hooks.