const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const contentRoute = require('./routes/content')
const commentRoute = require('./routes/comment')
const tweetRoute = require('./routes/tweet')


app.use(bodyParser.json());
app.use(userRoute);
app.use(contentRoute);
app.use(commentRoute);
app.use(tweetRoute);

app.listen(3001, () => console.log("Server has started on port 3000."));
