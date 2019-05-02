const mongoose = require('mongoose');



const ContentSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId,
        auto: true
    },
    media: {
        data: Buffer,
        contentType: String
    },
    text:{
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Content', ContentSchema);
