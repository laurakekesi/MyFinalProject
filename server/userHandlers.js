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

// const patchStock = async(req,res)=>{
//   const client = new MongoClient(MONGO_URI, options);

//   await client.connect();
//   const db = client.db("groupProject");
//   const stockNum = req.body

//   const numInStock = await db.collection("all_items").findOneAndUpdate({_id:_id},{$inc:{numInStock:-{quantity}}},{returnNewDocument:true})
//   numInStock>0
//     ? res
//         .status(200)
//         .json({
//           status: 200,
//           data: numInStock,
//           message: "numInstock reduce success!",
//         })
//     : res.status(404).json({ status: 404, message: "stock not enough!" });
// client.close();

// }

const updateUserInfo = async(req, res) => {
  // const client = new MongoClient(MONGO_URI, options);
  // await client.connect();
  // const db = client.db("myFinalProject");
  // const _id = req.params.userId;
  // const updatedHearts = req.body.numHearts;
  // const updatedPoos = req.body.numPoos;
  // if (updatedHearts) {
  // const updatePostHearts = await db.collection("users_data").findOneAndUpdate({_id: _id}, {$set:{numHearts: updatedHearts}})
  // updatePostHearts?
  // res.status(200).json({status: 200, data: updatePostHearts, message: `New number of hearts: ${updatedHearts}`})
  // : res.status(404).json({status: 404, message: "Hearts not updated </3."})
  // } else if (updatedPoos) {
  // const updatePostPoos = await db.collection("users_data").findOneAndUpdate({_id: _id}, {$set:{numPoos: updatedPoos}})
  // updatePostPoos?
  // res.status(200).json({status: 200, data: updatePostHearts, message: `New number of hearts: ${updatedPoos}`})
  // : res.status(404).json({status: 404, message: "Poos not updated"})
  // } else {
  //   res.status(404).json({status: 404, message: "Update unsuccessful."})
  // }
  // client.close();
}


module.exports = {
  getUsers,
  getUserById,
  updateUserInfo
};
