const mongoose = require("mongoose")
const MONGODBURI = process.env.PROD_MONGODB || "mongodb://127.0.0.1:27017/eli5Database"
mongoose.connect(MONGODBURI, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
    console.log("MongoDB Connected")
}).catch((error) => {
    console.log(error.message)
})

//comment out in production
mongoose.set("debug", true)
const db = mongoose.connection

module.exports = db