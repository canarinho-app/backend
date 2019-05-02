const mongoose = require('mongoose');



const CommentSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId,
        auto: true
    },
    content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Comment', CommentSchema);
