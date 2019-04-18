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
    console.log('Connected with database.')
}).on('error', err => {
    console.log('Error connecting with database', err)
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
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);