const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const hostname = '127.0.0.1';
const port = 3000;

const User = require('./schema/user');

const app = express();
mongoose.Promise = Promise;
let x;
mongoose.connect('mongodb://localhost:27017/carhabty').then((re) => x=re);

app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
    const {email, password} = req.body;
    User.insertMany({email: email, password: password})
});

app.post('/api/login', async (req, resp) => {
    const {email, password} = req.body;
    console.log(req);
    const res = await User.findOne({email, password});
    if(!res) {
        // invalid login 
        console.log('incorrect');
    } else {
        console.log(res);
    }
    resp.send(req.route);
});

app.listen(port, hostname, () => {
    console.log('server is running...');
});