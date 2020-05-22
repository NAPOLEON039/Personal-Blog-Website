---
path: '/useful-axios-features'
title: 'Do you know how to use these useful Axios features?'
date: '2019-06-01'
---

## Introduction
Recently while practicing some Vuejs, I made a classic signup/login SPA. I already knew Axios a bit and learned some new features because I needed them for this SPA. However, when I looked up some articles for it, I found that some of these features were not explained properly. I wrote this article to explain some of these features.

I won't be explaining how Axios works nor will I go in-depth on these features. I am only introducing them since I found very little or almost no information on them when I looked around.

## Adding headers to requests
This might be something known to you if you worked on a project that required you to use this. But for most people new to Axios, like me, this is not very well known. There are two popular ways to add headers to a request. One way is to add it via the config options:

![Adding headers to config object in the same file as the request](https://thepracticaldev.s3.amazonaws.com/i/di7lw01skrffohfsuba6.png)

Here, we send a post request to an example API endpoint. We pass some data and a third argument along with it which is a config object. This config object contains a `headers` object. In here, we can specify headers and assign them values. We can pass this config object to the requests we want. This is a good way to control which requests get these headers. 

Now, what if we want to add a common header or a common set of headers to all requests? We can set global headers on the axios instance in the main JavaScript file.

We can add headers that will be *common* to all types of requests or we can set them up for certain kinds of requests:

![Adding headers to the main file where the Axios instance is](https://thepracticaldev.s3.amazonaws.com/i/ya17su6u7t9cpphxzt1m.png)

Here are two headers written in the entry point of your application. If you're working in Vue this would probably be `main.js`. It could also be `index.js` depending on how you've named your files. I've defined these *global* headers on the main axios instance itself, so they will be added to all appropriate requests.

The first one is a common header. That means it will be added to all requests, no matter what type of requests they are. The name of the header is `Authentication` and its value is assigned to it (you can name the header anything you want and give it an appropriate value).

The second header is defined in a similar way, but it is for *get* requests **only**. So the header `Accepts` will only be added to *get* requests. With this, you have added headers to your axios requests.

## Interceptors
Interceptors are functions that will execute on every request that leaves the app and every response that reaches the app. We do this on the axios instance using the `use()` method. For request interceptors, it receives the request configuration as an argument. For response interceptors, the argument would be the returning response.

![Creating a request interceptor](https://thepracticaldev.s3.amazonaws.com/i/0h4315r3cilsw5f6ua4y.png)

This is a request interceptor. It will *intercept* all outgoing requests and execute this function on them. Since we receive the config object as an argument, we can log it to the console, add headers to it before it is sent, or do some conditional stuff. But, we **must return** the config object, otherwise, the request will be blocked.

We can create a response interceptor as well:

![Creating a response interceptor](https://thepracticaldev.s3.amazonaws.com/i/o10ym8torc5ynofhctq8.png)

This interceptor will execute on every response that the application receives. Here, we return the response object since not doing so will block the response.

If an interceptor is not needed, we can remove it with a conditional statement as well. However, for this, we need the id of the interceptor. This is similar to how we get the id of and remove a `setInterval()`. Let's remove the request interceptor as an example:

![Removing request interceptor](https://thepracticaldev.s3.amazonaws.com/i/gl0pmxockkwfjd0zw7jj.png)

We removed the interceptor with the `eject()` method by passing the id of the interceptor to it. Of course, I did it immediately, so the interceptor won't even be executed. But you can put it inside a conditional statement or remove it based on some other event. Removing a response interceptor should be something similar like - `axios.interceptors.response.eject(resInterceptor)`.

## Creating a custom Axios instance
For most of your projects, you will probably only use the global axios instance that we've been using thus far. We import it using `import axios from 'axios';`. Although we can name it anything other than *axios*, it still is the global instance. When creating big projects you may come across a certain problem. Some requests need certain configurations and/or headers, while there are other requests that require a different set of configurations. 

While you can create different configuration objects and pass them along with the requests, big projects come with a complex folder structure and modular files/components. A global configuration is an option (like the one we did with the headers on the main Axios instance), but how do you apply different configs for different requests?

The answer is creating a custom instance of Axios. 

This instance will work exactly the same way the global Axios instance works. You can also apply global configurations and add headers to this custom instance. They will be separate from the ones on the global instance (the one in the `main.js` file). This custom instance can then be imported in files where it is needed. So we can then use this custom instance for requests that need different configurations than the one applied on the global instance.

The custom instance can be created in the entry file `main.js` (or `index.js`, depends on what you named it) but it is recommended that we instead put it in a separate file. 
![Creating a custom instance of Axios](https://thepracticaldev.s3.amazonaws.com/i/5fxdz7e8tjk8qj1bi6jk.png)

We create our custom instance by using the `create()` method. It takes an object where we can define all our configurations. We can also define them outside the `create()` method like the *auth* header we have defined. The requests that use this custom instance will have this *auth* header. Even though the global headers on the main Axios instance are supposed to be applied to all requests, they will not be applied to these requests, since they use the custom instance instead. On the other hand, the requests that use the main Axios instance will not have this header. 

Finally, we also need to export it to use it in other files.

## Wrapping up
These are the 3 features that I found either very little or no information on when I looked up for some articles on them. Though I've only given little explanation about these features, with the help of the examples, you can start using them. 

These are, of course, not all of the features that have little to no guides on them. There might be many more out there. However, I can't look them up because I don't know them. If you know other features that need to have extensive guides on them, do introduce them and explain their use the best you can.

Take a look at the [official Axios documentation](https://github.com/axios/axios#example) for more such features.

Edit: For anyone new to Axios wondering the reason behind using the `config` name as a variable, it is not a keyword but a simple object name. You can use any name other than `config` if you wish, but I felt using `config` would be better to denote that object's contents. Also, if you read code written by other developers, this object will often be named `config` as well.