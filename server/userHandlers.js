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


module.exports = {
  getUsers,
  getUserById
};
