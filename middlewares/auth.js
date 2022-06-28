const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError('Необходимо авторизоваться');
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, 'super_secret_key');
  } catch (err) {
    throw new UnauthorizedError('Необходимо авторизоваться');
  }

  req.user = payload;

  next();
};
