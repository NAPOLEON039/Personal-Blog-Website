---
path: '/configure-and-interact-with-firestore-database-in-a-project'
title: 'How to configure and interact with a Firestore database in a project'
date: '2020-04-15'
---

![Cover image](https://dev-to-uploads.s3.amazonaws.com/i/3pjtgpewiu3ug05izhx0.png)

## Introduction
In the previous part of this series, we created a Firestore database. We already have our Vue app which we created in the first part of this series. Let's connect our database to the app so we can add our notes to the database.

## Get keys and secrets for Firebase configuration
To connect our database to our app, we need to initialize an instance of the Cloud Firestore database in our app. 

First, go to your project in the [Firebase console](https://console.firebase.google.com/) and click on the little gear icon to the right of `Project Overview`. Click on Project Settings.

![Project settings](https://dev-to-uploads.s3.amazonaws.com/i/roz053q8ypdeokpjx3pp.png)

There is an apps section at the bottom of the page that opened. Currently, there are no apps. Let's create one for the web platform:

![Creating an app on the web platform](https://dev-to-uploads.s3.amazonaws.com/i/zr1ub7rlymi7tqevm1ag.png)

Enter a name for your web app to which Firebase will be added.

![Register Firebase web app](https://dev-to-uploads.s3.amazonaws.com/i/mjzbmnomw83le6j7twwv.png)

After registering, there will be an API key and other stuff that will be needed to configure Firebase in our Vue app.

![Getting config keys when registering app](https://dev-to-uploads.s3.amazonaws.com/i/f0lrnf1bamx7ulhe5x54.png)

Click *Return to console*. Back on the project settings page, there is our app at the bottom. You can refer here anytime to get the API keys again.

![Project settings page with new web app](https://dev-to-uploads.s3.amazonaws.com/i/tlevjpy63jn52dlp0zxh.png)

## Creating a collection
In Firestore, data is stored in *collections*. Think of them as drawers in a file cabinet. We don't just jam stuff wherever we want in a file cabinet. There's a drawer for every category of information. There might be a drawer for financial statements, a drawer for biodata of employees, a drawer for statistic datasheets, etc. There's a drawer for keeping all things in their separate sections.

A collection in Firestore serves the same purpose. It's a "drawer" for the different types of information that belong in the *same* file cabinet (Firestore database). For our project, we only require one collection since we will only be storing our notes. But you can create multiple collections if you want. You can have collections for your study notes, for your notes on any courses you're taking, for work stuff, etc. 

Let's add a collection to our database.

Click on **Add collection** and create a collection called *notes*. 

![Adding a collection to the database](https://dev-to-uploads.s3.amazonaws.com/i/uhirtu1e0p1quv3vkkws.png)

You will be prompted to add one document to the collection before it can be created. You can enter any data you want in it. Here is an example:
![Adding a document to the collection](https://dev-to-uploads.s3.amazonaws.com/i/dq5myk50ncvytr696wsi.png)

Once the collection has been created, you can delete this document by clicking on the three dots on the right and selecting `Delete document`:
![Deleting document](https://dev-to-uploads.s3.amazonaws.com/i/ms81iq9fci8dp39h3vjv.png)

## Configure Firebase in the Vue app
We have everything we need to configure Firebase in our Vue app and initialize an instance of Cloud Firestore. 

Create files named `firebaseConfig.js` and `firebaseInit.js` at the root of the project. `firebaseConfig.js` will hold the API key, app id, etc while `firebaseInit.js` will have our instance of Cloud Firestore which we can then import anywhere in our app. Let's create them:

![firebaseConfig file](https://dev-to-uploads.s3.amazonaws.com/i/jvn5rkgkkckuy0iroit1.png)
![firebaseInit file](https://dev-to-uploads.s3.amazonaws.com/i/2w33z4elqqvcwsgnlx60.png)

You can name these files something else if you want. But naming them this way makes it easy to know what they contain and their purpose.

## Submit notes to the database
An instance of Cloud Firestore has been created which we will import and use in our App component. We created a Firestore instance, but we also need to add Firebase to our app.

Run `npm install firebase` to install Firebase. Although we are using the Firestore database and not Firebase's database, Firestore is still part of Firebase itself. Thus, we can access Firestore from the Firebase package itself. As can be seen from the `firebaseInit.js` file above, we get access to Firestore with `firebase/firestore`. 

Alternatively, you can also add Firebase to the project with a script tag in the HTML file. You can get the link from the apps section at the bottom of the `Project Settings` page in your Firestore database.

Our code in the App component already has a method to add new notes to an array. We can simply add a few lines to it to send our notes to the database as well. First, we import the Firestore instance from the `firestoreInit.js` file and then make some changes to our `submitNote()` method.

![Importing Cloud Firestore instance](https://dev-to-uploads.s3.amazonaws.com/i/4ep70flq16010ybpmahj.png)
![Changes made to submitNotes method](https://dev-to-uploads.s3.amazonaws.com/i/y6lf3pnyvfgmh959cms4.png)

Here, the `db.collection().add()` method adds values to a collection in a database. We've already initialized the Firestore instance using the secret and API key from our database, and the collection to which the data will be added has been specified as well. As for the values in the `add()` method, it accepts a regular object with key-value pairs, where the key will be a field in the database and the value will be the value of that field.

You can compare the object in the `add()` method with the first document we added when creating the *notes* collection:

![First document created when creating collection](https://dev-to-uploads.s3.amazonaws.com/i/koyp7et1jrejv7wv7j6a.png)

Similar to the fields in the document, the object we pass to the `add()` method also has the same fields. The values will be taken from the title and content input fields.

The changes we made to the `submitNote()` method will add notes to the database while also adding them into the notes array. 

The `submitNote()` method will check whether the title and content input fields were left empty when we clicked the `Add Note` button. It will first add the new note to the database, then add it to the *notes* array and finally clear the input fields by assigning a blank string.

## Wrapping up
We've linked our database to our Vue app and can now add notes to the database. We can enter a title, type out a note and after clicking on the button below the inputs, the note gets added to the database and also gets added to an array we created. By mapping over the array, we can display the notes in it. 

But, if we refresh the page, all our notes are gone. Although the notes in the database are still there, we haven't retrieved them. Let's do that in the next part.

In the upcoming part of this series, we will set up a way to retrieve the notes from our database and also display all our notes. This way, even if we refresh the page, as long as we have them in the database, we can see our notes on the page.