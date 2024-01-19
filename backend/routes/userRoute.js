const express = require("express");
const router = express.Router();

const {
  getUserById,
  getAllUsers,
  updateUserById,
  updateUserPassword,
  deleteUserById,
  showCurrentUser,
} = require("../controllers/userController");

const authenticateUser = require("../middlewares/authentication");

router.route("/").get(authenticateUser, getAllUsers);

router.route("/currentUser").get(authenticateUser, showCurrentUser);

router.route("/password").patch(authenticateUser, updateUserPassword);

router
  .route("/:id")
  .get(getUserById)
  .patch(authenticateUser, updateUserById)
  .delete(authenticateUser, deleteUserById);

module.exports = router;
