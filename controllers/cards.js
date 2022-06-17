const Card = require('../models/card');
const { NOT_FOUND, handleErrors } = require('../utils/utils');

const handleCardNotFound = (res) => {
  res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => { handleErrors(err, res); });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => { handleErrors(err, res); });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ message: 'Карточка успешно удалена' });
      } else {
        handleCardNotFound(res);
      }
    })
    .catch((err) => { handleErrors(err, res); });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        handleCardNotFound(res);
      }
    })
    .catch((err) => { handleErrors(err, res); });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        handleCardNotFound(res);
      }
    })
    .catch((err) => { handleErrors(err, res); });
};
