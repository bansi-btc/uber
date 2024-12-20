const User = require("../models/user.model");
const { createUser } = require("../services/user.service");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const BlackList = require("../models/blacklistToken.model");

exports.signUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;

    const hashedPassword = await User.hashPassword(password);

    const newUser = await createUser(
      fullname.firstname,
      fullname.lastname,
      email,
      hashedPassword
    );

    const token = newUser.generateAuthToken();

    res.status(200).json({
      token,
      newUser,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await existingUser.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = existingUser.generateAuthToken();

    res.cookie("token", token).status(200).json({
      token,
      existingUser,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.profile = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token");

    const token = req.cookies.token || req.authorization.split(" ")[1];

    await BlackList.create({ token });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
