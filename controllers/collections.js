const Crystal = require('../models/crystal');
const Collection = require('../models/collection')

module.exports = {
    create,
    index,
    show,
}




// function addUser(req, res) {
//     // find the crystal to add to a collection
//     Crystal.findById(req.params.id, function(err, crystal) {
//         // if the crystal already has the user's id in it's addedToCollection, redirect
//         if(crystal.usersAddedToCollection.id(req.user._id)) return res.redirect('/crystals');
//         // add user to crystals's addedToCollection array
//         crystal.usersAddedToCollection.push(req.user._id);
//         // save to database
//         crystal.save(function(err) {
//             res.redirect(`/crystals/${crystal._id}`);
//         });
//     });
// };


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