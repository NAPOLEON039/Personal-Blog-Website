---
path: '/what-is-code-splitting'
title: 'How code-splitting can help your site be more efficient'
date: '2018-09-03'
---

![Cover image](https://thepracticaldev.s3.amazonaws.com/i/rk2b95me6wfw9126ccr0.JPG)

You make an amazing website. It looks good - there's great color contrast, the subtle animations are great to interact with and the website has an overall nice feel.

But you still wonder, why does it take so much time for the initial load? The code of the website doesn't seem to have any problems. Then why does it load slowly?

That might be because of multiple pages (or components, if you're working with frameworks) loading at the start, when there's only need to load one.

Webpack offers a solution for this problem: **code-splitting**. Since it's something offered by Webpack and not by a specific framework you can make it work anywhere using Webpack.

## Introduction

This article is about code-splitting in Vue. More specifically, it's about code-splitting components in Vue by *route*. This is an important topic because code-splitting will help you run your website faster. This is because only the necessary components are loaded and you can have other components load along with it if you want. You’ll most likely use this when working on big projects which have multiple components and routes. Code-splitting makes our code performant and improves load time.

To get the most out of this post, it would be best to have a Vue project with Vue Router set up. You need Router for this one because we are going to apply code-splitting to our *routes*. Of course like I mentioned earlier, you can even do this with other frameworks, there is nothing framework-specific here. There are a total of 3 approaches to implement code-splitting. We will be using one of them called **dynamic imports** You can find more about them in the [Webpack docs](https://webpack.js.org/guides/code-splitting/).

## Concept analogy

Think about wanting to drink juice out of a container. You don't empty the entire container, drink how much you want and then put it back into the container. What we do, is take out some in a glass to drink. If we want more, we proceed to pour some more juice into the glass. Code-splitting does something similar to this. It might seem like this large setup, but it's fairly quick. So let's get started!

## Project setup

You must have a Vue project set up with Vue Router. If you don't have one, make a simple one. There must be more than one component for the result of code-splitting to be evident. It doesn't matter if there is only an `<h1>` inside the components, what matters is you actually apply this to understand it better. Go ahead and set up a project if you haven't already. Here's a sample one:

![image of About component for reference](https://thepracticaldev.s3.amazonaws.com/i/oeju9iujk964vxc9yonv.JPG)

![image of Home component](https://thepracticaldev.s3.amazonaws.com/i/pp3mmean39j46y2rnsgq.JPG)

Now first, you have to install the dynamic import plugin for Babel.

![image of install command for Babel plugin](https://thepracticaldev.s3.amazonaws.com/i/psn6hgri0oksjzx08j7b.JPG)

The reason why Babel requires this plugin is because while Webpack understands dynamic imports (which is what we're using) and bundles accordingly, on the server-side we need Babel to understand and transpile it. **Satyajit Sahoo** has explained it pretty well in the babeljs slack:

![image of babeljs slack conversation](https://thepracticaldev.s3.amazonaws.com/i/2o2ef21v8grbjs3sr91z.JPG)

Next, we include our newly installed plugin in the Babel config file.

![image of .babelrc file](https://thepracticaldev.s3.amazonaws.com/i/bqs0b0o511mm1fv66wzr.JPG)

That’s done! Let’s get to the main stuff now.

## Implementing code-splitting

The usual way of importing components to include in the `router.js` file is as follows:

![image of router.js file](https://thepracticaldev.s3.amazonaws.com/i/61m91bga6swb7hhv614m.JPG)

Save your current code and start it in dev mode.

```bash
#Run development server
npm run dev #for Vue v2.x

npm run serve #for Vue v3.x
```

Visit this in Chrome or Firefox or any browser of your choice. Now go to the console from the Developer Tools [F12 on keyboard]. Visit the Network tab. Now reload the page. You'll see both components loading. After selecting js from the filters (it's a bit above the actual result window, refer to the screenshot below) you will see app.js, take a look at it's size.

![image of Network tab in Development Tools](https://thepracticaldev.s3.amazonaws.com/i/5gphrhv4q5z8kjw3b0ei.JPG)

Without code-splitting, at initial load, the About component is bundled together with the Home component and loading even though we don't need it yet. Time to change this. There is another way to make imports which is Promise-based, so make sure to include a *polyfill* for older browsers which do not support Promise.

![image of new import statements in router.js file](https://thepracticaldev.s3.amazonaws.com/i/yvm5sd4s9oont5oelc58.JPG)

And we’re done. That was quick! What we did is create a function that returns an import. This is the dynamic import syntax. Whenever webpack sees an import like this, it generates a **chunk**, also called a code split in response to the Promise. Now save the code, reload the page and check the Network tab again, the components are not loaded all at once. Start visiting your routes one by one and you’ll see components appear in the result window as their routes are visited. Here are images of my Network tab as I visit both my routes one after the other:

![Network tab for initial load](https://thepracticaldev.s3.amazonaws.com/i/shw5iz8tzl0e9p2eleot.JPG)

![Network tab when visiting About route](https://thepracticaldev.s3.amazonaws.com/i/diqovhgdfz8356mssns0.JPG)

You did it!! Have some of that juice from before. But remember not to gulp down all of it ;)

But wait, what’s this; all our components in the Network tab are represented by numbers. So unintuitive. Let’s solve that: Add this comment to your imports.

![Giving names to our chunks](https://thepracticaldev.s3.amazonaws.com/i/tscfo1rq3asfn5nqs6hy.JPG)

Webpack interprets these comments as quite literally, **chunk names**. The names given as values to *webpackChunkName* will be used to represent the particular component in the Network tab instead of numbers. And now you can know which file you’re looking at from the Developer Tools. You'll probably see the About component still present at initial load. However, a quick look at the size of the file will reveal that it is not the actual component loading since the size is 0 bytes. It is probably Vue working behind the scenes. The actual component loads only when we visit it's route.

## A more real world example

I've given an example of a juice container. But how does this relate to us in reality?

Let’s take a look at how this works in a real app. For example, we have a website with an image-heavy route and a home route along with some other routes as well. If we load the website, the home component would load first as one would expect. Now it’s possible this home component would have some animation or images to draw the attention of the user. But this page will render slowly because another route (component) has lots of images. There could also be another component with a few animations. All these components will drag the home page with them. One would understand why an image-heavy page would render/load slowly after seeing its contents. But the home page of any website is supposed to load quickly. Code splitting the components based on their routes would be one ideal solution. A practical example where we could face such a problem would be an Instagram or Pinterest clone.


Now that you've seen what code-splitting can do for you, why not visit the Webpack docs and check the other two approaches as well. Maybe you'll find yourself in a situation where going with one approach will not work, but another is perfect for you. I first encountered code-splitting on [this Egghead.io community resource](https://egghead.io/lessons/vue-js-code-split-by-route-in-vuejs). Check it out as well.