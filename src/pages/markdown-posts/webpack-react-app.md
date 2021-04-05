---
path: '/webpack-react-app'
title: 'Make a simple React app with Webpack - An easy practical guide'
date: '2021-04-05'
description: ''
cover: 'https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tboqsecxwxbjw3ya75kr.png'
---

![Cover image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tboqsecxwxbjw3ya75kr.png)

<br />

Create React App is the first choice of most, if not all, React developers. It creates a React project for us and only requires a few commands. Its simplicity and quick nature make it a favorite among beginners as well. But, there are also ways to create a React app without it.

One of these ways is using a module bundler like Webpack and a compiler like Babel.

By the end of this article, you will have your very own React app without using `create-react-app`.

## Dependencies and project structure
Since this React app will use the Webpack module bundler, we need to install quite a few dependencies. These dependencies are required by Webpack so it can detect and work with the various file types.

Here's what we need to install:

![Installing react](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hxuk9s3coubsbyngjs6j.png)

These two packages are the dependencies we need for our simple app. If your project needs any other packages, you may install those. 

There are close to 10 devDependencies, so let's install them in groups and I'll explain what each dependency is for. First comes webpack:

![Installing webpack and webpack server](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gm5gclxvv2q6z6nbaajj.png)

* `webpack`: Installs the webpack module bundler
* `webpack-cli`: Offers a variety of commands that make it easier to work with webpack on the command line
* `webpack-dev-server`: Allows us to use a simple web server with hot reload

---

Next, we'll install Babel:

![Installing Babel, some presets and a loader](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/grf4bb4s3tzlnqdizrvr.png)

* `@babel/core`: Core package for the Babel compiler
* `@babel/preset-env`: A smart preset that allows us to use the latest JavaScript syntax
* `@babel/preset-react`: As the name suggests, it transpiles React code to plain JavaScript
* `babel-loader`: A plugin that enables Webpack to work with Babel and its presets

---

The remaining devDependencies are for CSS and HTML:

![Installing loaders for CSS and a plugin for HTML](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8wqsfd230ub9rv2rpou9.png)

* `style-loader`, `css-loader`: Required so that webpack can detect `.css` files
* `html-webpack-plugin`: Generates an HTML file that includes all your Webpack bundles via `script` tags

---

Everything a basic React project needs is installed. Now create these folders and file in the project's root:

1. A `public` folder for the HTML file and assets (images, fonts, etc.)
2. A `src` folder for `.js` files and React components
3. A `babel.config.json` Babel configuration file

At this point, your project folder should look something like this:

![Folder structure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fau70gxxufbz49ys0v4b.JPG)

## Webpack and Babel config
Let's add the presets in the Babel config file:

![Babel config file](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dhrtljke6m69muod5bal.png)

It is recommended to have two separate config files for Webpack - one for development and one for production. Although both files will have the same configuration for loaders and any plugins, there are slight differences. This is what a config file for development looks like:

![Webpack development mode config file](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p8zfbvnmd6xv06c1bqf1.png)

Here, we first declare the `mode` configuration option. With this, Webpack can use its built-in optimizations accordingly. Next, `module.rules` is an array containing 3 objects:

1. This rule tells Webpack to look for files ending in `.js` and use Babel to compile them. `babel-loader` helps Webpack work with Babel.
2. The second rule tells Webpack to look for files ending in `.css` and make sense of them with the help of two loaders - `style-loader` and `css-loader`.
3. The last rule helps Webpack recognize image files. There is no need to install any external loader for this.

> **Note**: According to the Webpack docs, `style-loader` and `css-loader` need to be used in the exact same order as in this config file or it won't work.

After loaders, we have two plugins. When Webpack bundles all JavaScript, CSS, and other necessary files, it also creates an HTML file. This is where we use the `html-webpack-plugin`. This plugin tells Webpack to use our HTML file as a template and inject the compiled bundles into it.

So, instead of creating its own HTML file, Webpack instead uses *our* HTML file - `public/index.html` and adds the bundled files to it via `<script>` tags.

The other plugin we use is `HotModuleReplacementPlugin` which comes with the webpack package and is used for hot reloading our app in development mode.

Finally, the `devServer` object contains options used by `webpack-dev-server`.

Now let's take a look at the production version of the configuration file:

![Webpack production mode config file](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/whm4q3s5t5vkce50j9k2.png)

Not much has changed except that we no longer need `HotModuleReplacementPlugin` and `devServer` since they will not be used in production. The `mode` option has also been set accordingly. You might have noticed the changes in `output`.

`output.filename` has a value that we haven't seen before. The values in square brackets are tokens. The `[name]` token allows Webpack to name files differently if we use code-splitting. `[contenthash]` is used so that the bundle file name changes when its content changes.

## Running the app
Our app is almost ready. I have a simple `App.js` component:

![Simple App component](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jlbntbk3wmwq12lnqb6g.png)

The app looks like this now:

![Folder structure after adding Webpack config files](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rupfvcwip7fzozxrz4it.JPG)

Finally, we need to add scripts to run our app:

![Build and run scripts that use both Webpack config files](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mox77xufnpdd270uuv7p.png)

With the `serve` option Webpack uses `webpack-dev-server` to create a web server. Let's run our app.

![Running the app](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b6hmewbev8dpvnxiu5dc.png)

Open `https://localhost:8080` in your browser and your app should be running.

## Wrapping up
This is a basic React app where we manually configure Webpack. I hope this helped you to understand a bit about the various plugins and loaders Webpack requires and what its configuration files look like. The Webpack documentation is worth reading. It was the major resource I used for this article.

In comparison, [Parcel](https://parceljs.org/getting_started.html) uses very few dependencies. I wrote another article about creating [a React app with Parcel](https://niharraoteblog.netlify.app/how-to-create-a-minimal-react-and-parcel-app-in-5-steps). That said, both have their own pros and cons. 

Here are links to some additional resources:
1. [Webpack documentation](https://webpack.js.org/configuration/) on config files and the various options a config file can have
2. Webpack documentation on [loading CSS](https://webpack.js.org/guides/asset-management/#loading-css) and other assets
3. Webpack documentation on [webpack-dev-server](https://webpack.js.org/guides/development/#using-webpack-dev-server) and [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/#basic-usage)
4. An article from [Carl Rippon](https://twitter.com/carlrippon) on creating a [React app](https://www.carlrippon.com/creating-react-app-with-typescript-eslint-with-webpack5/) that uses TypeScript and ESLint with Webpack 5
5. Babel documentation on its [config files](https://babeljs.io/docs/en/configuration)