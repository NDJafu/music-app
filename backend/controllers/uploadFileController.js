require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

const deleteFileInTMPFolder = (cloudFile) => {
  const filePath = path.join("tmp", cloudFile.original_filename);

  //bước 2: xóa file nhạc
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return;
    }
    console.log("File deleted successfully");
  });
};
const uploadFile = async (req, res) => {
  if (!req.files) return res.status(500).json({ error: "No file uploaded" });

  //upload ảnh lên cloudinary, nhận về một object gồm các thông tin liên quan đến ảnh đó
  const { file } = req.files;

  const cloudFile = await cloudinary.uploader.upload(
    file.tempFilePath,
    { resource_type: "auto" },
    (error, result) => {
      if (error) {
        return res.status(500).json({ error });
      }
      return result;
    }
  );

  deleteFileInTMPFolder(cloudFile);

  res
    .status(201)
    .json({ message: "File uploaded successfully", fileURL: cloudFile.url });
};

module.exports = {
  uploadFile,
};
