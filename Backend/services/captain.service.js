const Captain = require("../models/captain.model");

exports.createCaptain = async (
  firstname,
  lastname,
  email,
  password,
  color,
  plateNumber,
  capacity,
  vehicleType
) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plateNumber ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const newCaptain = await Captain.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plateNumber,
      capacity,
      vehicleType,
    },
  });

  return newCaptain;
};
