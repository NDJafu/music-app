const User = require("../Model/User");
const Playlist = require("../Model/Playlist");
const jwt = require("jsonwebtoken");

//Register
const register = async (req, res) => {
  const { email, username, birthday, password, gender } = req.body;

  if (!email || !username || !birthday || !gender || !password) {
    return res
      .status(500)
      .json({ error: "You need to field all the information!" });
  }

  const emailAlreadyExist = await User.findOne({ email });

  if (emailAlreadyExist) {
    return res.status(500).json({ error: "User already exist!" });
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;

  const user = await User.create({
    email,
    username,
    birthday,
    gender,
    password,
    role: isFirstAccount ? "admin" : "user",
  });

  const defaultLikedMusicPlaylist = await Playlist.create({
    userId: user._id,
    title: "Liked Music",
  });

  user.likedMusic = defaultLikedMusicPlaylist._id;

  user.save();

  res.status(201).json({ message: "User created!" });
};

//Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(500)
      .json({ error: "You need to field all the information" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(500).json({ error: "User does not exist" });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(500).json({ error: "Password is invalid" });
  }

  const foundUser = {
    id: user._id,
    email: user.email,
    role: user.role,
    avatar: user.image,
  };

  const accessToken = jwt.sign(foundUser, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "5m",
  });

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.cookie("token", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Login successfully!", accessToken });
};

//Refresh token
const refresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.token) return res.status(406).json("Unauthorized");

  const refreshToken = cookies.token;

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, decoded) => {
      if (err) return res.sendStatus(403);

      const user = await User.findOne({ _id: decoded.id });

      if (!user) return res.sendStatus(401);

      const accessToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
          avatar: user.image,
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "5m" }
      );
      res.status(200).json({ accessToken });
    }
  );
};

const logout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.token) return res.sendStatus(204);

  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ message: "logout success!" });
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
