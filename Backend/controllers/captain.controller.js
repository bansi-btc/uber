const captainModel = require("../models/captain.model");
const BlackList = require("../models/blacklistToken.model");
const { createCaptain } = require("../services/captain.service");
const { validationResult } = require("express-validator");

exports.registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;

    const isExistingCaptain = await captainModel.findOne({ email });

    if (isExistingCaptain) {
      return res
        .status(400)
        .json({ message: "Captain already exists with this email" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const newCaptain = await createCaptain(
      fullname.firstname,
      fullname.lastname,
      email,
      hashedPassword,
      vehicle.color,
      vehicle.plateNumber,
      vehicle.capacity,
      vehicle.vehicleType
    );

    const token = await newCaptain.generateAuthToken();
    res.status(201).json({
      message: "Captain created successfully",
      captain: newCaptain,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.captainLogin = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const existingCaptain = await captainModel
      .findOne({ email })
      .select("+password");

    if (!existingCaptain) {
      return res.status(400).json({ message: "Captain does not exist" });
    }

    const isPasswordCorrect = await existingCaptain.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = existingCaptain.generateAuthToken();

    res.cookie("token", token).status(200).json({
      message: "Captain logged in successfully",
      token,
    });
  } catch (err) {}
};

exports.captainProfile = async (req, res) => {
  try {
    res.status(200).json({
      captain: req.captain,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.logoutCaptain = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    const blackListedToken = await BlackList.create({ token });
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
