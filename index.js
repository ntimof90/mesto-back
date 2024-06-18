const express = require('express');

const { default: mongoose } = require('mongoose');


const { errors } = require('celebrate');

const cors = require('cors');

const errorHandler = require('./middlewares/error-handler');

const { PORT } = require('./config');

const router = require('./routes');

const { logger, errorLogger } = require('./middlewares/logger');

const server = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  family: 4,
});

server.listen(PORT);

server.use(cors({
  origin: 'http://localhost:3000'
}));

server.use(express.json());

server.use(logger);

server.get('/error', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет.');
  }, 0);
});

server.use(router);

server.use(errorLogger);

server.use(errors());

server.use(errorHandler);
