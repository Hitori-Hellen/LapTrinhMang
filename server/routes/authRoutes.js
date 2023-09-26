const router = require('express').Router()
const ctrl = require('../controllers/authController')

router.post('/register', ctrl.register);
router.get('/login', ctrl.login);

module.exports = router