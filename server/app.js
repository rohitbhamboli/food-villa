import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import connect from "./config/connection.js";
import user from "./routes/userRoutes.js";

const port = process.env.PORT;
connect();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user", user);

app.get("/", (req, res) => {
  res.send("Hello World from Server....");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
