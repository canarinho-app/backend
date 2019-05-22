const mongoose = require('mongoose');



const TweetSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId,
        auto: true
    },    
    likes: [{
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
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }],
    content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
        required: true
    },
    isResponse: {
        type: Boolean, 
        default: false
    }
});

module.exports = mongoose.model('Tweet', TweetSchema);
