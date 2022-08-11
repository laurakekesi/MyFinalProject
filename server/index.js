const express = require('express');
const morgan = require('morgan');
require("dotenv").config();

const { getUsers, 
  getUserById,
  getUserByEmail,
  updateHighScore,
  updateBestSubject,  
  updateCorrectAnswers
} = require("./userHandlers");
const { getPosts, 
  getPostById, 
  getPostsByUserId, 
  deletePostById, 
  createNewPost, 
  incrementHearts,
  decrementHearts,
  incrementPoos,
  decrementPoos
 } = require("./postHandlers");
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
.get('/api/users', getUsers) //gets an array of all user objects
.get('/api/user/:userId', getUserById) //gets specific user object by id
.get('/api/userByEmail/:userEmail', getUserByEmail) //gets specific user object by email
.patch('/api/highScore/:userId', updateHighScore) //updates user's high score.
.patch('/api/bestSubject/:userId', updateBestSubject) //updates user's top subject.
.patch('/api/correctAnswers', updateCorrectAnswers) //updates user's correctAnswers object

//Post endpoints
.get('/api/posts', getPosts)//gets all posts
.get('/api/post/:postId', getPostById) //?Do i need?
.get('/api/posts/user/:userId', getPostsByUserId) //gets all posts from specific user id.
.post('/api/posts', createNewPost) //creates a new post
.delete('/api/post/:postId', deletePostById) //deletes a specific post from feed
.patch('/api/post/incrementHearts/:postId', incrementHearts) //increments post hearts
.patch('/api/post/decrementHearts/:postId', decrementHearts) // decrements post hearts
.patch('/api/post/incrementPoos/:postId', incrementPoos) //increments post poos
.patch('/api/post/decrementPoos/:postId', decrementPoos) //decrements post poos


// //Trivia endpoint
.get('/api/triviaQuestions', getTriviaQuestions) //gets 20 random question from (https://the-trivia-api.com/)


.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});