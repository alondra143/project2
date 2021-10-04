const Crystal = require('../models/crystal');
const Collection = require('../models/collection')
const User = require('../models/user');

module.exports = {
    index,
    new: newCrystal,
    create,
    show,
    addUser,
    addToCollection,
};

function addToCollection(req, res) {

}

function addUser(req, res) {
    console.log(req.body, 'this is req.body (collection)');
    console.log(req.params, 'this is req.params (crystal)');
    Collection.findById(req.body.collectionId, function (err, collection) {
        Crystal.findById(req.params.id, function (err, crystal) {
            let foundUser = false;
            let userString = req.user._id.toString(); // iterate thru usersAddedToCollection array and make it a string
            for (let i = 0; i < crystal.usersAddedToCollection.length; i++) {
                let tempId = crystal.usersAddedToCollection[i].toString();
                if (userString == tempId) {
                    foundUser = true;
                    break
                }
            }
            if (foundUser) {
                console.log(' we redirected')
                res.redirect('/crystals')
            } else {
                crystal.usersAddedToCollection.push(req.user._id);
                collection.crystalsAdded.push(req.params.id)
                collection.save(function (e) {
                    crystal.save(function (err) {
                        console.log('user added to crystal');
                        res.redirect(`/crystals/${req.params.id}`);
                    })
                })
            }
        })
    })
}

function index(req, res) {
    Crystal.find({}, function (err, crystalDocuments) {
        res.render('crystals/home', {
            crystals: crystalDocuments,
        });
    });
};

function newCrystal(req, res) {
    res.render('crystals/new', {
        title: 'New Crystal',
    });
};

function create(req, res) {
    console.log(req.body)
    Crystal.create(req.body, function (err, createdCrystal) {
        if (err) {
            console.log(err);
            return res.redirect('/crystals/new');
        };
        console.log(createdCrystal, '< crystal added by user');
        res.redirect('/crystals')
    });
};

async function show(req, res) {
    try {
        const crystal = await Crystal.findById(req.params.id)
        const collections = await Collection.find({ userId: req.user._id })
        res.render('crystals/show', {
            title: 'MORE ABOUT: ', crystal, collections,
        });
        console.log(crystal);
    } catch (err) {
        console.log(err);
    }
};