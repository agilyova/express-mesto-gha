const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser, getUsers, getUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30),
    about: Joi.string().trim().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line prefer-regex-literals
    avatar: Joi.string().required().pattern(new RegExp(/^((https?):\/\/)(www.)?[a-z0-9-]+\.[a-z]+[a-z0-9/\-._~:?#[\]@!$&='()*+,;]+#?$/i)),
  }),
}), updateUserAvatar);

module.exports = router;
