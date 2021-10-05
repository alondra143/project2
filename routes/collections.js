var router = require('express').Router();
const collectionCtrl = require('../controllers/collections');


router.get('/collections/:id', collectionCtrl.show);
router.get('/collections/:id/edit', collectionCtrl.edit);
router.put('/collections/:id', collectionCtrl.update);
router.delete('/collections/:id', collectionCtrl.delete);
router.post('/crystals/:id/collection', collectionCtrl.create);
router.get('/crystals/:id/collections', collectionCtrl.index);


module.exports = router;