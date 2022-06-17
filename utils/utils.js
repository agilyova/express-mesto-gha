module.exports.NOT_FOUND = 404;
const VALIDATION_ERROR = 400;
const DEFAULT_ERROR = 500;

module.exports.handleErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(VALIDATION_ERROR).send({ message: `Ошибка в параметрах запроса ${err.message}` });
  } else {
    res.status(DEFAULT_ERROR).send({ message: `Упс, что-то пошло не так, обратитесь к администраторам ${err}` });
  }
};
