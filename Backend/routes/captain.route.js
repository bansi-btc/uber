const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerCaptain } = require("../controllers/captain.controller");

router.post(
  "/signUp",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Invalid color"),
    body("vehicle.plateNumber")
      .isLength({ min: 3 })
      .withMessage("Invalid plate number"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  registerCaptain
);

module.exports = router;
