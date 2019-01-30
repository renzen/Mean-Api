import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
var cors = require('cors');

const app = express();
const PORT = 3000;
const api = require('./routes/api');


app.use(cors());
// this bit !
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use('/api', api);

const dbpath = "mongodb://localhost/ANGULARAUTH";

const mongo = mongoose.connect(dbpath, {useNewUrlParser: true});
mongo.then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log('err', err);
});

app.get('/', function (req, res) {
    res.send('Hello from server')
})


app.listen(PORT, function() {
    console.log ('Server is running on localhost:' + PORT)
})