const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    profileImg: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    displayname: {
        type: String,
        required: true
    },

    bio: {
        type:String
    },

    description: String,
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }]
});

module.exports = mongoose.model('User', UserSchema);