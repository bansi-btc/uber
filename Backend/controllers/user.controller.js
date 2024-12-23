const User = require("../models/user.model");
const { createUser } = require("../services/user.service");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const BlackList = require("../models/blacklistToken.model");

exports.signUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { fullname, email, password } = req.body;

    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    const hashedPassword = await User.hashPassword(password);

    const newUser = await createUser(
      fullname.firstname,
      fullname.lastname,
      email,
      hashedPassword
    );

    const token = newUser.generateAuthToken();

    return res.status(200).json({
      success: true,
      message: "Signed up successfully",
      token,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isPasswordCorrect = await existingUser.comparePassword(password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = existingUser.generateAuthToken();

    res.cookie("token", token).status(200).json({
      success: true,
      token,
      existingUser,
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(400).json({
      success,
      message: error.message,
    });
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
