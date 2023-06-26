const express = require("express")
const router = express.Router
const apiController = require("../controllers/apiController")

router.get("/", apiController.index)
router.get("/posts", apiController.posts)
router.get("/posts/:postId", apiController.current_post_get)
router.post("/posts/:postId/comments/:commentId", apiController.comment_create_post)
router.post("/posts/:postId", apiController.post_create_post)

module.exports = router

