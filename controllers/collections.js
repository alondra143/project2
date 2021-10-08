const Crystal = require('../models/crystal');
const Collection = require('../models/collection')

module.exports = {
    create,
    index,
    show,
    edit,
    update,
    delete: deleteCollection,
    removeFromCollection,
}

async function removeFromCollection(req, res) {
    try {
        // find the collection we're removing a crystal from
        const collectionDoc = await Collection.findById(req.params.collectionId)
        // remove the crystal by the id    
        collectionDoc.crystalsAdded.remove(req.params.crystalId);
            collectionDoc.save(function(err) {
                res.redirect(`/collections/${collectionDoc._id}/edit`)
            })
    } catch(err) {
        res.send(err);
    }
}

function edit(req, res) {
    Collection.findById(req.params.id)
                .populate('crystalsAdded')
                .exec(function(err, collection) {
        // if user is not the owner, redirect to login
        if(!collection.userId.equals(req.user._id)) {
            res.redirect('/');
        } else {
            res.render('collections/edit', {collection});
        }
    })
}

async function update(req, res) {
    try {
        const collection = await Collection.findById(req.params.id)
                if(!collection.userId.equals(req.user._id)) {
                    res.redirect('/');
                } else {
                    collection.name = req.body.name;
                    collection.save(function(err) {
                        res.render('collections/show', {
                            collection
                        })
                    })
                }
    }catch(err) {
        res.send(err)
    }
    }

async function deleteCollection(req, res) {
    try {
        const collection = await Collection.findById(req.params.id)
            if(!collection.userId.equals(req.user._id)) {
                res.redirect('/');
            } else {
                collection.remove();
                collection.save(function(err) {
                    res.redirect(`/crystals/${req.user._id}/collections`);
                })
            }
    } catch(err) {
        res.send(err)
    }
    
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
    if (req.user === undefined) {
        res.redirect('/');
    }
    try {
        // find collections that have the same user ID as the user logged in
        const collections = await Collection.find({userId: req.user._id});
        res.render('collections/index', {
            collections, title: 's crystAl clusteR',
        })
    } catch(err) {
        res.send(err);
    }
}

async function show(req, res) {
    try {
        const collection = await Collection.findById(req.params.id)
                                            .populate('crystalsAdded')
        res.render('collections/show', {
            collection})
    } catch(err) {
        res.send(err);
    }
}