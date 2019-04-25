const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true
};

const mongooseConnectionString = 'mongodb://localhost/canarinho';
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

/**
 * Manage mongoose deprecation warnings.
 */
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
    User : require('../models/user.model')
}