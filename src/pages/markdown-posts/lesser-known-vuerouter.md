---
path: '/lesser-known-amazing-things-vuerouter-can-do'
title: 'The lesser known amazing things VueRouter can do'
date: '2018-10-08'
---

![Cover image](https://thepracticaldev.s3.amazonaws.com/i/7de1jb1xllvfriiks5si.JPG)

## Introduction
This article is not an introductory article on VueRouter. It is about some lesser-known things that VueRouter can do. This article assumes you know about VueRouter, have worked with it a few times or more and know your way around it. 

Now it is possible that you may never need to use the things mentioned here. But it is still useful to keep them in mind if you ever find yourself in a situation where you need them.

## Query parameters

If you know what query parameters are, feel free to skip the explanation below.

You have probably seen these before. They can't be seen in all websites, but you can easily see them when doing a Google search. When you perform a simple search, you'll notice the URL has some stuff after the website name - `https://duckduckgo.com/?q=hey&t=h&atb=v115-6`. This is a simple search I did on [DuckDuckGo](https://duckduckgo.com/) (search engine like Google) for the word *Hey*. If you look at that link closely, you can see the letter **q** and some additional things after it. There is also a question mark before that *q*. Everything after the question mark (?) is known as query. It is used to provide aditional information in the form of  `key-value` pairs. 

---

VueRouter allows us to pass a query parameter very easily. A `<router-link>` attribute of *query* is used for this:

```html
<router-link 
	:to="{ name: 'pathName', 
    	   params: { id: $route.params.id }, 
           query: { locale: 'en' } }"
>

</router-link>
```

Here our parameters are passed using the params attribute and the very next attribute is query. It also takes an object and the various queries are represented as `key-value` pairs. 

The URL in this case would look something like this: `https://something.com/user/456?locale=en`

## Redirecting all paths

You have all your paths ready in a separate `routes.js` file, have included them in the VueRouter instance properly and checked them using the local dev server. It all looks okay. There is no way you missed a path and the path names are on point.

You ask a friend to try it out and give feedback. You are all smiles, nothing can go wrong. But then suddenly, your friend shows you the screen. There's a blank page on it! But you covered all the paths of your website. So what went wrong?!

You surely covered all the paths your website *would need*. But that doesn't stop your friend or any other user from entering whatever they want in the URL. And since VueRouter will obviously not recognize the path, it shows a blank page. This may also happen if the user has entered the wrong path by accident if it is their first time visiting your site.

I know I had a hard time figuring out why GMail wasn't on `https://google.gmail.com` but instead on `https://mail.google.com`. So weird right 😜. 

Instead of showing the user a blank page, it might be better to redirect them to a page of your choice. Add the following path to your `routes.js` file:

```javascript
{
	path: '*',
    redirect: '/'
}
```

What this does is, all routes that you have not handled in the file will redirect to the home page. So the next time someone enters an incorrect route, they will be redirected back to the home page.

## Adding hash fragment

Ever visited a Wikipedia page? I bet you have. There are many pages (almost all of them) that have an index of contents. When you click on them the page scrolls down and you have magically jumped to that content.

Your website may have a page where the main content is further down and you need to scroll down to it immediately after visiting that page. This behavior can be achieved using an anchor tag `<a>` and putting the id of the content in the *href* attribute. However, this only works for the same page and not when you have to visit another page and immediately jump to the content. For this you can use a `<router-link>` attribute called *hash*. It requires the id of the content like anchor tags. 

```html
<router-link :to="{ name: pathName, hash: '#text' }">
	Jump to content
</router-link>
```

However this only appends the id of text to the URL. Something similar to this - `https://something.com/user#text`. It will not scroll down to the content. This is because we have only told our VueRouter to add a *hash* to it's URL. We have yet to tell it how scrolling on a page is to be done. The hash fragment has to be combined with the scroll behavior shown below.

## Scroll behavior

We will now set the scrolling behavior for our routes. With this we can have that automatic scrolling to our content using the hash we appended to the URL, and even have VueRouter remember the last position before scrolling. This is just like in Wikipedia where you can click on a content title in the index, click the back button and instead of going back to the previous page the page scrolls up to the index position.

Add the following function to the VueRouter instance: 

```javascript
import { routes } from './routes.js'
const router = new VueRouter({
	routes,
    scrollBehavior(to, from, savedPosition) {
    	if (savedPosition) {
        	return savedPosition;
        }
        if (to.hash) {
        	return { selector: to.hash };
        }
        return { x: 0, y: 0 };
    }
});
```

Here, **routes** are all our routes kept in a separate file. The `scrollBehavior()` function is what manages the scrolling of our routes. It has 3 parameters:

1. *to* - This represents the new route we will be visiting
2. *from* - This is the previous route we came from. So if we click on a `<router-link>` on Home page to visit the About page, then *to* would be our About page and *from* is the Home page.
3. *savedPosition* - This is the important parameter. It represents the previous position before scrolling. It will become clear after I explain what the above function does.

When we simply scroll down on a page, pressing the back button will return us to the top of the page. This is because our 'previous position' before scrolling, was the top of the page. This is what the first conditional check in `scrollBehavior()` function does. It checks for this saved position stored in the `savedPosition` parameter. 

The second conditional check is for hash fragments. You might remember we appended a hash to our URL in the previous section. However, this hash isn't applied to the current page. It will be applied when we click on the link. 

When the next page is visited, it will have a hash in it's route. The second conditional check will notice this hash. It returns an object. The **selector** value indicates the id of the content we want to jump to. 

> Thus, when we click on that link, there is a hash fragment added to the URL and the page scrolls down automatically to our content. 

The last line of the function returns an object with x and y coordinates for the top of the page. This is necessary for when we have just visited a page and there are no hash fragments. When there is nothing to scroll to and we also haven't manually scrolled down, we need the top of the page to be displayed.

---

This is it for this article. I hope you learned something new about VueRouter. And if you want to refer to a reliable source for VueRouter, the best place is the [official docs](https://router.vuejs.org/) since they are very well written.