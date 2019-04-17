const express = require('express');
const UserModel = require('./models/user.model')
const router = express.Router();

/**
 * POST route for User creation.
 */
router.post('/user', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request Body is missing!');
    }

    const model = new UserModel(req.body);
    model.save().then(doc => {
        if (!doc || doc.length === 0) {
            return res.status(500).send(doc);
        }
        res.status(201).send(doc);
    }).catch(err => {
        res.status(500).json(err);
    });
});

/**
 * GET route for User retrivial.
 */
router.get('/user', (req, res) => {
    if (!req.query.email) {
        return res.status(400).send('Missing paramater: email');
    }

    UserModel.findOne({
        email: req.query.email
    }).then(doc => {
        res.json(doc);
    }).catch(err => {
        res.status(500).json(err);
    });

});

/**
 * PATCH route for User update.
 */
router.patch('/user', (req, res) => {
    if (!req.query.email) {
        return res.status(400).send('Missing paramater: email');
    }

    UserModel.findOneAndUpdate({
        email: req.query.email
    }, {
        $set: {
            username: req.query.username
        },
    }, {
        new: true
    }).then(doc => {
        res.json(doc);
    }).catch(err => {
        res.status(500).json(err);
    });

});

module.exports = router;