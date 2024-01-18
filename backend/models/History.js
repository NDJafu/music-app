const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    trackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", HistorySchema);
