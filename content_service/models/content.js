const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    userId: {
        type: String,
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

    contentCategory: {
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
    },

    likes: {
        type: Number,
        required: true,
        default: 0
    },

    likedByUsers: {
        type: Array,
        required: true,
        default: []
    },
    
    rating: {
        type: mongoose.Types.Decimal128,
        required: true,
        default: 0.0
    }, 

    productLink: {
        type: String,
        required: true
    },

    lengthOfUse: {
        type: String,
        required: true 
    }

});

module.exports = mongoose.model('Content', contentSchema);