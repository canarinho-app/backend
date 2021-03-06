const express = require('express');
const path = require('path')
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const multer = require('multer');
const UserModel = db.User;
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


/**
 * POST route for User creation.
 */
router.post('/user', async function (req, res) {
    if (!req.body) {
        return res.status(400).send('Request Body is missing!');
    }


    if(!req.body.password === null || req.body.password === ''){
        return res.status(400).send('Invalid Password!')
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    const containsUsername = await findUserByUsername(req.body.username);
    const containsEmail = await findUserByEmail(req.body.email);

    if (containsUsername) {
        return res.status(400).json({ message: 'Username already in use.' });
    } else if (containsEmail) {
        return res.status(400).json({ message: 'Email already in use.' });
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
 * Verify if a user already exists with the given username.
 * @param {String} username 
 */
async function findUserByUsername(username) {
    try {
        return UserModel.findOne({ username: username })
    } catch (error) {
        throw new Error(`Unable to connect to the database.`)
    }
}

/**
 * Verify if a user already exists with the given email.
 * @param {String} email 
 */
async function findUserByEmail(email) {
    try {
        return UserModel.findOne({ email: email })
    } catch (error) {
        throw new Error(`Unable to connect to the database.`)
    }
}

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
 * GET route for Users retrivial.
 */

router.get('/users', (req, res) => {
    if (!req.query.username) {
        return res.status(400).send('Missing paramater: username');
    }

    UserModel.find({
        username: {$regex: [req.query.username]}
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
            $addToSet: { tweets: req.body.tweets, following: req.body.following, followers: req.body.followers }
        }, {
            new: true, runValidators: true
        }).then(doc => {
            res.json(doc);
        }).catch(err => {
            res.status(500).json(err);
        });
});


router.patch('/user/profile', (req, res) => {
    if (!req.query.username) {
        return res.status(400).send('Missing paramater: username');
    }

    if(!req.body.userData.password === null || req.body.userData.password === ''){
        return res.status(400).send('Invalid Password!')
    }

    console.log(req.body.userData)

    req.body.userUpdate.password = bcrypt.hashSync(req.body.userUpdate.password, 10);

    UserModel.findOneAndUpdate(
        
        { username: req.query.username }, {
            $set: { displayname: req.body.userUpdate.displayname , bio: req.body.userUpdate.bio, password: req.body.userUpdate.password}
        }, {
            new: true, runValidators: true
        }).then(doc => {
            res.json(doc);
            console.log(doc)
        }).catch(err => {
            res.status(500).json(err);
        });
});

/**
 * PATCH route for User authentication.
 */
router.post('/authenticate', (req, res) => {
    UserModel.findOne({ username: req.body.user.username })
        .then(user => {
            if (user && bcrypt.compareSync(req.body.user.password, user.password)) {
                res.json(user);
            }
            else {
                res.status(400).json({ message: 'Username or password is incorrect.' });
            }
        }).catch(err => next(err));
});


router.post('/user/profileImg', upload.single('imageData'), (req, res) => {
    const imagePath = req.file.filename;

    if (imagePath) {
        res.json(imagePath);
    }
    else {
        res.status(500).json({ message: 'Error connecting to database.' });
    }
});

router.get('/userId', (req, res) => {
    if (!req.query.id) {
        return res.status(400).send('Missing paramater: id');
    }

    UserModel.findById(
        req.query.id
    ).then(doc => {
        res.json(doc);
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;
