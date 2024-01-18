const Playlist = require("../models/Playlist");
const User = require("../models/User");
const { checkPermissonToChangeInfo } = require("../utils/checkPermission");

const createPlaylist = async (req, res) => {
  req.body.userId = req.user.userId;
  const playlist = await Playlist.create(req.body);
  res.status(201).json({ message: "Create Playlist Successfully", playlist });
};
const getAllPlaylistOfAUser = async (req, res) => {
  checkPermissonToChangeInfo(req.user, req.params.userid);
  const playlist = await Playlist.find({ userId: req.params.userid });
  res.status(200).json({ message: "Get all playlist of a user", playlist });
};
const getPlaylistById = async (req, res) => {
  const playlist = await Playlist.findById({ _id: req.params.id });

  if (!playlist) {
    return res.status(404).json("Not found this playlist");
  }

  res.status(200).json({ message: "Get Playlist Successfully", playlist });
};
const updatePlaylistById = async (req, res) => {
  const filterObj = {};

  const checkPlaylist = await Playlist.findById({ _id: req.params.id });

  checkPermissonToChangeInfo(req.user, checkPlaylist.userId.toString());

  if (req.body.image) {
    filterObj.image = req.body.image;
  }
  if (req.body.title) {
    filterObj.title = req.body.title;
  }
  if (req.body.trackId || req.body.userId) {
    return res.status(404).json({ message: "Can't update these field" });
  }

  console.log(filterObj);
  const playlist = await Playlist.findByIdAndUpdate(
    { _id: req.params.id },
    filterObj,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ message: "Update playlist successfully", playlist });
};
const deletePlaylistById = async (req, res) => {
  await Playlist.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json({ message: "Delete Playlist Successfully" });
};
const addTrackToPlaylist = async (req, res) => {
  const { playlistid, trackid } = req.params;
  const playlist = await Playlist.findByIdAndUpdate(
    { _id: playlistid },
    { $push: { trackId: trackid } },
    {
      new: true,
      runValidators: true,
    }
  );

  res
    .status(200)
    .json({ message: "Add track from playlist successfully", playlist });
};
const deleteTrackFromPlaylist = async (req, res) => {
  const { playlistid, trackid } = req.params;
  const playlist = await Playlist.findByIdAndUpdate(
    { _id: playlistid },
    { $pull: { trackId: trackid } },
    {
      new: true,
      runValidators: true,
    }
  );

  res
    .status(200)
    .json({ message: "Delete track from playlist successfully", playlist });
};

const addTrackToLikedMusic = async (req, res) => {
  const { trackid } = req.params;

  const user = await User.findById({ _id: req.user.userId });

  const playlist = await Playlist.findByIdAndUpdate(
    { _id: user.likedMusic },
    { $push: { trackId: trackid } },
    {
      new: true,
      runValidators: true,
    }
  );

  res
    .status(200)
    .json({ message: "Add track to liked music successfully", playlist });
};
const deleteTrackFromLikedMusic = async (req, res) => {
  const { trackid } = req.params;

  const user = await User.findById({ _id: req.user.userId });

  const playlist = await Playlist.findById({ _id: user.likedMusic });

  //find the index of the track id need to delete in trackId array
  const trackIndex = playlist.trackId.indexOf(trackid);

  if (trackIndex !== -1) {
    // Remove the trackId from the array
    playlist.trackId.splice(trackIndex, 1);

    // Save the updated document back to the database
    await playlist.save();

    res.status(200).json({
      message: "Delete track from liked music successfully",
      playlist,
    });
  } else {
    res.status(500).json({ message: "TrackId not found in the array." });
  }
};

module.exports = {
  createPlaylist,
  getAllPlaylistOfAUser,
  getPlaylistById,
  updatePlaylistById,
  deletePlaylistById,
  addTrackToPlaylist,
  deleteTrackFromPlaylist,
  addTrackToLikedMusic,
  deleteTrackFromLikedMusic,
};
