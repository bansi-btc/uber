const captainModel = require("../models/captain.model");
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
