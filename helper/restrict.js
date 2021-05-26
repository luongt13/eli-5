const jwt = require("jsonwebtoken")
const TOKEN_KEY = "eli5isthebestappever"

const restrict = (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const data = jwt.verify(token, TOKEN_KEY)
        res.locals.user = data
        next()
    } catch (err) {
        res.status(403).send("Unauthorized")
    }
}
module.exports = restrict