const mongoose = require('mongoose');

// one collection has many crystals
// user has many collections, a collection belongs to a user
const collectionSchema = new mongoose.Schema({
    name: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    crystalsAdded: [{type: mongoose.Schema.Types.ObjectId, ref: 'Crystal'}]
});

// Create your User Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
})
// dont forget to include googleId on userSchema


module.exports = mongoose.model('User', userSchema)