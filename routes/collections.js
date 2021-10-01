var router = require('express').Router();
const collectionCtrl = require('../controllers/collections');

router.post('/crystals/:id/collections', collectionCtrl.create);


module.exports = router;