---
path: '/creation-lifecycle-of-a-react-component',
title: 'Creation lifecycle of a class-based React component',
date: '2020-06-26'
---

## Lifecycle hooks
After React Hooks were introduced in React 16.8, lifecycle hooks - which were only available in class-based components, are now also available in functional components with the help of the `useEffect` hook.

Although `useEffect` gives us similar control over the lifecycle of a component, lifecycle hooks are only available in class-based components.

The following are the lifecycle hooks called during the creation of a class-based component:

## Creation lifecycle of a class-based component

#### 1. Constructor

When a component is to be created, the first thing that runs is not a lifecycle hook but the component's **constructor**. The *constructor* is a default ES6 class feature and gets added to a class automatically, if we do not specify one. A constructor can be used to set the initial state of the component, initialize variables and bind functions. Since the constructor is essential in a class, it is called before the lifecycle hooks when creating a class-based component.

#### 2. getDerivedStateFromProps
After the constructor, **getDerivedStateFromProps** runs. It is invoked right before the render function does. *getDerivedStateFromProps* is called during the initial mount of the component and on subsequent updates.

It is a rarely used lifecycle hook, for when the state of our component has to be derived from changes made in props over time. The reason this lifecycle hook is not used often is due to simpler alternatives available. These alternatives make our code less verbose and are thus used instead of this hook. That being said, this hook is not completely useless.

One handy use-case would be using it to implement a `<Transition>` component that compares its previous and next children to determine which of them should be animated. You can read more about this lifecycle hook on the [React docs page](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops).

#### 3. render()
After invoking the constructor of the component and the *getDerivedStateFromProps* lifecycle hook, the **render** function is called. It returns all of our JSX.

The *render* function should remain pure and should only be used to prepare the data we would need to render the JSX. Any HTTP requests or timeouts that can block the rendering process should not be used here.

#### 4. componentDidMount
After the JSX from the *render* function finishes rendering, **componentDidMount** is invoked. Asynchronous tasks like HTTP requests can be run here. For example, if you need to fetch data from a remote endpoint, this is a good place to do that.

Initialization that requires DOM elements is done here.

## Wrapping up
There are several hooks involved during the lifecycle of a class-based React component. The hooks mentioned in this article are the ones which are involved during the creation of a component. When the component is updated, there are a few more hooks which are invoked. We will go over them in the next article.