var router = require('express').Router();
const crystalCtrl = require('../controllers/crystals');

router.get('/crystals', crystalCtrl.index);
router.get('/crystals/new', crystalCtrl.new);
router.post('/crystals', crystalCtrl.create);
router.get('/crystals/:id', crystalCtrl.show);
router.post('/crystals/:id', crystalCtrl.addUser);


module.exports = router;