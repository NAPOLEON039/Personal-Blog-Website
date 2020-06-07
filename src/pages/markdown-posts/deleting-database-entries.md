---
path: '/deleting-database-entries-from-firestore'
title: 'Deleting database entries from Firestore'
date: '2020-05-15'
---

## Introduction
This will be the final article in the series. We have created our app, created a database, configured that database to run in the app, sent our notes to the database, and also fetched notes from the database. 

We can create new notes which are stored in a database so we don't lose our notes when we refresh the page. But we don't have a way to delete any notes. Let's make that happen.

## Adding a button to delete notes
We will add a button beside each note. Clicking that button will run a method that will remove the note from our `notes` array and will then delete that note from the database.

We have to remove it from the `notes` array as well as the database since even though it's removed from the database, it will still show on our screen until we refresh the page. Only after we refresh the page, will the array be populated with the notes in the database and reflect our changes.

So removing it from the array will make sure we see the changes immediately.

Let's add the button with the click listener before the title of the note:

![Adding a delete button beside the note title](https://dev-to-uploads.s3.amazonaws.com/i/irzxbl2t6d6wpd5i9uxx.png)

## Delete notes method
With the button added, all that's left is the method. Removing the note from the array should be easy:

![Deleting note from the array](https://dev-to-uploads.s3.amazonaws.com/i/emx6ixigyjz8vd2oyfni.png)

Removing the note from the database takes a bit more code, but nothing too complex:

![Deleting note from the database](https://dev-to-uploads.s3.amazonaws.com/i/6gzn5m76mkqyvgpkqdcb.png)

Let's go over this to understand it better.

### Deleting content from the database
First, we have a string `docToDeleteId`. As the name of the variable suggests, it will hold the id of the *document* that will be removed from the database (all entries in the Firestore database are called documents). To delete a *document* or database entry, we will need its id. 

Now how will we get this id?

We have the title of the note passed to the `deleteNote` method from the click listener. Using that, we fetch the specific note from the database:

![Fetching specific note from the database](https://dev-to-uploads.s3.amazonaws.com/i/c9tgsw5hrcol1du5iut6.png)

The first parameter in the `db.collection().where()` method is the *title* field in the document (remember each document or note in the database has 2 fields - title and content). The second parameter is self-explanatory - it means the first parameter should be equal to the third. The third parameter is our `title` argument. 

We got the note which has the same title as the note we want to delete. From this, we will get the id given to that note in the database:

![Storing the id of the note to be deleted](https://dev-to-uploads.s3.amazonaws.com/i/9306b57e0edvc41p8j3l.png)

We store this id in the variable we created at the start.

Now we delete this note from the database by specifying the id of the database entry we want to delete:

![Deleting note from the database based on its specific id](https://dev-to-uploads.s3.amazonaws.com/i/4z064lr2wku0qtnav291.png)

That was a bit more complex than the code to simply add and fetch content to and from the database. But other than getting the id of the document entry, the rest was hopefully not that difficult to understand. 

## Wrapping up the series
This wraps up the Vue Note Taker series here. We created a note-taking Vue app with simple features - it allows us to create notes, saves them to a database, and delete the notes.

It doesn't end here though. There are a lot of features that can be added to this app. For example - an edit feature to edit existing notes, making sure two notes do not have the same title to avoid deleting both notes when intending to delete only one of them, sharing your notes with others, etc.

You can add these features and any others you can think of. Though the edit feature will take a bit of tinkering and diving into the [docs](https://firebase.google.com/docs/firestore). Or maybe, you can do things differently than I have and change the whole app. Have fun with it and try out new stuff.

I hope you got to learn something new from this tutorial series.