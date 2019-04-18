const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true
};

const mongooseConnectionString = 'mongodb://localhost/Users';
mongoose.connect(mongooseConnectionString, options);

/**
 * Watch the connection with the local database.
 */
mongoose.connection.once('open', () => {
    console.log('Connected to database.')
}).on('error', err => {
    console.log('Error connecting to database', err)
}
);

mongoose.set('useCreateIndex', true);

const UserSchema = new mongoose.Schema({
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
    description: String,
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('User', UserSchema);