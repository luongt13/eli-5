const {signUp, signIn, verify, changePassword, getUser, updateUser} = require("../controllers/users.js")
const {Router} = require("express")
// const restrict = require("../helper/restrict.js")
const router = Router()

router.get("/users", getUser)
router.post("/sign-up", signUp)
router.post("/sign-in", signIn)
router.get("/verify", verify)
router.put("/password/:id", changePassword)
router.put("/users/:id", updateUser)

module.exports = router