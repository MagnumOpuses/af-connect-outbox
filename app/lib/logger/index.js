const winston = require("winston");
const expressWinston = require("express-winston");

exports.format = logEntry => JSON.stringify(logEntry);

exports.middleware = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.printf(exports.format)
  )
});
