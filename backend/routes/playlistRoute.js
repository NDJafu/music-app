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
  addTrackToLikedMusic,
  deleteTrackFromLikedMusic,
} = require("../controllers/playlistController");

router.route("/all/:userid").get(authenticateUser, getAllPlaylistOfAUser);
router.route("/create").post(authenticateUser, createPlaylist);
router
  .route("/:id")
  .get(authenticateUser, getPlaylistById)
  .patch(authenticateUser, updatePlaylistById)
  .delete(authenticateUser, deletePlaylistById);

router
  .route("/likedmusic/track/:trackid")
  .post(authenticateUser, addTrackToLikedMusic)
  .delete(authenticateUser, deleteTrackFromLikedMusic);
router
  .route("/:playlistid/track/:trackid")
  .post(authenticateUser, addTrackToPlaylist)
  .delete(authenticateUser, deleteTrackFromPlaylist);

module.exports = router;
