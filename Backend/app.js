const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
