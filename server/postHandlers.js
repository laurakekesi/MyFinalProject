const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getPosts = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect;
    const db = client.db("myFinalProject");
    const posts = await db.collection("post_data").find().toArray();
    posts?
    res.status(200).json({status: 200, data: posts, message: "All posts successfully retrieved!"})
    : res.status(404).json({status: 404, message: "Error retrieving posts."});
    client.close;
};

const getPostById = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("myFinalProject");
    const _id = req.params.postId;
    const post = await db.collection("post_data").findOne({_id: ObjectId(_id)});
    post?
    res.status(200).json({status: 200, data: post, message: "Post retrieved!"})
    : res.status(404).json({status: 404, message: "No post found under that _id."});
    client.close();
}

const getPostsByUserId = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("myFinalProject");
    const _id = req.params.userId;
    const posts = await db.collection("post_data").find({userId: _id}).toArray();
    posts?
    res.status(200).json({status: 200, data: posts, message: "All posts by user retrieved!"})
    : res.status(404).json({status: 404, message: "No users found under that _id."});
    client.close;
}

const deletePostById = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("myFinalProject");
    const _id = req.params.postId;
    const deletePost = await db.collection("post_data").findOneAndDelete({_id: ObjectId(_id)});
    deletePost?
    res.status(200).json({status: 200, message: "Post successfully deleted!"})
    : res.status(404).json({status: 404, message: "No post found under that _id."});
    client.close();
}

const createNewPost = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("myFinalProject");
    const newPost = req.body;
    newPost.numHearts = 0;
    newPost.numPoos = 0;
    const createPost = await db.collection("post_data").insertOne(newPost);
    createPost?
    res.status(200).json({status: 200, data: createPost, message: "Post successfully created!"})
    : res.status(404).json({status: 404, message: "Post not added."});
    client.close();
}

const updatePostStats = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("myFinalProject");
    const _id = req.params.postId;
    const query = {_id: _id};
    const updatedHearts = req.body.numHearts;
    const updatedPoos = req.body.numPoos;
    let newValues;
    let message;
    const postToUpdate = await db.collection("post_data").findOne({_id: ObjectId(_id)});
    console.log(postToUpdate);
    //if post id is found, and there is either hearts or poos to update in the req.body,
    //set new values & message depending on what stat is contained in the req.body
    if (postToUpdate && (updatedHearts || updatedPoos)) {
        if (updatedHearts) {
            newValues = { $set: {numHearts : updatedHearts} };
            message = "Hearts successfully updated!";
        } else {
            newValues = { $set: {"numPoos": updatedPoos} };
            message = "Poos successfully updated!";
        }
    //use above determined newValues and message in updateOne method 
    const updatedPost = await db.collection("post_data").updateOne(query, newValues);
    console.log(updatedPost);
    updatedPost? 
    res.status(200).json({status: 200, data: updatedPost, message: message})
    : res.status(404).json({status: 404, message: "Post not updated."})
    }
    res.status(404).json({status: 404, message: "Update unsuccessful."})
    client.close();
}

module.exports = {
    getPosts,
    getPostById,
    getPostsByUserId, 
    deletePostById,
    createNewPost,
    updatePostStats
}