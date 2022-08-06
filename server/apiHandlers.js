const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const request = require('request-promise');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


// const getGeekJoke = async () => {
//   try{
//   const response = await request('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
//   const parsedResponse = await JSON.parse(response);
//   return(parsedResponse.type === "single"?
//   parsedResponse.joke
//   : `${parsedResponse.setup} ....... ${parsedResponse.delivery}`
//   )
//   }
//   catch(err) {
//     console.log('Error: ', err)
//   }
// };

const getTriviaQuestions = async(req, res) => {
try{
    const response = await request('https://the-trivia-api.com/api/questions?limit=20');
    const parsedResponse = await JSON.parse(response);
    console.log(parsedResponse);
    res.status(200).json({status: 200, data: parsedResponse, message: "Questions retrieved!"})
}
catch(err) {
    console.log('Error', err)
}
}


module.exports = {
    getTriviaQuestions
}