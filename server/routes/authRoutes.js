const { loginUser } = require('../controller/authController');

const router = require('express').Router();

router.post('/login', loginUser);

module.exports = router;
