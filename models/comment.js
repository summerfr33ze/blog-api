const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    comment_body: {type: String, required: true, min: 5},
    user: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    post: {type: Schema.Types.ObjectId, required: true, ref: "Post"},
    date: {type: Date, required: true},
})

CommentSchema.virtual("url").get(function(){
    return `/posts/:postId/${this._id}`
})

module.exports = mongoose.model("Comment", CommentSchema)