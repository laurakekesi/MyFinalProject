const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// const getCompanyById = async (req, res) => {
//     const client = new MongoClient(MONGO_URI, options);
  
//     await client.connect();
//     const db = client.db("groupProject");
//     const companyID = parseInt(req.params.companyId);
  
  
//     const singleCompany = await db.collection("companies").findOne({ _id:companyID });
//     const products = await db.collection("all_items").find({ companyId:companyID }).toArray();
  
//     singleCompany && products
//       ? res
//           .status(200)
//           .json({
//             status: 200,
//             companyInfo: singleCompany,
//             companyProducts:products,
//             message: "getCompanyById success!",
//           })
//       : res.status(404).json({ status: 404, message: "getCompanyById fail!" });
//   client.close();
//   };

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



module.exports = {
    getPosts,
    getPostById,
    getPostsByUserId
}