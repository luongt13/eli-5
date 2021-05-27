const db = require("../db")
const Post = require("../models/post.js")
const User = require("../models/user.js")
const Question = require("../models/question.js")

db.on("error", console.error.bind(console, "Mongo Connection Error"))

const getQuestions = async (req,res) => {
    try {
        const questions = await Question.find({})
        return res.status(200).json(questions)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const getQuestion = async (req,res) => {
    try {
        const question = await Question.findById(req.params.id)
        if (post) {
            return res.status(200).json(question)
        } else {
            return res.status(404).send("question not found")
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const createQuestion = async (req,res) => {
    try {
        let {body, category, user_id} = req.body
        let newPost = {
            body, category, user_id
        }

        let foundUser = await User.findById(user_id)
        let question = await Question.create(newPost)

        await User.findByIdAndUpdate(
            {_id: foundUser._id},
            {$push: {questions: question._id}}
        )

        return res.status(201).json(question)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const updateQuestion = async (req,res) => {
    try {
        let updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(updatedQuestion) {
            return res.status(200).json(updatedQuestion)
        } else {
            return res.status(404).send("question not found")
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const deleteQuestion = async (req,res) => {
    try {
        let deletedQuestion = await Question.findByIdAndDelete(req.params.id)
        let foundUser = await User.findOne({questions: {$in: deletedQuestion._id}})
        await foundUser.questions.pull({_id: deletedQuestion._id})
        await foundUser.save()

        if (deletedQuestion) {
            return res.status(200).json(foundUser)
        } else {
            return res.status(404).send("post not found")
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}
module.exports = {getQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion}