const router = require('express').Router();

const createHttpError = require('http-errors');
const authRouter = require('./authorization');

const userRouter = require('./users');

router.use('/', authRouter);

router.use('/users', userRouter);

router.use((req, res, next) => {
  next(createHttpError(404, 'Страница не найдена.'));
});

module.exports = router;
