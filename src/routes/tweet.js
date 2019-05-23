const express = require('express');
const config = require('config.json');
const db = require('../_helpers/db')
const TweetModel = db.Tweet;
const router = express.Router();

router.post("/tweet", (req, res) => {
    if (!req.body) {
        return res.status(400).send("Request body is missing!");
    }

    const model = new TweetModel(req.body);
    model.save().then(doc => {
        if (!doc || doc.length === 0) {
            return res.status(500).send(doc);
        }
        res.status(201).send(doc);
    }).catch(err => {
        res.status(500).json(err);
    });
});


router.get('/tweet', (req, res) => {
    if (!req.query.id) {
        return res.status(400).send("Missing parameter: id");
    }

    TweetModel.findOne({
        id: req.query.id
    }).then(doc => {
        res.json(doc);
    }).catch(err => {
        res.status(500).json(err);
    });
});


router.delete('/tweet', (req, res) => {
    if (!req.body.id) {
        return res.status(400).send("Missing parameter: id");
    }

    TweetModel.findByIdAndRemove({
        id: req.body.id
    }).then(doc => {
        res.json(doc);
    }).catch(err => {
        res.status(500).json(err);
    })
});


/**
 * PATCH route for Tweet, updating likes and comments.
 */
router.patch('/tweet', (req, res) => {
    if (!req.query.id) {
        return res.status(400).send('Missing paramater: id');
    }
    
    TweetModel.findOneAndUpdate(
        { id: req.query.id }, {
            $addToSet: { likes: req.body.likes, comments: req.body.comments }
        }, {
            new: true, runValidators: true
        }).then(doc => {
            res.json(doc);
        }).catch(err => {
            res.status(500).json(err);
        });
});

/**
 * PATCH route for Tweet, updating likes and comments.
 */
router.patch('/tweet/delete', (req, res) => {
    if (!req.query.id) {
        return res.status(400).send('Missing paramater: id');
    }
    
    TweetModel.findOneAndUpdate(
        { id: req.query.id }, {
            $pull: { likes: req.body.likes[0] }
        }, {
           new: true, runValidators: true
        }).then(doc => {
            res.json(doc);
        }).catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
