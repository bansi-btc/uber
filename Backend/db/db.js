require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("Error connecting to the database");
    });
};

module.exports = connectDB;
