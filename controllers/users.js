const User = require('../models/user');

const NOT_FOUND = 404;
const VALIDATION_ERROR = 400;
const DEFAULT_ERROR = 500;

const handleUser = (user, res) => {
  if (user) {
    res.send({ data: user });
  } else { res.status(NOT_FOUND).send({ message: 'Пользователь не найден' }); }
};

const handleErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(VALIDATION_ERROR).send({ message: `Ошибка в параметрах запроса ${err.message}` });
  } else {
    res.status(DEFAULT_ERROR).send({ message: `Упс, что-то пошло не так, обратитесь к администраторам ${err}` });
  }
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
    .then((user) => res.send({ data: user }))
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
