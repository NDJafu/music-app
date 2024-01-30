const Playlist = require("../models/Playlist");
const User = require("../models/User");
const { checkPermissonToChangeInfo } = require("../utils/checkPermission");

const createPlaylist = async (req, res) => {
  req.body.userId = req.user.userId;
  const playlist = await Playlist.create(req.body);
  res.status(201).json({ message: "Create Playlist Successfully", playlist });
};

const getAllPlaylistOfAUser = async (req, res) => {
  const playlist = await Playlist.find({ userId: req.params.userid }).populate(
    "userId"
  );

  res.status(200).json({ message: "Get all playlist of a user", playlist });
};

const getPlaylistById = async (req, res) => {
  const playlist = await Playlist.findById(req.params.id)
    .populate("userId")
    .populate("trackId");

  if (!playlist) {
    return res.status(404).json("Not found this playlist");
  }

  res.status(200).json({
    message: "Get Playlist Successfully",
    playlist,
  });
};

const updatePlaylistById = async (req, res) => {
  const { id } = req.params;
  const checkPlaylist = await Playlist.findById(id);

  checkPermissonToChangeInfo(req.user, checkPlaylist.userId.toString());

  await Playlist.findByIdAndUpdate({ _id: id }, req.body, {
    runValidators: true,
  });

  res.status(200).json({ message: "Update playlist successfully" });
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
  const { id, trackid } = req.params;
  await Playlist.findByIdAndUpdate(
    { _id: id },
    { $pull: { trackId: trackid } },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ message: "Delete track from playlist successfully" });
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
