var router = require('express').Router();
const collectionCtrl = require('../controllers/collections');

// show specific user's specific collection
router.get('/collections/:id', collectionCtrl.show);
// click to view form to edit a specific collection
router.get('/collections/:id/edit', collectionCtrl.edit);
// show form and update specific collectioj
router.put('/collections/:id', collectionCtrl.update);
// delete specific collection
router.delete('/collections/:id', collectionCtrl.delete);
// delete specific crystal from specific collection
router.delete('/collections/:collectionId/crystals/:crystalId', collectionCtrl.removeFromCollection);
// create new collection
router.post('/crystals/:id/collection', isLoggedIn, collectionCtrl.create);
router.get('/crystals/:id/collections', isLoggedIn, collectionCtrl.index);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}
module.exports = router;