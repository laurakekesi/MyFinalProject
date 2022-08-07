const {v4:uuidv4 } = require("uuid");

const allPosts = [
    {
        postId : uuidv4(),
        userId: "414ZsoltKekesi",
        postContent: "New High Score!",
        numHearts: 4,
        numPoos: 5,
    },
    {
        postId : "123", //
        userId: "420RachelRokas", //rachel
        postContent: "Trivia rules!",
        numHearts: 2,
        numPoos: 9,
    },
    {
        postId : uuidv4(),
        userId: "222SarahGagne",
        postContent: "My new top subject is Music!",
        numHearts: 1,
        numPoos: 6,
    },
    {
        postId : uuidv4(),
        userId: "156GMK",
        postContent: "I'm a history nerd!",
        numHearts: 7,
        numPoos: 8,
    },
    {
        postId : uuidv4(),
        userId: "421KathyMachnik",
        postContent: "NOBODY CAN BEAT MY HIGH SCORE",
        numHearts: 8,
        numPoos: 3,
    },
    {
        postId : uuidv4(),
        userId: "666LauraKekesi",
        postContent: "I AM THE TRIVIA MASTER",
        numHearts: 7,
        numPoos: 9,
    },   
    {
        postId : uuidv4(),
        userId: "690AlexKekesi",
        postContent: "New high score yay!",
        numHearts: 6,
        numPoos: 2,
    },
    {
        postId : uuidv4(),
        userId: "414ZsoltKekesi",
        postContent: "Come to me for all your Geography woes",
        numHearts: 8,
        numPoos: 17,
    },
    {
        postId : uuidv4(),
        userId: "156GMK",
        postContent: "I hate science.",
        numHearts: 2,
        numPoos: 9,
    },
    {
        postId : uuidv4(),
        userId: "414ZsoltKekesi",
        postContent: "Society & Culture? What's that?",
        numHearts: 4,
        numPoos: 2,
    },
]

module.exports = {allPosts};