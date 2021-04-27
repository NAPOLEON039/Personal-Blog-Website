---
path: '/persistent-layout-nextjs'
title: 'Quick tips: Persistent wrapper content in Next.js'
date: '2021-04-22'
description: 'Persistent content or header across all pages in Next.js app'
cover: ''
---

<!-- ![Cover image]() -->

<br />

## What kind of content?
Generally what comes to mind when thinking about some content that would stay constant across all or multiple pages, is a navigation bar. It can also be a header, some branding, or a menu.

This is easy to do with the `_app.js` component present in Next.js projects. If you created your project with `create-next-app`, you would have this component too.

![_app.js component](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zff6ioush0ai4q890mql.png)

Creating a component that wraps around `<Component />` will get the job done.

## The wrapping component
Putting any component in the `pages` folder will create a new page. This component will not be a separate page on its own. So, create a new folder named `components` at the root of the project. Create a new file in it - `Layout.js`.

![Project folder structure after creating components folder with wrapper component](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d1jbknv7im8dgpjod602.png)

Writing a simple header like this:

![Wrapper component - Layout.js](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wvw7kvn0alayl893t8ej.png)

and wrapping it around `<Component />` in `_app.js`:

![_app.js component after using the Layout.js wrapper component](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tib3u0r1yaf3lspovu61.png)

it should show up on all pages. Run the project:

`npm run dev`

Here is a CodeSandbox. I added some styles to `Layout.js` and also some nav links. As you can see, the header (along with the newly added nav links or navbar) is shown on both pages.

<iframe src="https://codesandbox.io/embed/awesome-gates-efrif?fontsize=14&hidenavigation=1&module=%2Fcomponents%2FLayout.js&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Nextjs persistent content"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>