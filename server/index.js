const express = require('express');
const morgan = require('morgan');

const { getUsers, getUserById } = require("./userHandlers");
const { getPosts, getPostById, getPostsByUserId } = require("./postHandlers");
const { getTriviaQuestions } = require("./apiHandlers")

const PORT = 8000;




express()
.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
    .use(morgan("tiny"))
    .use(express.static("public"))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))


.get('/', (req, res) => {
  res.status(200).json({status: 200, message: "Howdy!"})
})

//User endpoints
.get('/api/users', getUsers)
.get('/api/user/:userId', getUserById)
// .patch('/api/user/:userId')

// //Post endpoints
.get('/api/posts', getPosts)//gets all posts
.get('/api/post/:postId', getPostById) //?Do i need?
.get('/api/posts/user/:userId', getPostsByUserId) //gets all posts from specific user
// .delete('/api/post/:postId') //deletes a specific post from feed

// //Trivia endpoint
.get('/triviaQuestions', getTriviaQuestions) //gets 20 random question from (https://the-trivia-api.com/)

// //Auth0 endpoint


.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});