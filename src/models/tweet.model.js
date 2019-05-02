const mongoose = require('mongoose');



const TweetSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId,
        auto: true
    },    
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    retweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
        required: true
    }
});


module.exports = mongoose.model('Tweet', TweetSchema);
