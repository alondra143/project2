var router = require('express').Router();
const crystalCtrl = require('../controllers/crystals');

router.get('/crystals', crystalCtrl.index);



module.exports = router;