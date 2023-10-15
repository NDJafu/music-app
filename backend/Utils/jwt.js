require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Model/User");

const attachTokenToCookies = async ({ res, payload }) => {
  const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  //create expire day
  const oneDay = 1000 * 60 * 60 * 24;
};

module.exports = {
  attachTokenToCookies,
};
