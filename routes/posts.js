const {getPosts, getPost, createPost, updatePost, deletePost, changeLikes} = require("../controllers/posts.js")
const {Router} = require("express")
const restrict = require("../helper/restrict.js")
const router = Router()

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", createPost, restrict)
router.put("/likes/:id", changeLikes)
router.put("/:id", updatePost, restrict)
router.delete("/:id", deletePost, restrict)

module.exports = router