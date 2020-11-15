---
path: '/have-you-tried-parcel-for-your-vue-projects'
title: 'Have you tried Parcel for your Vue projects?'
date: '2020-11-15'
---

<!-- ![Cover image]() -->

<br />

Did you think `vue create` gives you a Vue project with few dependencies? Think again. Parceljs will blow your mind.

With [Parcel](https://parceljs.org/), you can create a project very quickly without installing a bunch of dependencies or edit lots of config files. This is very useful when you want to test a concept you learned or practice something specific instead of making a full-blown project. For this, Parceljs gets you started quickly.

Although you can get the same result without Parcel, a bundler that doesn't get in the way is always a good thing to have. Plus, it can create a server with hot reload.

## Creating a Vue project with Parceljs
I wrote an article on creating a [React project with Parcel](https://niharraoteblog.netlify.app/how-to-create-a-minimal-react-and-parcel-app-in-5-steps). The steps for creating a Vue project are similar.

### 1. Creating the project
Before we install Parceljs and other dependencies, we need a project directory and a package file

![Creating project](https://dev-to-uploads.s3.amazonaws.com/i/me7nsw8yz2c2wywuq3y5.png)

### 2. Installing dependencies
The dependencies required for a Vue project are even fewer than those required for a React project.

![Installing dependencies for the project](https://dev-to-uploads.s3.amazonaws.com/i/ygywfd7kxf8cnbi5srxs.png)

### 3. Editing babel config and package.json script
After installing the necessary dependencies, let's add the Parcel scripts in our `package.json` and Babel preset in its respective config file

![Editing babel config file and adding start script to package.json file](https://dev-to-uploads.s3.amazonaws.com/i/xuc9ev1u3kg6uczy4s11.png)

### 4. Running the project with Parcel
Running a server is pretty straightforward. Add the `--open` flag to automatically open the server in your default browser. Without the flag, you'd need to type it out.

![Running localhost with the start script](https://dev-to-uploads.s3.amazonaws.com/i/zqfrhu5y1lu0ibqh0g3l.png)

## Wrapping up
Four easy steps to set up a Vue project with Parceljs. Although you need to make some effort to get something like Sass working properly, for the most part, Parcel does what you expect from it and moves out of your way.

[Parceljs](https://parceljs.org/) is a good alternative to Webpack and I would recommend it to those who might be overwhelmed looking at Webpack's docs. Parceljs is working on making things more buttery smooth, but a majority of the things work just fine. If you don't want to run a command in the terminal and have an application bundler working behind-the-scenes, but want to take charge and work closely with your bundler, I highly recommend going with Parcel first.

While Webpack is more stable, reliable, and probably supports everything you may ever want in your project, Parceljs is simpler than Webpack. Although an application bundler packed with features, like Webpack, is a great choice, Parceljs is a decent alternative.