const db = require("../db")
const Post = require("../models/post.js")
const User = require("../models/user.js")
const Question = require("../models/question.js")

db.on("error", console.error.bind(console, "Mongo Connection Error"))

const getPosts = async (req,res) => {
    try {
        const posts = await Post.find({}).sort({'createdAt': 1})
        return res.status(200).json(posts)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

// const getPost = async (req,res) => {
//     try {
//         const post = await Post.findById(req.params.id)
//         if (post) {
//             return res.status(200).json(post)
//         } else {
//             return res.status(404).send("post not found")
//         }
//     } catch (err) {
//         return res.status(500).json({error: err.message})
//     }
// }

const createPost = async (req,res) => {
    try {
        let {body, user_id, question_id} = req.body
        let newPost = {
            body, user_id, question_id
        }

        let foundUser = await User.findById(user_id)
        let foundQuestion = await Question.findById(question_id)
        let post = await Post.create(newPost)

        await User.findByIdAndUpdate(
            {_id: foundUser._id},
            {$push: {posts: post._id}}
        )
        await Question.findByIdAndUpdate(
            {_id: foundQuestion._id},
            {$push: {posts: post._id}}
        )
        return res.status(201).json(post)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const updatePost = async (req,res) => {
    try {
        let updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(updatedPost) {
            return res.status(200).json(updatedPost)
        } else {
            return res.status(404).send("post not found")
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const changeLikes = async (req,res) => {
    try {
        let {user_id} = req.body
        let foundUser = await User.findById(user_id)
        let post = await Post.findById(req.params.id)
        let foundLikes = await Post.find({_id: post._id, likes: [foundUser._id]})
        let foundDislikes = await Post.find({dislikes: [foundUser._id]})

        if(foundLikes.length === 0 && foundDislikes.length === 0) {
            await Post.findByIdAndUpdate(
                {_id: post._id},
                {$push: {likes: foundUser._id}}
            )
        } else if (foundDislikes.length === 1 && foundLikes.length === 0) {
            await Post.findOneAndUpdate(
                {_id: post._id},
                {$pull: {dislikes: foundUser._id}})
            await Post.findByIdAndUpdate(
                {_id: post._id},
                {$push: {likes: foundUser._id}}
            )
        } else {
            await Post.findOneAndUpdate(
                {_id: post._id},
                {$pull: {likes: foundUser._id}}
            )
        }

        if(post) {
            return res.status(200).json(post)
        } else {
            return res.status(404).send("post not found")
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const changeDislikes = async (req,res) => {
    try {
        let {user_id} = req.body
        let foundUser = await User.findById(user_id)
        let post = await Post.findById(req.params.id)
        let foundLikes = await Post.find({_id: post._id, likes: [foundUser._id]})
        let foundDislikes = await Post.find({dislikes: [foundUser._id]})

        if(foundLikes.length === 0 && foundDislikes.length === 0) {
            await Post.findByIdAndUpdate(
                {_id: post._id},
                {$push: {dislikes: foundUser._id}}
            )
        } else if (foundDislikes.length === 0 && foundLikes.length === 1) {
            console.log(post.likes)
            await Post.findOneAndUpdate(
                {_id: post._id},
                {$pull: {likes: foundUser._id}})
            await Post.findByIdAndUpdate(
                {_id: post._id},
                {$push: {dislikes: foundUser._id}}
            )
        }
        if(post) {
            return res.status(200).json(post)
        } else {
            return res.status(404).send("post not found")
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const deletePost = async (req,res) => {
    try {
        let deletePost = await Post.findByIdAndDelete(req.params.id)
        let foundQuestion = await Question.findOne({posts: {$in: deletePost._id}})
        await foundQuestion.posts.pull({_id: deletePost._id})
        await foundQuestion.save()

        if (deletePost) {
            return res.status(200).json(deletePost)
        } else {
            return res.status(404).send("post not found")
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}
module.exports = {getPosts, createPost, updatePost, deletePost, changeLikes, changeDislikes}