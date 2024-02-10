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

router.route("/all/:userid").get(getAllPlaylistOfAUser);

router.post("/create", authenticateUser, createPlaylist);

router.delete("/delete/:id", authenticateUser, deletePlaylistById);

router
  .route("/:id")
  .get(getPlaylistById)
  .patch(authenticateUser, updatePlaylistById);

router.post("/:id/add/:trackid", authenticateUser, addTrackToPlaylist);

router.delete(
  "/:id/remove/:trackid",
  authenticateUser,
  deleteTrackFromPlaylist
);

module.exports = router;
