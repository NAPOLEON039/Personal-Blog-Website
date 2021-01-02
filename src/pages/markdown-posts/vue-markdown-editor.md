---
path: '/vue-markdown-editor'
title: 'Why does markdown need to be sanitized? And how to do it in Vue?'
date: '2021-01-02'
description: 'Quick markdown parser + Performant frontend library + Reliable sanitizer = A fast, safe, and lean Markdown editor. Here’s how to make one with Marked, Vue and DOMPurify.'
cover: 'https://dev-to-uploads.s3.amazonaws.com/i/upkaeg5ils2wyb1ilc2l.png'
---

![Cover image](https://dev-to-uploads.s3.amazonaws.com/i/mhd3k91eddlabzt2zwmn.png)

<br/>

Marked makes it easy to work with markdown especially when used with Vue. With fast performance and easy-to-read code, Vue.js is a smart choice for creating a markdown editor.

With so many libraries available, creating a markdown editor is not that difficult. But do you use a proper sanitizer with your markdown? 

Here’s how to use Marked and a sanitizer like DOMPurify to make a markdown editor with Vue.

## Why is DOMPurify used here?
Usually, a markdown editor will have an input box for you to enter some markdown into. This markdown input is parsed into HTML and then displayed. Rendering this parsed HTML can potentially leave the door open to cross-site scripting attacks.

Cross-site scripting (also called XSS) is a software vulnerability typically found in web applications. It is an attack that involves malicious scripts getting injected into a trusted website and unknowingly executed.

According to [Wikipedia](https://en.wikipedia.org/wiki/Cross-site_scripting):

> Cross-site scripting carried out on websites accounted for roughly 84% of all security vulnerabilities documented by [Symantec](https://en.wikipedia.org/wiki/NortonLifeLock) up until 2007.

To avoid such malicious scripts being entered in the input area and affecting our markdown editor application, we need to sanitize the parsed HTML to make sure it's safe to be rendered. And this is where DOMPurify comes in.

DOMPurify is an XSS sanitizer library for HTML, MathML, and SVG. It is written in JavaScript and works in all modern browsers (Safari (10+), Opera (15+), Internet Explorer (10+), Edge, Firefox, and Chrome - as well as almost anything else using Blink or WebKit). It also doesn't break on IE6 or other legacy browsers. 

After giving DOMPurify the parsed HTML, it will return a string with clean HTML. Among the sanitizers mentioned in the Marked documentation, DOMPurify is the recommended choice.
## Making the editor
The goal is to make a simple working markdown editor. I've put everything in the `App.vue` file and have not created any separate components. So let's get started.

Our markdown editor will need an input:

![Adding a text input for markdown](https://dev-to-uploads.s3.amazonaws.com/i/aj50q1zvaf88ghutqujh.png)

Next is a div where the markdown will be displayed:

![Added a div for rendering parsed result](https://dev-to-uploads.s3.amazonaws.com/i/7jr1j6c9bqsbfh1xvrhn.png)

You can style the textarea and make it bigger instead of manually increasing its dimensions every time to make it easier to view what is being typed. I will do it at the end after Marked and DOMPurify are used.

Let's pass the input to Marked before getting it sanitized with DOMPurify.
## Parsing markdown input
The value from the input needs to be passed to Marked. But first we need the value from the textarea:

![Data binding input area](https://dev-to-uploads.s3.amazonaws.com/i/oio0ewpopdt5fxtlnv92.png)

This will make sure whatever we type in the textarea shows up in the `input` data property. 


Now, all we have to do is return the parsed markdown from a computed property to display it:

![Parsing markdown with Marked](https://dev-to-uploads.s3.amazonaws.com/i/oyfhrkkv7err8a90qyk7.png)

Here, using a computed property, we return the parsed markdown (which is basically a string of HTML) and render it in the div using the `v-html` directive.

## Sanitizing with DOMPurify
As powerful as DOMPurify is, we don't need anything complicated. To sanitize the parsed HTML, import the library and use the `sanitize()` method:

![Sanitize HTML result](https://dev-to-uploads.s3.amazonaws.com/i/20kfbldr8x98afftnk9t.png)

Since we are using a computed property, every time the `input` data property updates, `markdownResult()` also executes again. We pass the markdown input to Marked which parses it into a string of HTML. This string then passes through DOMPurify to ensure the HTML is clean.

Our markdown editor has an input area. Markdown entered here is parsed and rendered to a div below it. We have finished creating a simple markdown editor. Let's style it.

## Styling the editor
I also added a button to clear all the content in the editor:

![Added a button to clear input content](https://dev-to-uploads.s3.amazonaws.com/i/yfcckkzq7w78tnikb8v9.png)

I will not make this too fancy. Putting the editor and the div each on one end of the page will be just fine. 

![CSS styling for the editor](https://dev-to-uploads.s3.amazonaws.com/i/s5gsmeg6hu7far8ixs5p.png)

If you didn't know - `resize: none` makes it so that the textarea cannot be resized.

## Wrapping up
We made a minimal, clean markdown editor. We also made sure every bit of markdown rendered is free of malicious scripts with the help of DOMPurify. Although using DOMPurify doesn't mean your web application is completely safe from cross-site scripting attacks, it's a start.

Links for further reading:

1. [An article](https://owasp.org/www-community/attacks/xss/) on cross-site scripting attacks
2. The dangers of injecting HTML through JavaScript and [how to do it safely](https://labs.tadigital.com/index.php/2020/04/10/safe-ways-to-inject-html-through-javascript/)
3. [Wikipedia page](https://en.wikipedia.org/wiki/Cross-site_scripting) on cross-site scripting
4. DOMPurify [GitHub repository](https://github.com/cure53/DOMPurify)
5. [Official documentation](https://marked.js.org) for Marked
6. Marked [GitHub repository](https://github.com/markedjs/marked)