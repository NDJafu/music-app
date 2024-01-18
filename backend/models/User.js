const mongoose = require("mongoose");
//import validator package to validate the email
const validatorPackage = require("validator");
const bcrypt = require("bcrypt");
const Playlist = require("./Playlist");

//Create a schema using mongoose
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "Please provide email"],
    unique: [true, "This email is already used"],
    validate: {
      validator: validatorPackage.isEmail,
      message: "Please provide valid email",
    },
  },
  username: {
    type: String,
    require: [true, "Please provide username"],
    minlength: [3, "Your username must longer than 3 characters"],
    maxlength: [25, "Your is too long, it must under 25 characters"],
    trim: true,
  },
  birthday: {
    type: Date,
    require: [true, "Please provide your date of birth"],
    trim: true,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "user", "premium", "artist"],
      message: "{VALUE} is not supported",
    },
    default: "user",
  },
  //làm gì còn giới tính nào khác nữa?
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: "{VALUE} is not supported",
    },
    require: [true, "You need to choose gender"],
  },
  password: {
    type: String,
    require: [true, "Please provide your password"],
    minlength: [3, "Your username must longer than 3 characters"],
    trim: true,
  },
  follower: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default:
      "http://res.cloudinary.com/music-app-cty/image/upload/v1687156704/pbphlpmuey95u7jnjhtu.jpg",
  },
  likedMusic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Playlist,
  },
  refreshToken: {
    type: String,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (clientPass) {
  const isMatch = await bcrypt.compare(clientPass, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
