---
path: '/retrieving-notes-from-firestore-database-and-sorting-notes'
title: 'Retrieving notes from the Firestore database and displaying sorted notes'
date: '2020-04-28'
---

## Introduction
We have our database linked to our Vue app. We can save our notes in the database, but we cannot fetch them. 

In this part of the series, we will retrieve our notes from the database and also display them on the screen. Let's start with fetching notes from the database.

## Retrieving notes from the database
We retrieve data from a Firestore database using `db.collection().get()`. With this, we will get access to all the data in the collection we specify. We can map over it and extract what we want. We can store it in the `notes` array and display the notes from this array.

But we need to render our notes when the page loads so we will use the `mounted` lifecycle hook:

![Retrieving notes from Firestore database in mounted lifecycle hook](https://dev-to-uploads.s3.amazonaws.com/i/0hjybgovdxvbagf2l13w.png)

Displaying the notes is a simple deal with the `v-for` directive. 

![Displaying notes from the notes array](https://dev-to-uploads.s3.amazonaws.com/i/8g1h6ezg95gtlmy5xpe7.png)

## Sorting the notes
Although the notes are displayed in the order we create them, that is only until we refresh the page. After refreshing the page, the `notes` array is reset to the original blank state and is filled with the notes again after retrieving them from the Firestore database. But, they are not in the order we added them. 

We can sort them with this computed property by title:

![Using a computed property to sort notes by title](https://dev-to-uploads.s3.amazonaws.com/i/0gbeuzqmkyvkigfrf4o3.png)

And we need to replace the `notes` array in the template with the computed property.

![Using the computed property to display notes](https://dev-to-uploads.s3.amazonaws.com/i/psaykd13c5ct6kt8vuqc.png)

> *You can sort the notes in any other order. It's not necessary to sort it by title.*

## Wrapping up
The main functionality of our app is ready. We are able to create new notes which are stored in a database. We retrieve our notes from the database when our app is mounted. Our notes are also sorted by their title. 

All that is left is to add a way to delete our notes, both from the array and the database. We will add this feature in our next and last part.

This is it for this part.