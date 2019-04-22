const express = require('express');
const ContentModel = require('../models/content.model')
const router = express.Router();


router.post('/content', (req,res) => {
    if(!req.body){
        return res.status(400).send('Request Body is missing!');
    }

    const content = new ContentModel(req.body);
    model.save().then(doc => {
        if( !doc || doc.length == 0) {
            return res.status(500).send(doc);
        }
        res.status(201).send(doc);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.get('/content', (req,res) => {
    if(!req.query.id){
        return res.status(400).send("Missing query: id");
    }

    ContentModel.findOne({
        id: req.query.id
    }).then(doc =>{
        res.json(doc);
    }).catch(err =>{
        res.status(404).json(err);
    });
});


router.delete('/content', (req,res) => { 
    if( !req.body.id ){
        return res.status(400).send("Missing parameter: id");
    }

    ContentModel.findByIdAndRemove({
        id: req.body.id
    }).then( doc => {
        res.json(doc);
    }).catch(err => {
        res.status(404).json(err);
    });
});


module.exports = router;
