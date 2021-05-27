const mongoose = require("mongoose")
const Schema = mongoose.Schema

const questionSchema = new Schema (
    {
        body: {type: String, required: true},
        category: {type: String, required: true},
        user_id: {type: Schema.Types.ObjectId, ref: "User"},
        posts: [{type: Schema.Types.ObjectId, ref: "Post"}]
    }, {timestamps: true}

)
module.exports = mongoose.model("Question", questionSchema)