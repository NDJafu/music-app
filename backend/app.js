require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("./mongo/db");
const routes = require("./routes/mainRoute");
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/", routes);

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const port = 3000 || process.env.PORT;

const startApp = async () => {
  await connectDB(process.env.MONGO_URI);
  console.log("connected to database");
  app.listen(port, () => {
    console.log(`Server is listening in ${port}...`);
  });
};

startApp();
