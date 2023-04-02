//handle signup, signin & signout actions

const services = require("../services/user");
const error = require("../utils/error");

// user signup
const userSignup = async (req, res) => {
  const user = await services.signUp(req.body);
  console.log(user);
  if (!user) next(new error(400, "User not created!!!"));
  if (user) return res.status(200).send({ message: "User created", user });
};

// user login
const userLogin = async (req, res, next) => {
  const user = await services.login(req.body);
  console.log(user);
  if (!user) next(new error(404, "User not found!!!"));
  return res.status(200).send({ message: "User logged in", user });
};

// user logout
const userLogout = async (req, res, next) => {
  console.log("logout");
  const clear = await services.logout(res);
  if (clear) return res.status(200).send({ message: "User logged out" });
  if (!clear) next(new error(400, "User not logged out!!!"));
};

// get all users
const getAllUsers = async (req, res) => {
    const users = await services.getAllUsers();
    console.log(users());
    if (users) return res.status(200).send({ message: "All users", users });
    if (!users) next(new error(400, "No users found!!!"))
  
};

module.exports = { userSignup, userLogin, userLogout, getAllUsers };
