---
path: '/creating-a-simple-notes-app-with-vue-and-firestore'
title: 'Creating a simple Notes web app with Vue and Firestore'
date: '2020-03-25'
---

## Introduction to the short series
This is a multi-part tutorial on using Vuejs to create a Note-taking app. It uses Firestore as the database to store all the notes. This tutorial is divided into the following parts:

1. Starting a Vue project and setting it up (this article)
2. Creating a Firestore database
3. Connecting the Firestore database to the Vue app and sending notes to the database
4. Fetching notes from the database and displaying sorted notes
5. Adding a delete note functionality to the app

## Setting up the project
Start a new Vue project and replace the code in `App.vue`'s template with the following:

![App.vue component](https://dev-to-uploads.s3.amazonaws.com/i/stbn0s1owi1mpdbx8ee5.png)

If you haven't used Vue v3.x to create projects before, refer to [my previous article](https://dev.to/napoleon039/how-to-create-new-projects-with-the-vue-cli-3pgo). 

Here in this `App.vue` component, we have an input for the title of the note and a textarea for the content/main body of the note. There is a button that will add our note to a database.

Below this, is an unordered list that will display all our notes. There will also be a button beside each note which allows us to delete that particular note.

---

Let's create the data which will allow us to have a two-way binding with the note title and content.

![Adding data for two-way binding](https://dev-to-uploads.s3.amazonaws.com/i/qpl3xjjltdzvb5nhp17x.png)

We can access the contents of the input and textarea and get the title and content of a note. The `notes` array will hold all our notes. Now, we need a method that will add our notes to this array.

![A method to add all new notes to an array](https://dev-to-uploads.s3.amazonaws.com/i/x9en62a923jfebcj8d6z.png)

This method will check if the `title` and `content` are empty otherwise push them in our `notes` array. Setting the `title` and `content` to an empty string will clear the input and textarea. 

## Wrapping up
We have our new project set up, ready to have new notes added to it. We can enter a note title in the input and enter the contents of the note in the textarea. Clicking the button will add our note to an array.

We can display our notes in the unordered list with a `v-for`, but...after refreshing the page, all our notes will be gone! To make them persistent, we need a database to store all our notes. We will create a new Firestore database in the next part.