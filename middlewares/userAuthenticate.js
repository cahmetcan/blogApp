const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
require("dotenv").config();

const userAuthenticate = async (req, res, next) => {
  console.log("userAuthenticate middleware is running");
  const token = req.headers.authorization?.split(" ")[1];

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN);

      req.user = verifiedToken;
      next();
    } catch (error) {
      res
        .status(401)
        .json({ log: "Not authorized", error: error.message, token: token });

        next( error );  
    }
  }
  if (!token) {
    res.status(401).send("No token!");
  }
};

module.exports = userAuthenticate;
