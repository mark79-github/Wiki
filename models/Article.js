const mongoose = require('mongoose');
const {constants} = require('../config/constants');

// •	Title - string (required), unique, min 5 characters
// •	Description - string (required), min 20 characters
// •	Article Author - a User (ObjectId)
// •	Creation Date – Date (default now)


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: constants.USERNAME_MIN_LENGTH,
    },
    description: {
        type: String,
        required: true,
        minlength: constants.DESCRIPTION_MIN_LENGTH,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    creationDate: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Article', articleSchema);