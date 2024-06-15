const router = require('express').Router();

const auth = require('../middlewares/auth');

const validator = require('../middlewares/validator');

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.use(auth);

router.get('/', getUsers);

router.get('/:id', validator.getUserById, getUserById);

router.patch('/me', validator.updateProfile, updateProfile);

router.patch('/me/avatar', validator.updateAvatar, updateAvatar);

module.exports = router;
