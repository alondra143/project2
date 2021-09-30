const Crystal = require('../models/crystal');

module.exports = {
    index,
}

function index (req, res) {
    res.render('crystals/home');
}