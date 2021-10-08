var router = require('express').Router();
const crystalCtrl = require('../controllers/crystals');

// view all crystals
router.get('/crystals', crystalCtrl.index);

// user may click to view form and create a crystal
router.get('/crystals/new', isLoggedIn, crystalCtrl.new);

// user may create new crystal
router.post('/crystals', isLoggedIn, crystalCtrl.create);

// view a specific crystal
router.get('/crystals/:id', crystalCtrl.show);

// user may add a crystal to a created collection
router.post('/crystals/:id', isLoggedIn, crystalCtrl.addToCollection);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;