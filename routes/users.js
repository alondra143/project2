var router = require('express').Router();
var usersCtrl = require('../controllers/users');

router.get('/login', usersCtrl.index);



module.exports = router;