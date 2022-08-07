const express = require('express');
const morgan = require('morgan');
require("dotenv").config();
const { auth } = require('express-openid-connect');
const { ISSUER_BASE_URL, BASE_URL, CLIENT_ID, SECRET} = process.env;


const { getUsers, getUserById} = require("./userHandlers");
const { getPosts, getPostById, getPostsByUserId, deletePostById, createNewPost, updatePostStats } = require("./postHandlers");
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

//  Auth0 configuration data  //***** NOT DONE ******/
  .use(
    auth({
      issuerBaseURL: ISSUER_BASE_URL,
      baseURL: BASE_URL,
      clientID: CLIENT_ID,
      secret: SECRET,
      idpLogout: true,
    })
  )

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

//***** NOT DONE ******/
// .patch('/api/user/:userId',) //updates high score and/or top subject.

// //Post endpoints
.get('/api/posts', getPosts)//gets all posts
.get('/api/post/:postId', getPostById) //?Do i need?
.get('/api/posts/user/:userId', getPostsByUserId) //gets all posts from specific user id.
.post('/api/posts', createNewPost) //creates a new post
.delete('/api/post/:postId', deletePostById) //deletes a specific post from feed

//***** NOT DONE ******/
.patch('/api/post/:postId', updatePostStats) //updates post stats (hearts and/or poos) *****HELP

// //Trivia endpoint
.get('/triviaQuestions', getTriviaQuestions) //gets 20 random question from (https://the-trivia-api.com/)

// //Auth0 endpoint


.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});