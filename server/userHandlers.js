const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("myFinalProject");
    const users = await db.collection("users_data").find().toArray();
    users?
    res.status(200).json({status: 200, data: users, message: "All users successfully retrieved!"})
    : res.status(404).json({status: 404, message: "Error retrieving users."});
    client.close();
}

const getUserById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("myFinalProject");
  const _id = req.params.userId;
  const findUser = await db.collection("users_data").findOne({_id: ObjectId(_id)});
  findUser?
  res.status(200).json({status: 200, data: findUser, message: "User successfully retrieved!"})
  : res.status(404).json({status: 404, message: "No user found with that _id."})
  client.close();
}

const getUserByEmail = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("myFinalProject");
  const email = req.params.userEmail;
  const findUser = await db.collection("users_data").findOne({email: email});
  findUser?
  res.status(200).json({status: 200, data: findUser, message: "User successfully retrieved!"})
  : res.status(404).json({status: 404, message: "No user found with that email."})
  client.close();
}

const updateHighScore = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
      client.connect();
      const db = client.db("myFinalProject");
      const _id = req.params.userId;
      const query = {_id: ObjectId(_id)};
      const newHighScore = req.body.highScore;
      let newValues;
      const postToUpdate = await db.collection("users_data").findOne({_id: ObjectId(_id)});
      if (postToUpdate) {
          newValues = { $set: {highScore: newHighScore} };
      }
      const updatedPost = await db.collection("users_data").updateOne(query, newValues);
      updatedPost.modifiedCount === 1?
      res.status(200).json({status: 200, data: updatedPost ,message: "High score updated!"})
      : res.status(404).json({status: 404, data: updatedPost ,message: "High score not updated."})
  }
  catch {
      res.status(500).json({status: 500, message: "Server error!"});
  }
}

const updateBestSubject = async(req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
      client.connect();
      const db = client.db("myFinalProject");
      const _id = req.params.userId;
      const query = {_id: ObjectId(_id)};
      const newBestSubject = req.body.bestSubject;
      let newValues;
      const postToUpdate = await db.collection("users_data").findOne({_id: ObjectId(_id)});
      if (postToUpdate) {
          newValues = { $set: {bestSubject: newBestSubject} };
      }
      const updatedPost = await db.collection("users_data").updateOne(query, newValues);
      updatedPost.modifiedCount === 1?
      res.status(200).json({status: 200, data: updatedPost ,message: "Best subject updated!"})
      : res.status(404).json({status: 404, data: updatedPost ,message: "Best subject not updated."})
  }
  catch {
      res.status(500).json({status: 500, message: "Server error!"});
  }
}
//increments value of question category provided in body by 1
const updateCorrectAnswers = async(req,res) => {
const client = new MongoClient(MONGO_URI, options);
try {
  await client.connect();
  const db = client.db("myFinalProject");
  const _id = req.body._id;
  const query = ({_id: ObjectId(_id)});
  const userToUpdate  = await db.collection("users_data").findOne({_id: ObjectId(_id)});
  if (userToUpdate) {
    const bodyCategory = req.body.category;
    //finds the correctAnswers object within the logged in users's use object.
    const correctAnswers = userToUpdate.correctAnswers;
    //sets the original value to a number and increments that number by 1.
    const valueToUpdate = Number(correctAnswers[bodyCategory]);
    const newCatValue = valueToUpdate + 1;
    //updates the key value pair of the specific category to the new value and sets the
    //correctAnswers object to include the updated key/value pair.
    correctAnswers[bodyCategory] = newCatValue;
    const newValues = {$set: {correctAnswers}};
    //only updates the user object if the category in the body already exists.
    if (correctAnswers[bodyCategory]){
    const updatedUser = await db.collection("users_data").updateOne(query, newValues);
    updatedUser.modifiedCount === 1?
    res.status(200).json({status: 200, data: updatedUser ,message: "User category updated!"})
    : res.status(404).json({status: 404, data: updatedUser ,message: "User category not updated."})
    } else {
      res.status(404).json({status: 404, message: "Category not found."})
    }
  }
}
catch {
  res.status(500).json({status: 500, message: "Server error!"});
}
}


module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  updateHighScore,
  updateBestSubject,
  updateCorrectAnswers
};
