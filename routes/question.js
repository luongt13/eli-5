const {getQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion} = require("../controllers/questions.js")
const {Router} = require("express")
const restrict = require("../helper/restrict.js")
const router = Router()


router.get("/", getQuestions)
router.get("/:id", getQuestion)
router.post("/", createQuestion, restrict)
router.put("/:id", updateQuestion, restrict)
router.delete("/:id", deleteQuestion, restrict)

module.exports = router