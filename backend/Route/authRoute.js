const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  refresh,
} = require("../Controller/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);

module.exports = router;
