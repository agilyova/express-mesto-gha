const router = require('express').Router();
const {
  createUser, updateUser, getUsers, getUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me/avatar', updateUserAvatar);
router.patch('/me', updateUser);

module.exports = router;
