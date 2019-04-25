const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config.json');
const db = require('../_helpers/db')
const UserModel = db.User;
const router = express.Router();

/**
 * POST route for User creation.
 */
router.post('/user', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request Body is missing!');
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
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
    if (!req.query.username) {
        return res.status(400).send('Missing paramater: username');
    }

    UserModel.findOne({
        username: req.query.username
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
    if (!req.query.username) {
        return res.status(400).send('Missing paramater: username');
    }

    UserModel.findOneAndUpdate(
        { username: req.query.username }, {
            $set: { displayname: req.body.displayname },
        }, {
            new: true, runValidators: true
        }).then(doc => {
            res.json(doc);
        }).catch(err => {
            res.status(500).json(err);
        });
});

/**
 * PATCH route for User authentication.
 */
router.post('/authenticate', (req, res) => {
    UserModel.findOne({ email: req.body.email })
        .then(user => {
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                res.json(user);
            }
            else {
                res.status(400).json({ message: 'Username or password is incorrect.' })
            }
        }).catch(err => next(err));
});

module.exports = router;