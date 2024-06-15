const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const createHttpError = require('http-errors');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw createHttpError(401, 'Ошибка авторизации.');
    }
    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET);
    req.me = payload;
    return next();
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return next(createHttpError(401, 'Ошибка авторизации.'))
    }
    return next(e);
  }
}