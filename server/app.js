import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import connect from "./config/connection.js";
const port = process.env.PORT;
connect();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

import user from "./routes/userRoutes.js";
app.use("/api/v1/user", user);

app.get("/", (req, res) => {
  res.send("Hello World from Server....");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
