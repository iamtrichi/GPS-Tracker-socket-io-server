const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    urlPhoto: {type: String, default: ''}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;