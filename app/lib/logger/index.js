const winston = require("winston");
const expressWinston = require("express-winston");

const format = logEntry => {
  return JSON.stringify(logEntry);
};

function middleware(req, res, next) {
  req.executed = 123;
  next();
}

/*exports.myFormat = winston.format.printf(logEntry => {
  return JSON.stringify(logEntry);
});
console.log("exports.myFormat: ", exports.myFormat);*/
/*
module.exports = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    //exports.myFormat
    winston.format.printf(format)
  )
});
*/
module.exports = {
  format,
  middleware
};
