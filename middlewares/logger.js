const { level, info } = require("winston");
const logger = require("../utils/logger");

const loggerMiddleware = (req, res, next) => {
  // if level is error, log to error.log
  // if level is info, log to combined.log
  if (level === "error") {
    logger.error()
  }
  if (level === "info") {
    logger.info(req.url);
  }

  next();
};

module.exports = loggerMiddleware;
