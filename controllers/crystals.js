const Crystal = require('../models/crystal');
const Collection = require('../models/collection')
const User = require('../models/user');

module.exports = {
    index,
    new: newCrystal,
    create,
    show,
    addUser,
};

function addUser(req, res) {
    console.log(req.body, 'this is req.body');
    console.log(req.params, 'this is req.params');
    Crystal.findById(req.params.id, function(err, crystal) {
        let foundUser = false;
        let userString = req.user._id.toString(); // iterate thru usersAddedToCollection array and make it a string
        for(let i = 0; i < crystal.usersAddedToCollection.length; i++) {
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
            crystal.save(function(err) {
                console.log('user added to crystal');
                // Collection.find({userId: req.user._id}, function(err, collections) {
                //     res.render('crystals/show', {
                //         collections,
                //     });
                // });
                res.redirect(`/crystals/${req.params.id}`);
            })
        }
    })
    // try {
    //     const crystal = await Crystal.findById(req.params.id, function(err, crystalDoc) {
    //         console.log('this is my crystal');
    //         if (crystalDoc.usersAddedToCollection.id(req.user._id)) {
    //             res.redirect('crystals/');
    //             console.log('we redirected');
    //         } else {
    //             crystalDoc.usersAddedToCollection.push(crystalDoc);
    //             crystalDoc.save()
    //             console.log('this was successfully added')
    //         }
    //     })
    //     console.log(res.locals.user, 'res.locals.user possible user');
    //     const collections = await Collection.find({userId: res.locals.user});
    //     res.render('crystals/show', {
    //         collections
    //     });
    // } catch(err) {
    //     res.send(err);
    // }
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
        const collections = await Collection.find({userId: req.user._id})
        res.render('crystals/show', {
            title: 'MORE ABOUT: ', crystal, collections,
     });
     console.log(crystal);
    } catch(err) {
        console.log(err);
    }
};