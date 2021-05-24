const {Router} = require("express")
const userRouter = require("./users")
const postRouter = require("./posts")

const router = Router()

router.use("/", userRouter)
router.use("/posts", postRouter)