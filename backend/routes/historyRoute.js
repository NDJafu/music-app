const express = require("express");
const router = express.Router();

const {
  createHistory,
  getAllHistoryByUserId,
  getOneHistoryByHistoryId,
  deleteOneHistoryByHistoryId,
  deleteAllHistoryByUserId,
} = require("../controllers/historyController");

const authenticateUser = require("../middlewares/authentication");

router
  .route("/")
  .post(authenticateUser, createHistory)
  .delete(authenticateUser, deleteAllHistoryByUserId);
router
  .route("/:id")
  .get(authenticateUser, getOneHistoryByHistoryId)
  .delete(authenticateUser, deleteOneHistoryByHistoryId);
router.route("/user/:id").get(authenticateUser, getAllHistoryByUserId);

module.exports = router;
