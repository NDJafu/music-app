const express = require("express");

const router = express.Router();

const authenticateUser = require("../Middleware/authentication");

const { uploadFile } = require("../Controller/uploadFileController");

router.route("/file").post(authenticateUser, uploadFile);

module.exports = router;
