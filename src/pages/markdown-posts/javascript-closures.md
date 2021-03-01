---
path: '/javascript-closures'
title: 'How do closures make private variables possible in JavaScript?'
date: '2021-03-01'
description: ''
cover: ''
---

![]()

<br />

Being able to implement private variables and methods is very helpful for restricting access to code. By making a variable private it limits the amount of code that can mutate it. There are several ways to implement private variables and methods in JavaScript. One of such ways is by using closures.

## What is a closure?
Introduced in ES6, a closure is the combination of a function bundled with its surrounding state. This means that we can access the scope in which the function is defined, from inside that function. Let's look at a simple example:

![An example of a closure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kn1vxndikkpu2693yjrl.png)

Here we have an outer function `add` and an inner function `addFive`. Assigning `add` to a variable will return the inner function `addFive`.

![Executing closure example](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/frbd0oxzute8ypksnz6c.png)

Invoking the variable and passing a number will execute `addFive`. At first, it seems accessing `x` should not be possible since `x` belongs to the scope of the outer function which has already finished executing. But, because the function `addFive` forms a closure, it also has access to the environment or scope in which it was declared (also known as the lexical environment). 

If a function forms a closure, it can access variables and functions declared in the parent/outer function even after that parent/outer function finishes executing. This principle allows us to implement private variables.

## Implementing private variables
In JavaScript, private variables are not natively available. But knowing how closures work, we can emulate them.

![Implementing private variables](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kr2816q80zh2c9mrxsg1.png)

This example applies the concept we looked at in the previous section. An IIFE(Immediately Invoked Function Expression) is assigned to the constant `Door`. The IIFE executes immediately and returns an object with two methods. This returned object has a function and a variable in its lexical environment.

The IIFE finishes executing, so the variable and function are both inaccessible from the outside. Only the two methods inside the returned object can access them because they form closures.