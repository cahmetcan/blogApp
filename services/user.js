// Handle controller logic for user

const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return error.message;
  }
};

const signUp = async (body) => {
  const { first_name, last_name, email, password } = body;

  try {
    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    });
    return user;
  } catch (error) {
    return error;
  }
};

const login = async (body) => {
  console.log("body");
  const { email, password } = body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return false;
    }

    //if password is not string return error
    if (typeof password !== "string") {
      return false;
    }

    const validateUser = await bcrypt.compare(password, user.password);
    // password number ise boş dönüyor
    if (!validateUser) {
      return false;
    }

    const userId = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(userId, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    return user + " JWT TOKEN ---->   " + token;
  } catch (error) {
    return error.message;
  }
};

const logout = async (res) => {
  clear = await res.clearCookie("token");
  console.log(clear);
  console.log("logout");
};

module.exports = {
  getAllUsers,
  signUp,
  login,
  logout,
};
