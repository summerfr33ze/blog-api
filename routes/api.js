const express = require("express")
const router = express.Router()
const postController = require("../controllers/postController")
const userController = require("../controllers/userController")


router.get("/", postController.index)
router.get("/posts", postController.posts_get)
router.post("/posts", postController.post_create_post)
router.get("/posts/:postId", postController.current_post_get)
router.post("/posts/:postId/comments", postController.comment_create_post)

router.post("/login", userController.login_post)
router.post("/signup", userController.signup_post)
router.get("/login_success", userController.login_success)
router.get("/login_failure", userController.login_failure)


router.get("/test", () => {
    return res.send("test")
})


module.exports = router

