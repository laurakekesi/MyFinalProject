const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const request = require('request-promise');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const getTriviaQuestions = async(req, res) => {
try{
    const response = await request('https://the-trivia-api.com/api/questions?limit=20');
    const parsedResponse = await JSON.parse(response);
    parsedResponse?
    res.status(200).json({status: 200, data: parsedResponse, message: "Questions retrieved!"})
    : res.status(404).json({status: 404, message: "No data retrieved."})
}
catch(err) {
    console.log('Error', err)
}
}


module.exports = {
    getTriviaQuestions
}