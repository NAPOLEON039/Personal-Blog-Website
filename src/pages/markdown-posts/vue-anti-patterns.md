---
path: '/vue-anti-patterns'
title: 'Are you committing these mistakes as a Vue developer'
---

## Introduction
I recently subscribed to an awesome podcast on web development called [Full Stack Radio](https://twitter.com/fullstackradio) by Adam Wathan. There was an episode on **Anti-patterns in Vue.js** which had Chris Fritz from the Vue core team give a lot of great tips on Vue architecture and some mistakes Vue developers often make. I have not included everything that was talked about, so make sure to listen to the full podcast episode for some great conversations and Vue goodness. I'll include a link at the end of this article.

There were various topics talked about in the episode. Here are my notes on them:

## State management and events:
For complex states, Vuex is best. People usually use an *event bus* for managing state, having components subscribe to events. But what ends up happening is a lot of duplicate state being created which gives rise to it's own set of problems when trying to keep everything synchronized. In the event of debugging, there is no way to know where a certain change is coming from. 

**Vuex** offers a lot of options and makes things traceable. There is a separate Vuex tab in the Vue DevTools which is quite useful for debugging as well as prototyping. We can track the different state changes made, change the styles and with HMR(hot module reload), see the changes happen instantly. For small projects, where there are maybe one or two events that components need to communicate between themselves, an event bus works fine. 

If you find yourself doing one or more of these things then that's a good indicator that you should start using Vuex to manage the complex states in your project:
1. When you keep passing a lot of props to a component
2. Have the parent component keep track of the state of a child so that the siblings may interact with each other via the parent
3. When the props passed to a component are not used by that component itself but needed for another component nested inside it

-----

Another no-no is using `this.$parent` instead of emitting an event to access and manipulate the state of the parent. This might seem trivial since we clearly know what is being changed in the parent by the child component. But if the project is a huge one and especially has been going on for quite some time, it's difficult to keep track of the entire thing and remember why a certain change is happening inside the parent component. It might seem like a good solution and even a reusable one. Even if you don't use it again, other developers (your fellow devs on the job or fellow contributors in case you're working on OSS) might. Anytime this happens, it makes understanding the code difficult and very hard to debug. 

## Custom events and callback props. Which is better?
Custom events are those when we emit some event and pass a value through it:
```javascript
this.$emit('modal-closed', this.isClosed);
```

On the other hand, callback props are normal methods that the parent passes as a prop for the child to execute. This is done instead of passing a value back to the parent like in *custom events*:
```html
<button @click="onClose">Close Modal</button>
```

So both of them are used to carry out the same task. In the first case, we passed a value to the parent via an event and the parent then executes a method or does what's needed with that value. In the second case, we passed the method to be executed to the child itself, expecting it to execute the method on behalf of the parent. 

So which is better?

There is practically no difference. Like Chris says:
> It's stylistic

This means it totally depends on the user. If you've been using one way there is no reason to change it. Though if you haven't really thought about which method to use, you might want to consider using *custom events*. The custom event system is much better in terms of confidentiality. It keeps the parent from knowing unnecessary information. Since we pass a single value, the parent is only told of necessary details. 

When working on component-driven projects, the goal is to work on the component without worrying about other components. By having the child execute a method on behalf of the parent, we not only have to depend on one component executing a method for another component, but we also may not be aware about that particular child executing that method. 

This might happen if there are too many components or the particular parent has many children. It might also become confusing after a few months or so and we may find it difficult to remember how that method is being executed by only looking at the parent. 

This does not mean that using callback props has any disadvantages. Using custom events feels more Vue-like and is demonstrated in the [official Vue documentation](https://vuejs.org/v2/guide/).

## When is the right time to use *watchers*? Is computed properties better?
Computed properties and watchers are so similar in what they do, that most new Vue developers are confused and not sure which to pick. Generally, watchers are best used for asynchronous tasks.

If you want to update a state when another state updates, then that calls for computed properties. A simple example would be deriving a `fullName` property from `firstName` and `lastName`. 

Using watchers will get tedious since we have to create a watcher for each property that we need to keep track of. Trying to change the state of a property by closely monitoring all the properties it depends on is a lot of work.

In such a situation, computed properties are a boon. All we need to do is give it the properties it depends on. As soon as any of those properties change, it re-evaluates and makes the changes. That property is cached so that it doesn't get needlessly re-evaluated every time unless it has *actually* changed. 
>This is  the performance benefit of computed properties over regular methods and watchers.

This doesn't mean watchers have no use. There are situations where computed properties do not help us and we need reactivity that methods do not offer. Thus, in such situations, watchers are the best choice. 

I encountered a similar situation during a personal project I was working on. I had an array of users, where each user was an object. There were 3 radio buttons and depending on which button was selected, particular users had to be displayed. There were methods that picked the required users to display. It's quite easy to run the methods using a simple click listener (which is how I did it). But if we have to make a choice between computed and watchers, then computed properties would not work in this situation. 
>A computed property works by deriving results from the change in state of one or more properties and returns a value. 

Hence for this, watchers are the most suitable out of the two.

If you want to learn more about using methods, computed properties and watchers, definitely check out this in-depth [article](https://css-tricks.com/methods-computed-and-watchers-in-vue-js/) by Sarah Drasner.


## Reusing code the right way

There are quite a few ways to reuse code in Vue. However there are 3 of them which are widely known and quite popular among developers:
* Using components
* Using directives
* Using mixins

Making use of components to reuse code is the core foundation which Vue is based on. However Chris tells us that many of the open-sourced plugins make use of directives and mixins when they could have been components. Many developers are making use of mixins and directives the wrong way.

>A good use case for mixins is when we want components to do something different than their usual specific behavior

----- 

Directives are there for sharing behaviors between many different elements. They make more sense on an element rather than make that behavior part of a separate component. Very often we see some behaviors that are quite generic and not specific or unique enough to warrant a separate component for them. 

Chris mentions a good example of an autofocus feature. We need to manually manipulate the DOM with it but it won't be used so much that we require a component for it. A directive is the best choice in this situation.

-----

People seem to be using mixins a lot and sometimes even when there is no need for it. *Scoped slots* provide the same functionality as mixins and are, most of the time, the better choice. The situation where we would absolutely require a mixin is very specific. A scoped slot is more compositional, everything we need is provided by the wrapper component and we can choose what we want to include. 

A good use case for mixins is when we have components that do something very specific but depending on the situation we would like them to do something different. We can create a mixin that is a function which returns component options. Thus we have dynamically generated component behavior. For such dynamic behavior we would need some variables as well. Instead of putting them in the component along with the required ones, we can instead put them inside this function. 

----

There are more interesting conversations in the episode and lots more to learn. I recommend listening to the episode at least once to get a better idea of things and then subscribing to this awesome podcast.

You can find the podcast episode [here](http://www.fullstackradio.com/87). You can find all of the people mentioned above, on Twitter - [Sarah Drasner](https://twitter.com/sarah_edo), [Chris Fritz](https://twitter.com/chrisvfritz), [Adam Wathan](https://twitter.com/adamwathan). Make sure to follow them so you can stay updated on their work. If you have some questions regarding Vue I'm sure these guys will be more than happy to help. If I missed any good tips that I should've added to this article, let me know in the comments below.