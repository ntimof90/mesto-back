const winston = require('winston');

const expressWinston = require('express-winston');

module.exports = {
  logger: expressWinston.logger({
    transports: [new winston.transports.File({ filename: 'request.log' })],
    format: winston.format.json(),
  }),
  errorLogger: expressWinston.errorLogger({
    transports: [new winston.transports.File({ filename: 'error.log' })],
    format: winston.format.json(),
  }),
};
