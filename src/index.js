const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');

app.use(bodyParser.json());
app.use(userRoute);

app.listen(3000, () => console.log("Server has started on port 3000."));