const {MongoClient} = require("mongodb");
require("dotenv").config({path:"./.env"});

const {MONGO_URI} = process.env;

const options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//importing data from created data files
const {allPosts} = require("./data/posts");
const {usersData} = require("./data/users");

const batchImport = async () => {
    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("myFinalProject");
        //inserting all posts into corresponding collection
        const postsResult = await db.collection("post_data").insertMany(allPosts);
        //inserting all users into corresponging collection
        const usersResult = await db.collection("users_data").insertMany(usersData);
        client.close();
    } catch (error) {
        console.log(error.stack, "error");
    }
}

batchImport();