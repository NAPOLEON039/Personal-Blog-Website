---
path: '/monkey-patching'
title: 'Monkey patching: What is it and should you be using it?'
date: '2019-01-01'
---

## 🐵What is monkey patching?
A monkey patch is a way to change, extend, or modify a library, plugin, or supporting system software locally. This means applying a monkey patch to a 3rd party library will not change the library itself but only the local copy of the library you have on your machine. The term *monkey patching* refers to changing code at runtime. This may be done as a workaround to a bug or a feature. No software can be totally free from bugs. Sometimes with a major update, little bugs that are not that devastating creep into the software but make our work more difficult. 

Though, this does not mean *monkey patches* are only used in case of bugs in the library or code we are using. It can also be a means to change some behavior that does not do what we desire. Like a console log that has been left in production or that one function that should be returning integers instead of floating-point numbers. It is possible to make changes to the code using *monkey patching*.

However, this only applies a *patch* to the original code. It does not affect the actual code, but only **your copy** of it. This means if you installed a math library using npm, a monkey patch will only affect the library for you, it won't change the library npm has.

## 😈Why is it considered evil?
*Monkey patching* is not a unique technique. It is not "evil" per se. Any technique irresponsibly used can be considered evil. There are other ways to solve problems that can be solved by monkey patching. There are very rare cases where monkey patching may be the only solution. That is why, there are so few situations where monkey patching is required, that it is considered evil by developers. 

Patches made to a module might not work after the module is updated and some methods are changed. This might create a major bug or cause the website/app to crash depending on the patch applied and the changes made to the module. So if the patches are not applied conditionally, it can lead to unfavorable outcomes.

If two or more components/modules apply a monkey patch to the same method, depending on which component/module runs last, the other monkey patch will be meaningless.

Monkey patches can be very confusing to someone who is not aware of them. Differences between the installed module and the actual behavior of the source code can lead to frustrated developers.

## 🤔Should you use it?
It all depends on your preference. If the situation calls for it, then you should use it while making sure to avoid common pitfalls. Though you will probably go through your entire career without facing a situation where you would need to use it, if you find yourself in one, now you know there's a solution for that pesky problem.