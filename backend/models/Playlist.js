const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: [true, "Playlist must have user id"],
    },
    trackId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Track",
    },
    title: {
      type: String,
      require: [true, "Please provide playlist title."],
      maxlength: [50, "playlist title must smaller than 50 character"],
      minlength: [1, "playlist title must have at least one character"],
    },
    image: {
      type: String,
      default:
        "http://res.cloudinary.com/music-app-cty/image/upload/v1687221360/ye4wc6m8zyn1y7corc4u.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", PlaylistSchema);
