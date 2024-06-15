const router = require('express').Router();

const { signUp, signIn } = require('../controllers/users');

const validator = require('../middlewares/validator');

router.post('/signup', validator.auth, signUp);

router.post('/signin', validator.auth, signIn);

module.exports = router;