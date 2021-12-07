# Rihal Challenge

![banner](https://github.com/omar-alhendi/Rihal-Challenge/blob/b5538ea5751fec27bd8bcc7bf9adf0f5ddf4e266/Rihal%20Challenge.png?raw=true)



### Full Stack Web Developer Challenge
This is my answer to [Riahl](https://github.com/rihal-om/rihal-challenges/tree/main/devops) full stack web developer challenge .


## Technologies
- [Node.js] - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [express] - Fast, unopinionated, minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com) - The database for modern applications
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js
- [ejs](https://ejs.co/) - Embedded JavaScript templating
- [Bootsrap](https://getbootstrap.com/) - 3rd part UI library
- [CSS]() -  Styles HTML documents


## Features

- Users can create, edit and remove Classes, Countries & Students
- Users can view Classes, Countries & Students.
- Each Student can be linked to a country and a subject
- Users can automatically change the student's country or class
- User an remove Student from a country and asscosiate with other country, the same thing could happens for Class.
- Dark / light mode toggle
- Users can generate Random Seeds Data
- I challenged myself to implement this project using NoSql Database and I have successfuly done it!.
- Basic error handling and few middlewares

## Business Rules

- Every Country have zero to many students.
- Every Class  have zero to many students.
- Each Student have zero or only one Country.
- Each Student have zero or only one Class.
- If we delete a Country the all the related students Country will have no Country.
- If we delete a Class the all the related Students will have no Class.
- If we delete a Country all the  related Students will not be Deleted
- If we delete a Class all the related Students will not be Deleted

## Installation

Before starting the project make sure you have already installed:
- [Node.js](https://nodejs.org/) v10+ 
- [MongoDB] - [Windows](https://www.youtube.com/watch?v=MCpbfYvvoPY) - [Macos](https://www.youtube.com/watch?v=4crXgQZG4W8)

##### Run mongod in another terminal and node index.js in the terminal with the project. 
##### Install the dependencies to start the server.

```sh
cd Rihal-Challenge
npm i
node index.js
```
<br />
#### To genereate Rnadom Seeds Data:
```sh
node seeds/app.js
```
## IMPORTANT!! 
### EJS-MATE NOTES
##### In my project I am using EJS-Mate to orgnize the code 
##### One need to change the fiel path in some files
<br />
### First File: 
#### views/home - line: 102
```sh
   <% include YourFilePath/RihalChallenge/partials/top %>
```
### Second File:
#### views/about - line: 18 - 33
```sh
<% include /YourFilePath/RihalChallenge/about_partials/navbar %> 
<% include /YourFilePath/RihalChallenge/about_partials/left %>
<% include /YourFilePath/RihalChallenge/about_partials/intro %>
<% include /YourFilePath/RihalChallenge/about_partials/projects %> 
<% include /YourFilePath/RihalChallenge/about_partials/educatio %>
```
### Third File:
#### views/layouts/boilerplate: line: 15
```sh
<% include /YourFilePath/RihalChallenge/partials/aside %>
```
### Third File:
#### views/layouts/public: line: 15 - 17
```sh
<% include /YourFilePath/RihalChallenge/partials/aside %>
<% include /YourFilePath/RihalChallenge/partials/top %>
```


## Finally
### Open http://localhost:3000 with your browser to see the result.
