const Crystal = require('../models/crystal');
const Collection = require('../models/collection')
const User = require('../models/user');

module.exports = {
    index,
    new: newCrystal,
    create,
    show,
    addToCollection,
};

function addToCollection(req, res) {
    // 1. find the collection user chose to add crystal to
    Collection.findById(req.body.collectionId, function(err, collection) {
        // 2. add crystal id into the crystalsAdded array of collection Schema
        collection.crystalsAdded.push(req.params.id);
        // 3. save to update database
        collection.save(function(e){
            // 4. take user back to the crystal's page if successful
            res.redirect(`/crystals/${req.params.id}`);
        })
    })
}

function index(req, res) {
    Crystal.find({}, function (err, crystalDocuments) {
        res.render('crystals/home', {
            crystals: crystalDocuments,
        });
    });
    if (req.user === undefined) {
        res.redirect('/');
    }
};

function newCrystal(req, res) {
    if (req.user === undefined) {
        res.redirect('/');
    } else {
        res.render('crystals/new', {
        title: 'New Crystal',
        });
    }
};

function create(req, res) {
    // change crystal name to all lowercase
    const n = req.body.name;
    req.body.name = n.toLowerCase();
    if (req.user === undefined) {
        res.redirect('/');
    } else {
        Crystal.create(req.body, function (err, createdCrystal) {
            if (err) {
                return res.redirect('/crystals/new');
            };
            // add user's id to userCreated property
            createdCrystal.userCreated = req.user._id;
            // save to update database
            createdCrystal.save(function(err) {
                // take user to view all crystals
                res.redirect('/crystals')
            })
        });
    }
};

async function show(req, res) {
    if (req.user === undefined) {
        res.redirect('/');
    }
    try {
        // find crystal to show
        const crystal = await Crystal.findById(req.params.id)
                                    .populate('userCreated');
        // only show user collections that crystal has not already been added to, if any
        const collections = await Collection.find({ userId: req.user._id, crystalsAdded: {$nin: req.params.id}})
        res.render('crystals/show', {
            title: 'more about: ', crystal, collections,
        });
    } catch (err) {
        res.send(err);
    }
};
