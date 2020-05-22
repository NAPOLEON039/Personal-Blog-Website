---
path: '/test-vue-app-with-cypress'
title: 'How to test Vue apps with the popular Cypress framework'
date: '2019-04-22'
---

![Cover image](https://thepracticaldev.s3.amazonaws.com/i/cytueiukmj0yyiomk0i3.png)

## Introduction
This article explains how you can use Cypress to test a Vuejs app. A simple todo app created with Vuejs is used as an example. 

This article does not go in-depth about testing with Cypress, the Cypress docs are a better source for that. Rather than simply explain about Cypress and how it works, a working (simple yet somewhat practical) app is used to show how Cypress can be used with Vuejs.

Cypress has a lot of features that can be amazing to use. But at the same time, it is also a double-edged sword. These same abundant features can sometimes make it confusing when looking for that perfect assertion to create a proper test, so I've explained some of my thought processes when I was looking for a proper condition to use in my tests.

The app will not be tested extensively. Only the basic functionality will be tested, enough to make sure the fundamental features work properly.

## Setting up the application
Since the focus of this article is writing tests, we will not spend much time on creating the app itself. This is a simple todo app, so I've only given it the basic features - adding a task, crossing off a task, and deleting a task. There are also some additional features like not being able to add an empty task and not being able to add duplicate tasks. If you want you can refactor it to be able to handle duplicate tasks as well.

![Todo app main code](https://thepracticaldev.s3.amazonaws.com/i/po3xshkbh2c1tiyvhamx.png)

This is the code for the todo app. It's very minimal and doesn't have much styling. But it works, and that's all we need to start writing our tests. So let's get to writing tests. We have to install Cypress first.

## Installing and setting up Cypress

To install Cypress with npm:

![Cypress install command](https://thepracticaldev.s3.amazonaws.com/i/v8s0ffhhxxwk98uzhkua.png)

Now that we have installed Cypress as a dev dependency, we can start writing tests. If you are using Cypress for the first time, then follow these steps in [the docs](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements). 

When starting up Cypress for the first time in a project, it will create a ton of tests for us to get us started. We don't really need those so it's okay to remove them. 

After installing Cypress, a new folder by the same name will be created and it will also have some folders inside with the tests that I mentioned. Though it's fine to delete all those tests and folders, keep a folder named `integration`. This is because Cypress will look inside this folder for tests. I tried creating a test file outside this folder and it did not show up in the Cypress UI. I'm not sure whether I missed something or if there is a way around it. If someone knows about this, let me know in the comments below 🙂

As for the naming of the test files, although the Cypress docs seem to name all their example files as `something_spec.js`(meaning they all end with `_spec.js`), it is not necessary to do so. You can name it what you want as long as it is a JavaScript file. Make sure to use meaningful names though instead of random ones. If you have a naming system, then that's excellent!

## Writing tests
The app is ready, Cypress is installed and set up. Now it's time to start writing our tests.

The first test we will write is checking whether a todo gets added. Looking at the app code, we can write our task in an input field, click a button and our task gets added to an unordered list. Thus we can create todos by writing in the input field and clicking a button.

I have previously used Jest for writing tests for my Vue apps and also wrote [an article](https://dev.to/napoleon039/a-guide-to-writing-awesome-unit-tests-for-the-first-time-2lb9) on it. While writing this test, I used the same mental process of writing a Jest test. In Jest, the Vue component is imported and then we mount it and so on. In Cypress, however, I couldn't find anything like that. Until I saw an example that used `visit()`. I immediately went to the console and started the app using `npm run serve`. This command is for Vue 3.x so if you use Vue 2.x that would be `npm run start`. Since I can visit the app on my browser using localhost, I used that address for `cy.visit()`. 

Cool! Cypress can visit the app page as if I was visiting it. So now what's left is selecting the input field, typing out a task, and clicking a button.

![First test](https://thepracticaldev.s3.amazonaws.com/i/72qr9dzzhb0mm5ox7f2u.png)

`it` is a term used by most testing libraries for writing test cases. You can read [my article](https://dev.to/napoleon039/a-guide-to-writing-awesome-unit-tests-for-the-first-time-2lb9) where I explain about it a bit more. 

Here, we visit the app via localhost, find the input field using `cy.get()` and start typing something inside. To type something, we simply chain `cy.type()` to `cy.get()`. Then we *get* the button in the same way and click it by chaining `cy.click()`. Now what's left is to check whether the todo is actually added to the list or not.

I first thought of getting the entire list, but then realized we're only checking whether the task we've created has been added. Since we are only checking for that one, I used `cy.get()` to find a list element that contains our task. 

Seems quite easy now doesn't it! This is your first test with Cypress!!

Let's not stop here and continue on. Our second test will be checking whether clicking the task crosses it out. 

![Second test](https://thepracticaldev.s3.amazonaws.com/i/rcx0m7n45fxa5nx04kg0.png)

We have already visited the app page and created a todo during our first test, so all we have to do this time is to click it and check whether it's crossed. To click it, we *get* it just like we did in the first test using `cy.get()`. Then we make sure to specify which task we're looking for by chaining `cy.contains()`. Next, we click it the same way we did with the button, by chaining `cy.click()`. 

Finally, to check whether it's crossed out, we get the specific task again and then assert that it has the class of `completed`. 

If you look at our app code again, we have written some CSS that gives the element with a class of `completed`, a text-decoration of strike-through. You can be more thorough with this test and instead check whether the task actually has that CSS applied to it. This would make sure that the test would work even in situations where, for some reason, the class of `completed` is added but the CSS isn't applied. You can search for the appropriate assertion in the Cypress docs. It will serve as a good exercise in navigating the docs.

Now for the final test, we will check whether a task can be deleted by clicking a button.

![Third test](https://thepracticaldev.s3.amazonaws.com/i/19nt1puw8lqykacwf4ky.png)

The test this time is quite small. We get the button using `cy.get()` and chain `click()` to it. Finally, we get the specific task and assert that it doesn't contain the task contents. And with this, we have now written all our tests and ensure that the basic features of the app work.

Here are all the tests we wrote in one place:

![All todo app tests](https://thepracticaldev.s3.amazonaws.com/i/wt60c5tp9edask515t1x.png)

## Conclusion
You might have noticed that we've only been interacting with HTML elements and haven't even touched any Vuejs in our tests, even though our entire app is written in Vue. That's because Cypress is made like that. Take Jest, for example, you would write tests differently for React apps as compared to Vue apps. In my opinion, I think Cypress, however, is made to be independent of any particular framework. It doesn't matter whether you use a component-based approach in your app, use a server, or make it serverless, Cypress is designed to test your app as it runs in your browser. It mimics the behavior a regular user would take if they were actually using your application. You don't have to import or mount any component.

With that said, we have finished writing all our tests. We created a minimal todo app and actually wrote tests for it using Cypress. Cypress provides some really cool tools and features for testing. You're missing out if you haven't tried it yet.