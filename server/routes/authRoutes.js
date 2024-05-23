const { loginUser, signUpUser } = require('../controller/authController');

const router = require('express').Router();

router.post('/login', loginUser);
router.post('/signup', signUpUser);

module.exports = router;
