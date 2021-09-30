const mongoose = require('mongoose');

// user has many crystals, crystal belongs to many users
const crystalSchema = new mongoose.Schema({
    name: String,
    color: String,
    description: String,
    image: String,
    usersAddedToCollection: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('Crystal', crystalSchema)