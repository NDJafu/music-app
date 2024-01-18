const Track = require("../models/Track");
const { checkPermissonToChangeInfo } = require("../utils/checkPermission");

const createTrack = async (req, res) => {
  const { userId } = req.user;
  req.body.userId = userId;

  const track = await Track.create(req.body);

  res.status(201).json({ message: "Create track successfully", track });
};
const getAllTrack = async (req, res) => {
  const allTracks = await Track.find({});
  res
    .status(200)
    .json({ message: "Successfully", length: allTracks.length, allTracks });
};
const getTrackById = async (req, res) => {
  const track = await Track.findById(req.params.id);

  res.status(200).json({ message: "Find Track Successfully", track });
};
const updateTrackById = async (req, res) => {
  const track = await Track.findById({ _id: req.params.id });

  checkPermissonToChangeInfo(req.user, track.userId.toString());

  if (req.body.hasOwnProperty("userId")) {
    return res
      .status(500)
      .json({ error: "Do not have permisson to change user's song" });
  }
  const updateTrack = await Track.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ message: "Update Track Successfully", updateTrack });
};
const deleteTrackById = async (req, res) => {
  const { id } = req.params;
  const track = await Track.findByIdAndDelete({ _id: id });
  res.status(200).json({ message: "Delete Successfully", track });
};

const getAllTracksOfAUser = async (req, res) => {
  const { id: userId } = req.params;
  console.log(req.user);
  const allTracks = await Track.find({ userId: userId, isPublic: true });
  res.status(200).json({
    message: "Find All Successfully",
    length: allTracks.length,
    allTracks,
  });
};

module.exports = {
  createTrack,
  getAllTrack,
  getTrackById,
  updateTrackById,
  deleteTrackById,
  getAllTracksOfAUser,
};
