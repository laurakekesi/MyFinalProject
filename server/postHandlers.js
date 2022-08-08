const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//****************** GET HANDLERS ***********************/
const getPosts = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect;
  const db = client.db("myFinalProject");
  const posts = await db.collection("post_data").find().toArray();
  posts
    ? res
        .status(200)
        .json({
          status: 200,
          data: posts,
          message: "All posts successfully retrieved!",
        })
    : res.status(404).json({ status: 404, message: "Error retrieving posts." });
  client.close;
};

const getPostById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("myFinalProject");
  const _id = req.params.postId;
  const post = await db.collection("post_data").findOne({ _id: ObjectId(_id) });
  post
    ? res
        .status(200)
        .json({ status: 200, data: post, message: "Post retrieved!" })
    : res
        .status(404)
        .json({ status: 404, message: "No post found under that _id." });
  client.close();
};

const getPostsByUserId = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("myFinalProject");
  const _id = req.params.userId;
  const posts = await db
    .collection("post_data")
    .find({ userId: _id })
    .toArray();
  posts
    ? res
        .status(200)
        .json({
          status: 200,
          data: posts,
          message: "All posts by user retrieved!",
        })
    : res
        .status(404)
        .json({ status: 404, message: "No users found under that _id." });
  client.close;
};

//****************** DELETE HANDLER ***********************/
const deletePostById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("myFinalProject");
  const _id = req.params.postId;
  const deletePost = await db
    .collection("post_data")
    .findOneAndDelete({ _id: ObjectId(_id) });
  deletePost
    ? res
        .status(200)
        .json({ status: 200, message: "Post successfully deleted!" })
    : res
        .status(404)
        .json({ status: 404, message: "No post found under that _id." });
  client.close();
};

//****************** POST HANDLER ***********************/
const createNewPost = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("myFinalProject");
  const newPost = req.body;
  newPost.numHearts = 0;
  newPost.numPoos = 0;
  const createPost = await db.collection("post_data").insertOne(newPost);
  createPost
    ? res
        .status(200)
        .json({
          status: 200,
          data: createPost,
          message: "Post successfully created!",
        })
    : res.status(404).json({ status: 404, message: "Post not added." });
  client.close();
};
 //****************** PATCH HANDLERS ***********************/
const incrementHearts = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("myFinalProject");
    const _id = req.params.postId;
    const query = { _id: ObjectId(_id) };
    const postToUpdate = await db
      .collection("post_data")
      .findOne({ _id: ObjectId(_id) });
    let newValues;
    const newNumHearts = postToUpdate.numHearts + 1;
    if (postToUpdate) {
      newValues = { $set: { numHearts: newNumHearts} };
    }
    const updatedPost = await db
      .collection("post_data")
      .updateOne(query, newValues);
    updatedPost.modifiedCount === 1
      ? res
          .status(200)
          .json({ status: 200, data: updatedPost, message: "Post updated!" })
      : res.status(404).json({ status: 404, message: "Post not updated." });
      client.close();
  } catch {
    res.status(500).json({ status: 500, message: "Server error!" });
  }
};

const decrementHearts = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("myFinalProject");
        const _id = req.params.postId;
        const query = {_id: ObjectId(_id)};
        let newValues;
        const postToUpdate = await db.collection("post_data").findOne({_id: ObjectId(_id)});
        const newNumHearts = postToUpdate.numHearts - 1;
        if (postToUpdate) {
            newValues = { $set: {numHearts: newNumHearts} };
        }
        const updatedPost = await db.collection("post_data").updateOne(query, newValues);
        updatedPost.modifiedCount === 1?
        res.status(200).json({status: 200, data: updatedPost, message: "Post updated!"})
        : res.status(404).json({status: 404, message: "Post not updated."})
    }
    catch {
        res.status(500).json({status: 500, message: "Server error!"});
    }
}

const incrementPoos = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        client.connect();
        const db = client.db("myFinalProject");
        const _id = req.params.postId;
        const query = {_id: ObjectId(_id)};
        let newValues;
        const postToUpdate = await db.collection("post_data").findOne({_id: ObjectId(_id)});
        const newNumPoos = postToUpdate.numPoos + 1;
        if (postToUpdate) {
            newValues = { $set: {numPoos: newNumPoos} };
        }
        const updatedPost = await db.collection("post_data").updateOne(query, newValues);
        updatedPost.modifiedCount === 1?
        res.status(200).json({status: 200, data: updatedPost ,message: "Post updated!"})
        : res.status(404).json({status: 404, data: updatedPost ,message: "Post not updated"})
    }
    catch {
        res.status(500).json({status: 500, message: "Server error!"});
    }
}

const decrementPoos = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const _id = req.params.postId;
        const db = await client.db("myFinalProject");
        const query = {_id: ObjectId(_id)};
        let newValues;
        const postToUpdate = await db.collection("post_data").findOne({_id: ObjectId(_id)});
        const newNumPoos = postToUpdate.numPoos - 1;
        if (postToUpdate) {
            newValues = { $set: {numPoos: newNumPoos}};
        }
        const updatedPost = await db.collection("post_data").updateOne(query, newValues);
        updatedPost.modifiedCount === 1?
        res.status(200).json({status: 200, data: updatedPost ,message: "Post updated!"})
        : res.status(404).json({status: 404, data: updatedPost ,message: "Post not updated."})
    }
    catch{
        res.status(500).json({status: 500, message: "Server error!"});
    }
}



module.exports = {
  getPosts,
  getPostById,
  getPostsByUserId,
  deletePostById,
  createNewPost,
  incrementHearts,
  decrementHearts,
  incrementPoos,
  decrementPoos
};
