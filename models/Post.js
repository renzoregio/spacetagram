const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    id: {
        type: String,
        required: ['true', "Please add the ID"],
        unique: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    likedBy: [{
        username: {
            type: String,
        }
    }]
})


module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema)