const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { INTERNAL_SERVER_ERROR } = require('./errors/error-constunts');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().trim().min(2).max(30),
    about: Joi.string().trim().min(2).max(30),
    // eslint-disable-next-line prefer-regex-literals
    avatar: Joi.string().required().pattern(new RegExp(/^((https?):\/\/)(www.)?[a-z0-9-]+\.[a-z]+[a-z0-9/\-._~:?#[\]@!$&='()*+,;]+#?$/i)),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
}), login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errors());

app.use(() => {
  throw new NotFoundError('Запрашиваемый роут не найден');
});

// eslint-disable-next-line no-unused-vars,consistent-return
app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(INTERNAL_SERVER_ERROR).send({ message: 'Что-то пошло не так' });
});

app.listen(PORT);
