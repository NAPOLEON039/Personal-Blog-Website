---
path: '/custom-express-server-nuxtjs'
title: 'Creating a custom Express server in Nuxt.js: 2 things to remember'
date: '2021-05-25'
description: 'A short post listing 2 things to remember for creating an Express server in Nuxtjs'
cover: ''
---

<!-- ![Cover image]() -->

<br />

## Why would you want to create a custom server?

A Server-side Rendered (SSR) Nuxt.js application requires a Node.js server. This server renders a webpage and passes it to the client-side Vuejs. This server is implemented by Nuxt itself behind the scenes. However, this simple server makes it difficult to implement things like a POST or GET request, a Pusher channel, cookies, etc.

I needed to run a Puppeteer script on the server and thus extended the basic server provided by Nuxt.js by creating an Express server.

For a server-side rendered application, a Node.js server needs to be configured. Although Nuxt provides one for you, you can extend this server with *serverMiddleware*.

> Note: While you can extend the server with *serverMiddleware*, you can also extend and control the application's routing with *middleware*.

## Two things to keep in mind
Here are 2 things to take note of when creating an Express server in your Nuxt.js application - 

### 1. Make sure to export the server
In a simple JavaScript/Node.js application, an Express server will be the one controlling and managing most of the application. But, in a Nuxt.js application, you need to export it because you are *extending* the server provided by Nuxt.js.

![Exporting an Express server](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/weasho2a7pgd3fnev0df.png)

### 2. Mention the server file path in Nuxt.js config
This is mentioned in the [documentation](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware#custom-api-endpoint) as well. Here is what worked for me:

![ServerMiddleware in Nuxtjs config](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d99wz0zmz5dux8fi3yfk.png)

## Conclusion
It is very easy to extend the functionality of the default server provided by Nuxt.js. Remember, if you also want to control routing, you need to extend *middleware*.

The [Nuxt.js documentation](https://nuxtjs.org/docs/2.x/concepts/server-side-rendering) was my main reference for creating my custom Express server.