const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { signUp, login } = require("../controllers/user.controller");

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
  ],
  signUp
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
  ],
  login
);

router.get("/", (req, res) => {
  res.send("Hello World!");
});
module.exports = router;
