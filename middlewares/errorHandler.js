const logger = require("../utils/logger");
const error = require("../utils/error");

const handler = (err, req, res, next) => {

  const newError = new error(err.status, err.message);
  return res.status(200).send({ error: newError.message });
  // return res.status(newError.status).json({ error: newError.message });
  
};
module.exports = handler;