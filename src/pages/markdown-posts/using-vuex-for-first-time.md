---
path: '/understanding-and-using-vuex-for-the-first-time'
title: 'Understanding and using Vuex for the first time'
date: '2019-11-16'
---

## A short intro to Vuex
Vuex is a state management library that can help us manage the state of our application. Instead of multiple components handling state locally and passing it to the required components, we can have Vuex manage state for the entire application in one location for us.

It is best used with Vuejs but is not limited to it. For example, we can [use it with Reactjs](https://github.com/dennybiasiolli/react-vuex) if we wish. Vuex is quite powerful.

This short guide explains the basics of using Vuex in a Vuejs application. I will assume you have worked with Vue applications. 

## State management and the store
Vuex manages state in a central location called a *store*. Also called a Vuex store, this *store* contains *state* as well as some other things that are very useful and make Vuex so powerful. In order to use Vuex in our application, we need to create a Vuex store, register it in the entry file where our main Vue instance is and then we'll be able to use it freely.

Creating a store and registering it doesn't take more than a few steps:

```javascript
//store.js

import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
export const store = new Vuex.Store();
```

We have created a Vuex store in a separate `store.js` file.

```javascript
//main.js/index.js (or whatever you named the entry file of your application)

import Vuex from 'vuex';
import Vue from 'vue';

//other import statements go here

import App from './App.js';
import store from './store.js';

Vue.use(Vuex);

new Vue({
	store,
    components: {App}
})
```

Here we registered it with our global Vue instance. Now let's put some state in it:

```javascript
export const store = new Vuex.Store({
	state: {
    	count: 0
    }
})
```

The Vuex store takes an object as an argument. Inside this object will be the state and other methods. We can retrieve the state using the command: `this.$store.state` in a Vue component. We can retrieve our *count* with `this.$store.state.count`. Here, `this.$store` refers to the Vuex store.

## Getters
If there are any calculations we need to perform on the state before we use it, we can do it in a computed property.

Let's say we want to double the `count` variable in our state before we display it. 

```javascript
computed: {
	doubleCount() {
    	return this.$store.state.count * 2;
    }
}
```

Although this works in this case, if there are complex calculations to be performed and/or they are needed in multiple components, then it becomes inefficient. We will either have to write duplicate functions for all those components or extract the calculations in a separate function and keep importing it everywhere. 

Vuex offers a better alternative - `Getters`.

```javascript
export const store = new Vuex.Store({
	state: {
    	count: 0
    },
    getters: {
    	getSqCount: (state) => {
        	return Math.pow(state.count, 2);
        }
    }
})
```

`getSqCount` is an arrow function that serves as a getter. All getters receive the state as their first argument from Vuex. We do not need to explicitly pass it when we call them.

```javascript
computed: {
	sqCount() {
    	return this.$store.getters.getSqCount;
    }
}
```

> Note that `state` and `getters` are keywords and you cannot use your own names for these in the Vuex store. This also applies to mutations and actions that will follow.

## Mutations
We've set state in the store and we've retrieved it. To make changes in our state, we need to use something called a `Mutation`. 

A mutation is similar to an event handler function. The main work of changing (mutating) state will be done inside this function.

```javascript
export const store: new Vuex.Store({
	state: {
    	count: 0
    },
    getters: {
    	getSqCount: (state) => {
        	return Math.pow(state.count, 2);
        }
    },
    mutations: {
    	increment(state) {
        	state.count++;
        }
    }
})
```

The mutation handler function also receives the state as the first argument. As for why I said it's similar to an event handler, it is because of how this mutation is invoked. 

Even though it looks like a regular function, we do not call a mutation directly. Think of it more like an event registration. If we want to use the `increment` mutation we defined inside our store, we have to *commit* it. We do this in the Vue component.

```javascript
methods: {
	add: () => {
    	this.$store.commit('increment');
    }
}
```

When this method is executed, it will *commit* a mutation called `increment`. Like how an action triggers an event and then the event handler function is executed, when the `add()` method on our Vue component is executed, it commits the `increment` mutation which is invoked.

You can also pass some data along with invoking the mutation handler.

```javascript
methods: {
	add: () => {
    	this.$store.commit('increment', 5);
    }
}
```

This data or *payload* can be used like any other function argument by our mutation handler.

```javascript
mutations: {
	increment(state, n) {
    	state.count += n;
    }
}
```

Mutations allow us to update the state. Any components that depend on this state will be updated automatically when this state updates. 

But, mutations only allow for synchronous operations. However, asynchronous operations can still be performed with the help of `Actions`.

## Actions
Actions are similar to mutations but they don't change the state directly as mutations do. Instead, they carry out asynchronous operations and then commit mutations when those operations are finished.

We can register an action on our Vuex store in the following way:

```javascript
export const store: new Vuex.Store({
	state: {
    	count: 0
    },
    getters: {
    	getSqCount: (state) => {
        	return Math.pow(state.count, 2);
        }
    },
    mutations: {
    	increment(state) {
        	state.count++;
        }
    },
    actions: {
    	incrementAsync(context) {
        	setTimeout(() => {
            	context.commit('increment')
            }, 1000);
        }
    }
})
```

Here we simulate an asynchronous operation with the help of `setTimeout`.

Registering an action gives our action handler (`incrementAsync`) access to a `context` object.

The `context` object exposes the same set of methods and properties that the store instance does (this is the `this.$store` that we used before). We can call `context.commit` to commit a mutation or even use `context.getters` to access getters. But, using the context object is not the same as using the store instance.

Since we will be using the `context.commit` method the most, we can use [argument destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to unpack it so we can use it easily.

```javascript
incrementAsync({commit}) {
	setTimeout(() => {
    	commit('increment');
    }, 1000);
}
```

Like how we *commit* mutations in our Vue components, we *dispatch* actions.

```javascript
methods: {
	add: () => {
    	this.$store.dispatch('incrementAsync');
    }
}
```

This works the same way as it did when we used this for committing our mutation, except this time, we are dispatching an action.

## Wrapping up
This should be enough for you to create your first Vuex store, define state, mutations, and actions in it. If you need more examples or more information you can read the [Vuex docs](https://vuex.vuejs.org/guide/). They are really good and not too complex. I have also written an article on Vuex before, give it a read if you're interested.

{% link https://dev.to/napoleon039/when-why-and-how-to-use-vuex-9fl %}

In my next article, I'll explain mapping getters, mutations, and actions to computed properties. Thank you for reading!