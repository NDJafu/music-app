const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authentication");

const {
  createPlaylist,
  getAllPlaylistOfAUser,
  getPlaylistById,
  updatePlaylistById,
  deletePlaylistById,
  addTrackToPlaylist,
  deleteTrackFromPlaylist,
} = require("../controllers/playlistController");

router.route("/all/:userid").get(authenticateUser, getAllPlaylistOfAUser);

router.route("/create").post(authenticateUser, createPlaylist);

router
  .route("/:id")
  .get(getPlaylistById)
  .patch(authenticateUser, updatePlaylistById)
  .delete(authenticateUser, deletePlaylistById);

router.post("/:id/add/:trackid", authenticateUser, addTrackToPlaylist);

router.delete(
  "/:id/remove/:trackid",
  authenticateUser,
  deleteTrackFromPlaylist
);

module.exports = router;
