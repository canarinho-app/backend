const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
    
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(userRoute);

app.listen(3001, () => console.log("Server has started on port 3001."))