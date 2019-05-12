const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const contentRoute = require('./routes/content');
const commentRoute = require('./routes/comment');
const tweetRoute = require('./routes/tweet');


app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use('/uploads', express.static((path.join(__dirname, 'uploads'))));

// Routes
app.use(userRoute);
app.use(contentRoute);
app.use(commentRoute);
app.use(tweetRoute);

app.listen(3001, () => console.log("Server has started on port 3001."))
