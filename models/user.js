const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema ( 
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password_digest: {type: String, minlength: 6, maxlength: 16, required: true},
        posts: [{type: Schema.Types.ObjectId, ref: "Post"}]
    },
    {timestamps: true}
)
module.exports = mongoose.model("User", userSchema)