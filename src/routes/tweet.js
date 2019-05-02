const express = require('express');
const config = require('config.json');
const db = require('../_helpers/db')
const TweetModel = db.Tweet;
const router = express.Router();

router.post("/tweet", (req,res) => {
    if(!req.body){
        return res.status(400).send("Request body is missing!");
    }

    const model = new TweetModel(req.body);
    model.save().then(doc =>{
        if(!doc || doc.length === 0){
            return res.status(500).send(doc);
        }
        res.status(201).send(doc);
    }).catch(err => {
        res.status(500).json(err);
    });
});


router.get('/tweet', (req,res) => {
    if(!req.query.id){
        return res.status(400).send("Missing parameter: id");
    }

    TweetModel.findOne({
        id: req.query.id
    }).then( doc =>{
        res.json(doc);
    }).catch(err =>{
        res.status(500).json(err);
    });
});


router.delete('/tweet', (req,res) => {
    if(!req.body.id){
        return res.status(400).send("Missing parameter: id");
    }

    TweetModel.findByIdAndRemove({
        id: req.body.id
    }).then( doc => {
        res.json(doc);
    }).catch(err => {
        res.status(500).json(err);
    })
});

module.exports = router;
