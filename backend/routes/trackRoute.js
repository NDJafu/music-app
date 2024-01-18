const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authentication");

const {
  createTrack,
  getAllTrack,
  getTrackById,
  updateTrackById,
  deleteTrackById,
  getAllTracksOfAUser,
} = require("../controllers/trackController");

router.route("/").get(getAllTrack);
router.route("/create").post(authenticateUser, createTrack);
router
  .route("/:id")
  .get(getTrackById)
  .patch(authenticateUser, updateTrackById)
  .delete(authenticateUser, deleteTrackById);
router.route("/alltrack/user/:id").get(getAllTracksOfAUser);

module.exports = router;
