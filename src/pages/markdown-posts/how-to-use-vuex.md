---
path: '/when-why-how-to-use-vuex'
title: 'When, Why and How to use Vuex'
date: '2018-11-24'
---

![Cover image](https://thepracticaldev.s3.amazonaws.com/i/jtzrbad3uwh2tjgn53eq.png)

## What will you get from this article?
This article attempts to teach you the popular store **Vuex** used in advanced, big and complex Vue.js websites and web applications(web apps). This is by no means a complete and absolute guide. It only serves to inform you *when* should you consider adding Vuex to your project, *why* should you use Vuex for such situations and finally *how* can you get started with using Vuex for the first time. 

There will be some simple examples used in this article where Vuex might not be necessary. But these examples are only for helping you grasp some concepts, so keep that in mind.

## What is Vuex?

A majority of JavaScript frameworks have these so-called *stores*. You might have come across this term quite a few times. What exactly does this word mean? Is it a kind of storage? Something related to e-commerce?

Well, not exactly 🤷‍♂️

A store is something that can be said to hold the key to creating advanced applications and websites in your JavaScript framework of choice. Whether that's Vue.js, React, Ember or Angular. Now, this does not mean that you absolutely **must** use a store in order to create an advanced web app, no. You can create a pretty advanced website even with the simple, in-built features provided by that particular framework. However, a store gives you more control in the chaos of an advanced and huge(not to mention, complex) website/web app. Making use of a store allows you to organize certain things, namely, state.

The state of a website or web application is necessary for increased interactivity with the user. If you have ever used props to send some data to a child component and have used custom events to send back some data to the parent (using `this.$emit`), then what you've been doing is managing state. For example, passing props to tell the child component all the items in a list and emitting an event to tell the parent an item has been crossed off, is managing the state of that list.

Keeping track of and managing the state for our website is thus very important. Vuex does this for us.

## Why should you use Vuex?
Vue isn't limited to using a specific store. Many stores are available for us to use. There is `Redux`, which is very popular as a state management library since it's used by almost everyone who uses React. But even though you can use Redux and other stores with Vue, it's still better to use Vuex.

The reason for that is Vuex, like Redux, is also inspired by Flux and is built for taking advantage of the features Vue provides out-of-the-box. For one, while the state in Redux is immutable, and entirely replaced when changing it, Vuex provides a very specific way to *mutate* state.

What makes Vuex more powerful is that the components get their state from the Vuex store and can reactively and efficiently update whenever the store's state changes.

Providing so much, Vuex should be at the top of your list when picking a state management tool for your Vue projects.

## When is the right time to use Vuex?
Vuex is powerful, efficient and takes care of a lot of stuff for us. So we should make more use of it, right? Wrong!

>Just because a feature/tool/library offers a lot of advantages doesn't mean it's supposed to be used all the time.

A good example would be VueRouter. Even though it's jam-packed with some really helpful features, you probably wouldn't use in all websites. Some websites don't need a Router. Maybe there is a back-end like Express, which is supposed to handle the routing of pages, or maybe you have a Single Page Application (SPA) that uses dynamic components. Similarly, not every website or web application justifies the use of Vuex. 

In simple words, it's like buying a smartphone when you simply want something for making and picking up calls. That phone has a good camera, 256GB storage space, RAM that allows you to play high-end games. But if you only want to make calls, do you really need all of that?

It's the same thing with our Vue projects and Vuex. The stuff Vuex offers has to be necessary otherwise rather than being helpful, it will be a burden for the website. There are certain situations where you can get by with the basic Vue features and at times you really need to call upon the mightiness of Vuex. So *when* should you consider using Vuex?

The core of Vuex is a store that keeps all the state of our application in a central place. Generally, we make use of props and custom events to keep track of state. That is fine as long as our website has a few components that change state. What would happen if your project gets bigger and more complex?

There would be many more components. Props getting passed to more components, a ton of custom events firing off. Who changed that state, it was supposed to be something else but some component changed it. Wait....how did that component access it and which component was it?!!

You see, chaos! When a website has more components and added complexity, you need to organize how changes to state are made. This is an ideal situation where the centralized Vuex store would be of help. Vuex used for small or simple applications/websites would be like our smartphone example, an overkill. **Only** use it when you feel your project has the complexity that needs some help with managing it.

## How to get started with using Vuex
I won't be going in depth about using Vuex. These are some fundamental concepts about using Vuex. This section will have some simple examples for changing state in Vuex store and retrieving state.

The first step is to install Vuex.

```bash
npm install vuex
```

It is better to keep all Vuex logic in a separate file. We will keep our logic in a file called `store.js`. Of course, you can name it anything you want. We will have our store object in this file and then import it into `main.js` where we will register it with the global Vue instance.

![Creating our store](https://thepracticaldev.s3.amazonaws.com/i/6uim19875n67yrnzmkr5.png)
![Registering our store in main.js](https://thepracticaldev.s3.amazonaws.com/i/pibvz9xu4u6c9f2rau6k.png)

In our `store.js` file we have a *store* object that is our Vuex store. We need to have some data in our store that will be then mutated or changed and retrieved by other components. We can add data to our store using the pre-defined keyword `state`. We can use it as we use `data()` in regular Vue instances. In our store, we already have a counter data property. Now we need to retrieve it from a component. Let's retrieve *counter* from our `App.vue` component. We can do this using the command `this.$store.state.counter`. Here, `$store` keyword is available to us since we registered our Vuex Store in the `main.js` file.

![initial App.vue component](https://thepracticaldev.s3.amazonaws.com/i/j95ywnjld5ji76kappjl.png)

Now there is another concept you would be using a lot when retrieving data. There can be situations where you need to work on the data or carry out some math operations before using it. If this work is different for different components, then there is no choice but to implement it separately for each component. But if the operation is the same for all components, then you can use `getters`. Using getters, we can perform operations on our data and then retrieve the final result. A *getter* feels similar to a function. But it is different. That's because a getter requires the state object. This is passed to the getter automatically by Vuex. We have used our `counter` data property for keeping track of the number of times a button is clicked and then we retrieve it. So how about we double the number of clicks before displaying them. We can use a getter to achieve this result.

![Declaring getters in our store](https://thepracticaldev.s3.amazonaws.com/i/fgzwu4m8rsdwll2kdzfo.png)

We have created our getter. Let's use it in our `App.vue` component. Keep in mind that we have to use our getter so we can't use `this.$store.state`. For *getters* we use `this.$store.getters`.

![Using getters in our App.vue component](https://thepracticaldev.s3.amazonaws.com/i/wkpb8s252f7ijdzcwwd4.png)

Remember to use the name of the getter only. In our example, this would mean using `doubleClicks` and **not** `doubleClicks()`. That's because there is no need to run it even though it might seem like a regular function. Think of it as when attaching a callback function to an event listener. Like how that callback gets called automatically, getters are automatically called and executed by Vuex.

Finally, we will see `mutations`. When mutating the state of a data property, you simply *commit* that mutation. The changes to be done to the data property are specified in the mutation. The state can then be changed from any component and still be updated the same way.

We change our `counter` data property by manually incrementing it. Let's instead create a mutation for it. `mutations` also need access to the *state* object in order to mutate it.

![Creating a mutation in our store](https://thepracticaldev.s3.amazonaws.com/i/bstgbtgn7i97oerr7xkw.png)

When it comes to using mutations it is a bit different. Unlike with *getters* and *state*, mutations are not accessed like `this.$store.mutations`. Instead as mentioned before, a mutation is *committed* and we specify the name of the mutation in parenthesis.

![Using mutation in App.vue](https://thepracticaldev.s3.amazonaws.com/i/tb8913xdjiij44vemppc.png)

Here, we tell Vuex to *commit* the mutation called `increment` or in other words - execute the mutation called `increment`.

---

These were quite simple examples and you shouldn't use Vuex in such a scenario. But I hope you were able to understand some fundamental concepts for using Vuex. 

With this, you have learned the necessary concepts to start exploring the advanced uses of this state management tool. You should now be able to decide if a project needs Vuex and how to go about using it.