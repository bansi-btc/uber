const User = require("../models/user.model");
const Captain = require("../models/captain.model");
const Blacklist = require("../models/blacklistToken.model");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlackListed = await Blacklist.findOne({ token });

    if (isBlackListed) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlackListed = await Blacklist.findOne({ token });

    if (isBlackListed) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decoded._id);

    if (!captain) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.captain = captain;

    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
