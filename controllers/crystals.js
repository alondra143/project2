const Crystal = require('../models/crystal');

module.exports = {
    index,
    new: newCrystal,
    create,
    show,
};

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
        console.log(crystal, 'lets see');
        res.render('crystals/show', {
            title: 'MORE ABOUT: ', crystal
     });
    } catch(err) {
        console.log(err);
    }
};