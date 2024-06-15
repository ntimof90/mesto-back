require('dotenv').config();

const { PORT = 3000, JWT_SECRET = 'secret-code' } = process.env;

const errCodes = {
  validation: 400,
  auth: 401,
  notFound: 404,
  dublicatDb: 409,
  default: 500,
};

const mongoDublicatErrorCode = 11000;

const errors = {
  invalidUser: [
    errCodes.validation,
    'Переданы некорректные данные при создании пользователя.',
  ],
  invalidProfile: [
    errCodes.validation,
    'Переданы некорректные данные при обновлении профиля.',
  ],
  invalidAvatar: [
    errCodes.validation,
    'Переданы некорректные данные при обновлении аватара.',
  ],
  unauth: [errCodes.auth, 'Ошибка авторизации.'],
  unfoundUser: [errCodes.notFound, 'Пользователь по указанному _id не найден.'],
  dublicatUser: [
    errCodes.dublicatDb,
    'Пользователь с таким email уже существует.',
  ],
};

module.exports = {
  PORT,
  JWT_SECRET,
  errors,
  mongoDublicatErrorCode
};
