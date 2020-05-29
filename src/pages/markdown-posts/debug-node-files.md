---
path: '/debug-node-files-in-the-command-line'
title: 'How to debug Node files in the command line'
date: '2020-01-20'
---

## Running Node files in debug mode

We usually debug our code using the browser's developer tools. When debugging Node files, we can do that from the command line as well. Using a few CLI (Command Line Interface) commands, we can start debugging our code. 

Let's say we have an `index.js` file. This file would be run using the `node` command.

```shell
node index.js
```

With this command, the file will be executed normally. To run the file in debug mode, use the keyword `inspect` with this command.

```bash
node inspect index.js
```

This will open your file in debug mode. From here on, you can step through your code one line at a time by pressing the *n* key on your keyboard. 

The debugger will start at the very first line of your code in the `index.js` file and execute it. By pressing *n*, you can move the debugger to the next line and execute that line. You can thus execute your code one line at a time by pressing *n*. 

If there was an error on the first line, it would show an error instead of moving to the second line. This is very useful. If for example, there is an error on the 17th line, it will show you the error before moving forward. When you run your code normally, the code is executed and then the error is displayed. With running the file in debug mode, you can know exactly which line caused that error.

## Adding a breakpoint

Sometimes, it happens that your source code is huge. If your Node file has 1000 lines of code, it will take hours to execute each line. Instead, you can add a **breakpoint**. A *breakpoint* is like a bookmark for the debugger. It means you are certain the error exists near that point. 

Let's say there are a few functions in your code. You are certain that authentication error is coming from your login function. You can add a breakpoint right before that function.

Simply add the keyword `debugger` before the function.

```javascript
// everything before the login function

debugger;

function authenticatedLogin() {
	//some logic
    console.log("Something went wrong inside here!");
}
```

Now open the file again in debug mode but this time, press **c** on your keyboard. 

The debugger starts executing your code one line at a time from the very first line. Pressing **n** moves the debugger to the next line. On the other hand, pressing **c** tells the debugger to go through the entire code in one go. This would usually make the debugger execute the file like it usually is executed outside of debug mode. *But*, our code has an addition this time. Yep, the `debugger` keyword. Pressing **c** would normally run the code till the end, but after adding `debugger`, it will stop right before the function starts. 

So after running your file in debug mode, pressing *c* will execute all the code before the *debugger* keyword and stop exactly before the function at the `debugger` keyword. After that, you can start stepping through the function one line at a time by pressing *n* until you pinpoint your error. 

## Wrapping up
In this way, you can debug your Node files in the command line itself, even large files.