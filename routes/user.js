const express = require("express");
const {
  userSignup,
  userLogin,
  userLogout,
  getAllUsers,
} = require("../controllers/user");
const router = express.Router();
const {
  loginValidation,
  signUpValidation,
} = require("../middlewares/validation");

// Schemas
const { signUpSchema, loginSchema } = require("../validations/user");

router.route("/signup").post(signUpValidation(signUpSchema), userSignup);

router.route("/login").post(loginValidation(loginSchema), userLogin);

router.route("/logout").get(userLogout);

router.route("/users").get(getAllUsers);

module.exports = router;
