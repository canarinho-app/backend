const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true
};

const mongooseConnectionString = 'mongodb://localhost:3000/Comments';
mongoose.connect(mongooseConnectionString, options);

mongoose.connection.once('open', () => {
    console.log('Module: Comments | Status: Connected to database.')
}).on('error', err => {
    console.log('Module: Comments | Status: Error connecting to database', err)
}
);

mongoose.set('useCreateIndex', true);


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
