require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();

const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

//install package to replace try catch
require("express-async-errors");

//database connect
const connectDB = require("./Database/db");

// route
const userRouter = require("./Route/userRoute");
const authRouter = require("./Route/authRoute");
const fileuploadRouter = require("./Route/fileuploadRoute");
const trackRouter = require("./Route/trackRoute");
const historyRouter = require("./Route/historyRoute");
const playlistRouter = require("./Route/playlistRoute");

app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/fileupload", fileuploadRouter);
app.use("/api/v1/track", trackRouter);
app.use("/api/v1/history", historyRouter);
app.use("/api/v1/playlist", playlistRouter);

//TODO: Ghi console log thông báo cho kết nối DB thành công

const port = 3000 || process.env.PORT;

const startApp = async () => {
  //TODO: Viết console log kết nối DB thành công cho mongoose
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to database");
    app.listen(port, () => {
      console.log(`Server is listening in ${port}...`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startApp();
