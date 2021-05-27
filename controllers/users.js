const db = require("../db")
const User = require("../models/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

db.on("error", console.error.bind(console, "Mongo Connection Error"))

const SALT_ROUNDS = 11
const TOKEN_KEY = "eli5isthebestappever"

const signUp = async (req,res) => {
    try {
        const {name, email, password} = req.body
        const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
        const user = new User({name, email, password_digest})

        await user.save()
        const payload = {
            name: user.name,
            email: user.email
        }
        const token = jwt.sign(payload, TOKEN_KEY)
        return res.status(201).json({token})
    } catch (err) {
        return res.status(400).json({error: err.message})
    }
}

const signIn = async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        if(user) {
            if (await bcrypt.compare(password, user.password_digest)) {
                const payload = {
                    name: user.name,
                    email: user.email
                }
                const token = jwt.sign(payload, TOKEN_KEY)
                return res.status(200).json({token, payload})
            } else {
                res.status(401).send("invalid credentials")
            } 
        } else {
            res.status(404).send("user does not exist")
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const verify = async (req,res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const payload = jwt.verify(token, TOKEN_KEY)
        if(payload) {
            return res.json(payload)
        } 
    } catch (err) {
        res.status(401).send("not authorized")
    }
}

const changePassword = async (req,res) => {
    try {
        let user = await User.findById(req.params.id)
        const {newPassword, oldPassword} = req.body
        if(await bcrypt.compare(oldPassword, user.password_digest)) {
            const password_digest = bcrypt.hash(newPassword, SALT_ROUNDS)
            user = await User.findByIdAndUpdate(
                req.params.id,
                {password_digest: password_digest},
                {new: true}
            )
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email
            }
            const token = jwt.sign(payload, TOKEN_KEY)
            return res.status(201).json({user, token})
        } else {
            return res.status(400).send("wrong password")
        }
    } catch (err) {
        return res.status(400).json({error: err.message})
    }
}

const findUser = async (req,res) => {
    try {
        user = await User.findOne(req.body)
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const getUsers = async (req,res) => {
    try {
        users = await User.find({})
        return res.status(200).json(users)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const getUser = async (req,res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts")
        if(user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).send("Not Found")
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const updateUser = async (req,res) => {
    try {
        let updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(updateUser) {
            return res.status(200).json(updateUser)
        } else {
            return res.status(404).send("User not found")
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

module.exports = {getUsers, findUser, signUp, signIn, verify, changePassword, getUser, updateUser}