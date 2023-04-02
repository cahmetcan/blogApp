const error = require("../utils/error");

const loginValidation = (schema) => async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) next(new error(400, "Please fill all the fields"));
  try {
    const val = await schema.validate(req.body)
    next()
  }
  catch (error) {
    next(error)
  }
};

const signUpValidation = (schema) => async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) next(new error(400, "Please fill all the fields"));
  try {
    const val = await schema.validate(req.body)
    next()
  } catch (error) {
    next(error)
  }
};

module.exports = { loginValidation, signUpValidation };
