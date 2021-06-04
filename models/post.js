const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema ( 
    {
        body: {type: String, required: true},
        likes: {type: Schema.Types.ObjectId, ref: "User"},
        dislikes: {type: Schema.Types.ObjectId, ref: "User"},
        user_id: {type: Schema.Types.ObjectId, ref: "User"},
        question_id: {type: Schema.Types.ObjectId, ref: "Question"}
    },
    {timestamps: true}
)
module.exports = mongoose.model("Post", postSchema)