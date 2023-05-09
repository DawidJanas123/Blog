const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/mongoDB/routes/routes');
const cors = require('cors');
require('dotenv').config();

const uri = `${process.env.REACT_APP_URI}`;

mongoose.connect(uri);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(cors());

app.use(express.json());

app.use('/blog', routes);

app.listen(8080, () => {
    console.log('Server started at 8080 port');
})
