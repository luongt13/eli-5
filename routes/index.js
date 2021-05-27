const {Router} = require("express")
const userRouter = require("./users")
const postRouter = require("./posts")
const questionRouter = require("./question")
const router = Router()

router.use("/", userRouter)
router.use("/posts", postRouter)
router.use("/questions", questionRouter)

module.exports = router