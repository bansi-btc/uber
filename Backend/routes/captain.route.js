const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  registerCaptain,
  captainLogin,
  captainProfile,
  logoutCaptain,
} = require("../controllers/captain.controller");
const { authCaptain } = require("../middlewares/auth.middleware");

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

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
  ],
  captainLogin
);

router.get("/profile", authCaptain, captainProfile);

router.post("/logout", authCaptain, logoutCaptain);

module.exports = router;
