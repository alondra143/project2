const mongoose = require('mongoose');

// Create your User Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
})
// dont forget to include googleId on userSchema


module.exports = mongoose.model('User', userSchema)