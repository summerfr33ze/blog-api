const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    comment_body: {type: String, required: true, min: 5},
    user: {type: Schema.Types.ObjectId, required: true},
    post: {type: Schema.Types.ObjectId, required: true, ref: "Post"},
    date: new Date(),
})

CommentSchema.virtual("url").get(function(){
    return `/posts/:postId/${this._id}`
})

module.exports = mongoose.Model("Comment", CommentSchema)