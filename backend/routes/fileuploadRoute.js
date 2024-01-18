const express = require("express");

const router = express.Router();

const authenticateUser = require("../middlewares/authentication");

const { uploadFile } = require("../controllers/uploadFileController");

router.route("/file").post(authenticateUser, uploadFile);

module.exports = router;
