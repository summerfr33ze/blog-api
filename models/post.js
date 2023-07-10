const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {type:String, min:5, max: 100, required: true},
    message: {type: String, min: 30, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User"},
    date: {type: Date, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
    last_updated: {type: String, required: false}
})
    


PostSchema.virtual("url").get(function(){
    return `/posts/${this._id}`
})

module.exports = mongoose.model("Post", PostSchema)

