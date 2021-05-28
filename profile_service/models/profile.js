const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    userBio: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Profile', profileSchema);