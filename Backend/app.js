const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.route");
const captainRoutes = require("./routes/captain.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/captain", captainRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
