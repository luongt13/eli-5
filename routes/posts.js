const {getPosts, getPost, createPost, updatePost, deletePost, changeLikes} = require("../controllers/posts.js")
const {Router} = require("express")

const router = Router()

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", createPost)
router.put("likes/:id", changeLikes)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)

module.exports = router