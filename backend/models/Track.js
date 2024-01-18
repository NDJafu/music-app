const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: [true, "Song must have user id"],
    },
    artist: {
      type: String,
      require: [true, "Please provide artist name"],
      maxlength: [50, "Artist name must smaller than 50 character"],
      minlength: [1, "Artist name must have at least one character"],
    },
    title: {
      type: String,
      require: [true, "Please provide song title"],
      maxlength: [50, "Song title must smaller than 50 character"],
      minlength: [1, "Song title must have at least one character"],
    },
    image: {
      type: String,
      default:
        "http://res.cloudinary.com/music-app-cty/image/upload/v1687221360/ye4wc6m8zyn1y7corc4u.jpg",
    },
    audio: {
      type: String,
      require: [true, "You must upload song audio"],
    },
    lyrics: {
      type: String,
      minlength: [1, "Your song must have more than 1 character"],
    },
    publicDate: {
      type: Date,
      default: new Date(),
    },
    duration: {
      type: Number,
      require: [true, "Your song must have duration"],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", TrackSchema);
