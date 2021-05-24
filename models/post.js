const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema ( 
    {
        title: {type: String, required: true},
        body: {type: String, required: true},
        category: {type: String, required: true},
        likes: {type: Number},
        user: {type: Schema.Types.ObjectId, ref: "User"}
    },
    {timestamps: true}
)
module.exports = mongoose.model("Post", postSchema)