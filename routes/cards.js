const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { URL_REGEX } = require('../helpers/constants');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line prefer-regex-literals
    link: Joi.string().required().pattern(new RegExp(URL_REGEX)),
  }),
}), createCard);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), deleteCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = router;
