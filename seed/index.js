const db = require('../db/index')
const User = require("../models/user.js")
const Question = require("../models/question")
const Post = require("../models/post.js")

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  //clear seed database
    await User.deleteMany({})
    await Post.deleteMany({})
    await Question.deleteMany({})

    let users = [
        {
            name: "Tran",
            email: "test@email.com",
            password_digest: "12345678"
        },
        {
            name: "Issac",
            email: "tester@email.com",
            password_digest: "12345678"
        }
    ]
    
    // User.create(users)

    // let found = User.findOne({})
    // let question = {
    //     body: "What is Big 0 Notation?",
    //     category: "tech",
    //     user_id: found._id
    // }

    // Question.create(question)
}

const run = async () => {
    await main()
    db.close()
}

run()