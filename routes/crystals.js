var router = require('express').Router();
const crystalCtrl = require('../controllers/crystals');

router.get('/crystals', crystalCtrl.index);
router.get('/crystals/new', isLoggedIn, crystalCtrl.new); // will delete later, using to input data into db
router.post('/crystals', isLoggedIn, crystalCtrl.create);// will delete later, using to input data into db
router.get('/crystals/:id', crystalCtrl.show);
// router.post('/crystals/:id', crystalCtrl.addUser);
router.post('/crystals/:id', isLoggedIn, crystalCtrl.addToCollection);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;