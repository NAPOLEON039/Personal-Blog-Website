---
path: '/writing-unit-tests-first-time'
title: 'A Guide to Writing Awesome Unit Tests for the first time'
---

![Cover image](https://thepracticaldev.s3.amazonaws.com/i/5dnrz0t629hheejdqj65.PNG)

## Introduction:
This is a tutorial meant to get you started with testing, in particular, unit testing. In this tutorial, we will learn how to set up unit tests for a Vue.js app. There are many testing frameworks available many of which I'm sure you must have heard about. We will be using the Jest framework for testing. We will be using vue-test-utils which will make it easier for setting up tests. Some other utilities will also be used but it's okay to not worry about them too much at this stage.


## What will you learn:
By the end of this tutorial, you will walk away with practical knowledge about setting up unit tests for a Vue application. Although the tests we will set up are basic, I'll also tell you how to look up the docs and set up more complex tests. You will be able to make use of these skills learned in this tutorial immediately.  Let's get started.


## Prerequisites:
It is expected that you have some knowledge of the Vue.js framework since you are setting up tests for a Vue application. Other than the tests themselves, we will be making some changes to the package.json and .babelrc files. You need not know everything about these files and the contents we are going to write in them. Just knowing what it does is enough.


## Creating a Vue project:
First we will create a simple Vue project using the webpack template. Although Vue version 3.0 introduces another way to create projects instead of using templates, since I make use of templates regularly, I'll do so in this tutorial as well. There isn't that much difference in the projects created either way.

![Options selected during project creation](https://thepracticaldev.s3.amazonaws.com/i/f5awilwecnwmml6622xv.PNG)

Feel free to choose these values accordingly - the project name, description, author. I prefer using the standalone(runtime + compiler) build for my projects, you can choose either. This is an example project, being made to teach you about testing, so there is no need for router. You can select a linter if you want but don't setup the unit tests and end-to-end test options.

You can refer to the image above if it's not clear on which options to select, feel free to make some necessary changes as you see fit. However, don't set up tests since we will be setting up our own. You are expected to perform the next steps of project installation on your own since this is not a Vue tutorial.

Now this is a simple template which we will be testing. Go ahead and make changes to the text if you want, but keep the general outline the same (two buttons - one changes data property and the other calls a function).

App.vue:

![App.vue component](https://thepracticaldev.s3.amazonaws.com/i/svpvlv4aknrh9ee8bgpz.PNG)

Test.vue:

![Test.vue component](https://thepracticaldev.s3.amazonaws.com/i/jiz8uppcciitpxrb3dm6.PNG)


### Installing test dependencies:
Now that we have our project up and running, it's time to install all the utilities and packages we require to set up unit tests.

![Installing packages using npm on command line](https://thepracticaldev.s3.amazonaws.com/i/3qtvz1ffnm2dwwypctwm.PNG)

A simple explanation for these new packages we're installing:

1. vue-jest: We will be setting up our tests in a JavaScript file. This package will parse/compile our Vue file into simple JavaScript, making it easy to work with.
2. babel-jest: This package helps us with handling some cutting-edge syntax. In case we are using syntax and features that are not supported widely and need to be compiled, this package make it so Jest and Babel can work with each other.
3. jest: This is the package for the actual Jest setup
4. @vue/test-utils: This package is required for creating an instance of our component.

**Don't forget to use the --save-dev flag. It is critical. This is because all these packages should be in development mode only and not in production mode since the user has no need for them. We can make the project lighter if we exclude these packages from production.**

Now to make the changes to the configuration (config) files that I mentioned earlier. These changes will be made to the package.json and .babelrc files that Vue.js creates automatically for us when we create the project. package.json contains all the dependencies for our project and .babelrc is the configuration file required for Babel. Babel is the awesome thing that translates  our new JavaScript code so that older browsers can understand it.

package.json:

![image of all changes made to package.json file](https://thepracticaldev.s3.amazonaws.com/i/w34amfrfsqrmwjf0sc0x.PNG)

.babelrc file:

![image of changes made to .babelrc file](https://thepracticaldev.s3.amazonaws.com/i/uwp6dr5osdy4mtmgi9lm.PNG)

All changes are explained in comments in the files. I won't be going into too much detail about the changes since our goal is to get started to writing tests quickly.


## Writing tests:
The project has been created, all dependencies have been successfully installed and all setup is done. Now we are ready to begin writing some awesome tests!!

In our Vue.js application, there is a data property that is toggled by clicking a button and then another button calls a function printing a simple message to the console. We are going to click the buttons through our tests (how awesome is that!), check if the data property is toggled and then check whether the function was called.

In Jest the way tests work is we can run some code and then tell Jest that we 'expect' some output/result and ask it to compare our expectation with the actual result. We might expect that a value was changed or a function was called or even expect the result of a function. We can ask Jest to check anything (within some limits of course ;)). Let's write our first test:

Create a new folder called tests in your root directory. If you're new to the term root directory (I know it confused me at the start), your folders should look like this:

![image of folder structure after creating tests folder](https://thepracticaldev.s3.amazonaws.com/i/0r9lx6e2d9no9j03fr4o.PNG)

This directory will contain, you guessed it, all your tests. It's important that your test file have the same name as the file your going to test. It needs to have the **.test** extension in between. So for example if you're writing tests for **index.js**, your file name will be **index.test.js**. If you're testing **HelloWorld.vue**, the name of the test file will be **HelloWorld.test.js**. Our file is going to be a regular JavaScript file hence the **.js** extension. Since we're going to be writing tests for our **Test.vue** component, we will name the file appropriately (**Test.test.js**). Like I mentioned above, Jest tests our code by comparing the actual result with our expectation. But, it only allows us to write one test.

No need to worry, we can just write more tests. Tests are contained within something called a **test suite**.

> You can imagine a test suite as a box of donuts. It can hold lots of donuts, as many as we need (don't eat them yet, we need to work first!). But the catch is, each donut can only have a single flavor. It can be either chocolate or strawberry, but you can't have both. So, a simple solution - you can just stuff in two donuts in the box: one chocolate and the other strawberry. Then you can have any flavor you want :).

Similarly with our tests, even though we can only tell Jest to expect a single thing per test, we can write multiple tests in a single test suite. Let's go step by step; we'll first click the first button and check if the data property is updated.

Test.test.js:

![image of all imported packages and first test case](https://thepracticaldev.s3.amazonaws.com/i/zomkwmt59wah5erdq40k.PNG)

Most of the explanations are written in the comments. So I'll go through some of the ones difficult to understand:

The keyword **describe** is the test suite (donut box) I mentioned earlier. It will contain test cases. It's up to us how we structure our test suites and test cases. For this example, we will have only a single test suite since there's only one component to test. We will write two test cases for testing both buttons we have. **it** is another keyword used to write a unit test. It takes two parameters. The first is a string which is the name of the test case. The name should usually be informative, like if the test is for checking if a link works, it would be unintuitive to name it something generic like test 1. Now the second parameter is a function that contains the logic of our test. 

On the earlier line, we mounted our component. We can now use the instance of our component freely. The first line of our test sets the data property of our instance (remember this: the instance of our component is exactly the same as our original component, but only in structure. We have to supplement all the data and functions). Now that we have set the data property, the next line finds the button associated with this data property using it's ID. It searches for this button in the template of our component and then simulates a click. Now the data property should be toggled. To check this, we can tell Jest that we *expect* the data property to be changed. 

The last line of our test case achieves this. We **expect** the data property *content* to be some value. This is achieved using a method that Jest provides - *toBe(value we expect)*. Jest will run the test and check the result it gets with our expected result. Don't be confused with what we wrote inside expect - *wrapper* is the component instance, *vm* is like how we use the **this** keyword, and *content* is our data property.

Now let's run the test:

The test command is highlighted in the image

![image of test command and test result](https://thepracticaldev.s3.amazonaws.com/i/031eni44iid1eizxb5tj.PNG)

The test result gives us so much information. It will be helpful when we write more than one test.

Great job! You just wrote your first test. As a celebration, go ahead and have a donut :)

Now we'll write our next and final test to check whether the second button successfully calls a method or not.

![image of second test](https://thepracticaldev.s3.amazonaws.com/i/a0kaiiquei64sg77gc2k.PNG)

Here are both test cases:

![image of both test cases together](https://thepracticaldev.s3.amazonaws.com/i/8hemmm4gkze9tsew6wdg.PNG)

Most of the commands should be familiar to you from the first test. I will explain the new ones. In this test case, we are going to check if a function is called after button click. We have to do something similar to the first test case, where we set a data property. Here, we have to set a method. At this point, we don't really care what happens inside our method, all we care is that it gets called. Though we can create an empty method, it's better to mock a method (create a fake one). We then take this fake method and assign it to the name of our actual method. What this does is, when calling the method, Jest notices the **setMethods()** function and calls our mock function. After that, we do what we did before - find the button, simulate a click and then Jest what we expect. In this case, we expect the function to be called, so we use a different Jest built-in method than before.

Result of both tests:

![image of result of both test cases](https://thepracticaldev.s3.amazonaws.com/i/5ch4nvjue6ieewszqdjx.PNG)

## What to do when a test fails?
I'll take a moment to explain what happens when a test fails. Now make some changes in the test. Like the line where we expect the data property to be `false`, change it to `true`. Don't worry it's not going to make too much of a difference. Now run the tests again with the same command. You should get something like this:

Change made in the test:

![image of change done in the first test case](https://thepracticaldev.s3.amazonaws.com/i/wtq096g5gvgrixerwpqw.PNG)

Failed test result:

![image of test failing](https://thepracticaldev.s3.amazonaws.com/i/x21u7ifbllhfcuxlpg1k.PNG)

You might have noticed when all tests pass there's a message telling you simply that. But when a single test fails, there's all these lines of code, red lines everywhere. It seems to point fingers at you telling you that you've done something wrong. But there's no need to be afraid. These red warnings are an important part of testing. Among the first few lines, you might see a cross besides the name of our first test. That indicates which test has a problem. After another few lines, it states what it expected and what was received. That is very helpful for us. At a glance we can notice what the difference is. The result is `false` and we have told Jest to expect a result of `true`. And that's not all, the very next thing is the line pointed out so we don't even have to hunt down the problem. That's it; all those scary red lines shouldn't worry you. Instead they help a lot in finding out where and what the problem is.

Now these were only some basic tests. How do you go about writing some complex tests? What do you write? Where do you start? When to write what?

A simple answer would be to refer to Google or StackOverflow for answers or scour the web for articles. But that will not help you improve. If you want your box of donuts to have the best ones, you need to work hard. First break down what is it you need to test. Do you need to check the value of a data property? Do you want to trigger a button or a radio button or select a checkbox? Do you want to make sure a function is called? Or check how many times it is called? It all depends on what you want to test. Go to the [Jest docs](https://jestjs.io/docs/en/getting-started), spend some time looking around the various methods. Their names are kind of self-explanatory. Do a lot of trial and error. That's how you'll be able to write some awesome tests. 

## Wrapping up
Before writing this article I went through some trial and error myself. I originally followed the instructions from this tutorial on [Medium](https://medium.com/@kevin_peters/unit-testing-vue-js-components-with-jest-86e14ef499da). But when I visited the docs for Jest and the GitHub page of vue-test-utils, I found that there were some conflicting things (probably because some changes had been made in both packages from the time the author wrote the article); and also, the author did a lot of testing on the HTML part (template) of the component while I wanted to test the script logic. So I had to do some experimenting. I've written this article for explaining what I found and how I wrote my first test. So keep experimenting. If you get stuck there's always good resources out there to help you. By the way, the Medium article I linked is also great for testing your templates, check it out. And while you're at it, here's a slightly advanced and in-depth [article](https://medium.com/pixelmatters/unit-testing-with-vue-approach-tips-and-tricks-part-1-b7d3209384dc) on testing Vuejs components.

And that's it! You just wrote some cool tests for your Vue.js application.