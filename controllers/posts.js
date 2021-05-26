const db = require("../db")
const Post = require("../models/post.js")
const User = require("../models/user.js")

db.on("error", console.error.bind(console, "Mongo Connection Error"))

const getPosts = async (req,res) => {
    try {
        const posts = await Post.find({})
        return res.status(200).json(posts)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const getPost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post) {
            return res.status(200).json(post)
        } else {
            return res.status(404).send("post not found")
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const createPost = async (req,res) => {
    try {
        let {title, body, category, user_id} = req.body
        let newPost = {
            title, body, category, user_id
        }

        let foundUser = await User.findById(user_id)
        let post = await Post.create(newPost)

        await User.findByIdAndUpdate(
            {_id: foundUser._id},
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
        let foundPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(foundPost) {
            return res.status(200).json(foundPost)
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
        if (deletePost) {
            return res.status(200).json(deletePost)
        } else {
            return res.status(404).send("post not found")
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}
module.exports = {getPosts, getPost, createPost, updatePost, deletePost, changeLikes}