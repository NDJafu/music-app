const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
const authRouter = require("./authRoute");
const fileuploadRouter = require("./fileuploadRoute");
const trackRouter = require("./trackRoute");
const historyRouter = require("./historyRoute");
const playlistRouter = require("./playlistRoute");

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/fileupload", fileuploadRouter);
router.use("/track", trackRouter);
router.use("/history", historyRouter);
router.use("/playlist", playlistRouter);

module.exports = router;
