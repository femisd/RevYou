const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    contentTitle: {
        type: String,
        required: true
    },

    contentBody: {
        type: String,
        required: true
    },

    imageLink: {
        type: String,
        required: false
    },

    postDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Content', contentSchema);