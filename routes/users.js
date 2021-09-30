var router = require('express').Router();
var usersCtrl = require('../controllers/users');

router.get('/cc', usersCtrl.index);




// USE THIS FOR ADDING CRYSTAL TO COLLECTION, MAYBE POSTING OR DELETING REVIEWS
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) return next();
//     res.redirect('/auth/google');
// }


module.exports = router;