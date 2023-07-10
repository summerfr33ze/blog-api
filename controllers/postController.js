const {body, validationResult} = require("express-validator")
const User = require("../models/user")
const Post = require("../models/post")
const Comment = require("../models/comment")


exports.index = (req, res) => {
    res.redirect("/posts")
}

exports.posts_get = async (req,res) => {
    console.log("hi")
    const Posts = await Post.find({}, "title message date user")
    .sort({date: -1})
    .populate("user")
    .exec()

    res.json(Posts)
}

exports.current_post_get = async (req,res) => {
    const currentPost = await Post.findById(req.params.postId)
    .populate("user")
    .populate("comments")
    .exec()
    
    res.json(currentPost)
}



exports.comment_create_post = [body("comment").trim().isLength({min: 5}).escape(),

async (req, res) => {
    const errors = validationResult(req)

    if(errors.isEmpty()){
    const newComment = new Comment({
        comment_body: req.body.comment,
        user: req.user,
        post: req.params.postId,
        date: new Date()
    })

    const currentPost = Post.findById(req.params.postId)
    currentPost.messages.push(newComment)

    await newComment.save()
}
    else(res.json(errors.array()))

}
]
    




exports.post_create_post = [body("message").trim().isLength({min: 30}).escape(),
body("title").trim().isLength({min: 5, max: 100}).escape(),

async (req,res) => {
    console.log(req.body)
    const errors = validationResult(req)

    if(errors.isEmpty()){
        const post = new Post({
            title: req.body.title,
            message: req.body.message,
            // user: req.user,
            date: new Date(),
        })

        await post.save()

        res.send("yo")
    }
     else(res.json(errors))
}
]

exports.post_update_post = [body("message").trim().isLength({min: 30}).escape(),
body("title").trim().isLength({min: 5, max: 100}).escape(),

async (req,res) => {
    const errors = validationResult(req)

    if(errors.isEmpty()){
        const post = Post.findById(req.params.postId)
        .populate("user")
        .exec()
        post.title = req.body.title,
        post.message = req.body.post,
        post.user = req.user

    }
    else(res.json(errors.array()))
}
]




