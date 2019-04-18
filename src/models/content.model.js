const mongoose = require('mongoose');


const ContentSchema = new mongoose.Schema({
    media: {
        data: Buffer,
        contentType: String
    },
    text:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Content', ContentSchema );
