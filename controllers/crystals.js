const Crystal = require('../models/crystal');
const Collection = require('../models/collection')

module.exports = {
    index,
    new: newCrystal,
    create,
    show,
    addUser,
};

async function addUser(req, res) {
    console.log(req.body, 'this is req.body');
    try {
        const crystal = await Crystal.findById(req.params.id, function(err, crystalDoc) {
            if (crystal.usersAddedToCollection.id(req.user._id)) return res.redirect('/crystals/');
            crystal.usersAddedToCollection.push(crystalDoc);
            crystal.save()
        })
        const collections = await Collection.find({userId: req.user._id});
        res.render('crystals/show', {
            collections
        });
    } catch(err) {
        res.send(err);
    }
}

function index(req, res) {
    Crystal.find({}, function(err, crystalDocuments){
        res.render('crystals/home', {
            crystals: crystalDocuments,
        });
    });
};

function newCrystal(req,res) {
    res.render('crystals/new', {
        title: 'New Crystal',
    });
};

function create(req,res) {
    console.log(req.body)
    Crystal.create(req.body, function(err, createdCrystal) {
        if(err) {
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
        res.render('crystals/show', {
            title: 'MORE ABOUT: ', crystal
     });
    } catch(err) {
        console.log(err);
    }
};