---
path: '/how-to-use-spread-and-rest-operator'
title: 'How to use the spread and rest operator'
date: '2019-03-03'
---

## What are they?
One of the advanced features introduced in ES6, the spread operator and rest parameter allows us to spread out and combine multiple elements respectively.
Both of them are denoted by 3 periods `...`. Even though they might look the same, they work differently. While the spread operator expands an array, object, string, or any other iterable, the rest parameter, however, does the exact opposite - it combines multiple elements together into an iterable. 

## How to use them?
Let's see the use of the spread operator via some examples -

![Example without using spread operator](https://thepracticaldev.s3.amazonaws.com/i/jyngeaa8dsrrs3zvlc5w.png)

Here we have an array of fruits. It will print to the screen in this way

![Result without using spread operator](https://thepracticaldev.s3.amazonaws.com/i/8dy46rrz4r1lxa6l0erc.png)

and using the spread operator 

![Using spread operator](https://thepracticaldev.s3.amazonaws.com/i/h8wrw2ovp54pdvfuyil7.png)

the array is printed this way.

![Result of using spread operator](https://thepracticaldev.s3.amazonaws.com/i/0k29svaroj4skwxcc3b5.png)

The spread operator expanded the contents of the array into individual elements. We can also create a copy of this array while adding new elements:

![Second example with spread operator](https://thepracticaldev.s3.amazonaws.com/i/4iatyub7y95f1fqdrdai.png)

The spread operator thus has many uses.

---
The rest operator is used to combine multiple elements and is particularly useful during array and object destructuring.

![Array destructuring with rest operator](https://thepracticaldev.s3.amazonaws.com/i/47s5kwb47fpvgv873uz9.png)

In the example above, the first two elements from the array `people` are *destructured* or broken down into 2 variables `doctor` and `lawyer` respectively. The rest of the elements are combined into the `students` variable in the form of an array with the help of the rest operator.

Here's another example with an object:

![Object destructuring with rest operator](https://thepracticaldev.s3.amazonaws.com/i/mrbn2g8nbbjjezygx9c9.png)

Here, we take an object then break it down and assign it to separate variables and then combine the remaining object properties in a single object. Let's print it out and see the result:

![Object destructuring result](https://thepracticaldev.s3.amazonaws.com/i/bjncsj09r1vuq4ep3m8r.png)

## Where to use them?
We've seen how the spread and rest operators are used. We can use the spread operator to efficiently split arrays, objects, and strings. Splitting up a string into characters has become easier. Working with objects has become hassle-free. Be it copying, cloning, or concatenating, the spread operator makes it easy to work with arrays and objects.

As for the rest operator, there is no longer any need to do all those complicated things like accessing the `arguments` object when dealing with variable function arguments. Simply using the rest operator solves everything for us:

![Variable function arguments handled with rest parameter](https://thepracticaldev.s3.amazonaws.com/i/m259uxn2z1z9i9rscy4m.png)

This works just fine since the rest operator combines all arguments passed to the function in an array. All we have to do is traverse through the array and we can access all the arguments.

---

## Closing words
Here is another good article [explaining rest and spread operators](https://dev.to/guin/a-guide-to-rest-and-spread-part-2-38fm) by [Angelika Jarosz](https://dev.to/guin). She explains the operators quite well and in detail.

The rest and spread operators, in my opinion, are one of the best features of ES6 along with [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). They offer a lot of benefits to using them in addition to making the code more readable. If you haven't used them yet, what are you waiting for?