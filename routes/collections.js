var router = require('express').Router();
const collectionCtrl = require('../controllers/collections');

router.get('/collections/:id', collectionCtrl.show);
router.post('/crystals/:id/collection', collectionCtrl.create);
router.get('/crystals/:id/collections', collectionCtrl.index);


module.exports = router;