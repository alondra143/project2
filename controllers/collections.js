const User = require('../models/user');
const Collection = require('../models/collection')

module.exports = {
    create,
}
function create(req, res) {
    const collection = new Collection(req.body)
    collection.userId = req.user._id;
    collection.userName = req.user.name;
    console.log(collection);
 res.redirect('/crystals')
};
    // find the user document we want to add the collection to (req.user)?
    // we want to push the user's id into the belongsTo property of the crystal collection