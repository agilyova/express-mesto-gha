const User = require('../models/user');
const { NOT_FOUND, handleErrors } = require('../utils/utils');

const handleUser = (user, res) => {
  if (user) {
    res.send({ data: user });
  } else { res.status(NOT_FOUND).send({ message: 'Пользователь не найден' }); }
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => { handleErrors(err, res); });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => { handleUser(user, res); })
    .catch((err) => { handleErrors(err, res); });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => { handleErrors(err, res); });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => { handleUser(user, res); })
    .catch((err) => { handleErrors(err, res); });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => { handleUser(user, res); })
    .catch((err) => { handleErrors(err, res); });
};
