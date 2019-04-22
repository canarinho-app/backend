const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true
};

const mongooseConnectionString = 'mongodb://localhost:3000/Contents';
mongoose.connect(mongooseConnectionString, options);

mongoose.connection.once('open', () => {
    console.log('Module: Content | Status: Connected to database.')
}).on('error', err => {
    console.log('Module: Content | Status: Error connecting to database', err)
}
);

mongoose.set('useCreateIndex', true);


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

module.exports = mongoose.model('Content', ContentSchema );
