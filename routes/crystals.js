var router = require('express').Router();
const crystalCtrl = require('../controllers/crystals');

router.get('/crystals', crystalCtrl.index);
router.get('/crystals/new', crystalCtrl.new); // will delete later, using to input data into db
router.post('/crystals', crystalCtrl.create);// will delete later, using to input data into db
router.get('/crystals/:id', crystalCtrl.show);
router.post('/crystals/:id', crystalCtrl.addUser);
router.post('/crystals/:id', crystalCtrl.addToCollection);

module.exports = router;