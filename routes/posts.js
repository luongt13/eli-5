const {getPosts, createPost, updatePost, deletePost, changeLikes, changeDislikes} = require("../controllers/posts.js")
const {Router} = require("express")
const restrict = require("../helper/restrict.js")
const router = Router()

router.get("/", getPosts)
router.post("/", createPost, restrict)
router.put("/likes/:id", changeLikes)
router.put("/dislikes/:id", changeDislikes)
router.put("/:id", updatePost, restrict)
router.delete("/:id", deletePost, restrict)

module.exports = router