const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema ( 
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password_digest: {type: String, required: true},
        posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
        questions: [{type: Schema.Types.ObjectId, ref: "Question"}]
    },
    {timestamps: true}
)
module.exports = mongoose.model("User", userSchema)