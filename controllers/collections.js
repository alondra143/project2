const Crystal = require('../models/crystal');
const Collection = require('../models/collection')

module.exports = {
    create,
    index,
    show,
}

function create(req, res) {
    const collection = new Collection(req.body)
    collection.userId = req.user._id;
    collection.userName = req.user.name;
    collection.save(function(err) {
        if(err) console.log(err)
    })
    console.log(collection);
 res.redirect('/crystals')
};


async function index(req, res) {
    try {
        const collections = await Collection.find({userId: req.user._id});
        res.render('collections/index', {
            collections, title: 's Crystal Cluster',
        })
        console.log(collections);
    } catch(err) {
        res.send(err);
    }
}

async function show(req, res) {
    try {
        const collection = await Collection.findById(req.params.id);
        res.render('collections/show', {
            collection})
    } catch(err) {
        res.send(err);
    }
}