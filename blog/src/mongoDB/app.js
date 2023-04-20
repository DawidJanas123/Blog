const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const uri = "";

mongoose.connect(uri);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(express.json());

app.use('/blog', routes);

app.listen(8080, () => {
    console.log('Server started at 8080 port');
})
