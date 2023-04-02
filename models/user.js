const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  article: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      name: "title",
    },
  ],
});

//hashing the password
userSchema.pre(
  "save", 
  async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;
    next();
  }
);

//comparing passwords
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(user.password, password);

  return compare;
};

const users = mongoose.model("Users", userSchema);

module.exports = users;
