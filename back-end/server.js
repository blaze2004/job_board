const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const router = require("./routes/Route");
const path = require("path");
const ejs = require("ejs");

const conn = mongoose.connect(
  `mongodb+srv://krish1234:krish1234@cluster0.zwypm.mongodb.net/`
);
dotenv.config();

//Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookie());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Routes
app.use("/", router);

app.use(express.static(path.join(__dirname, "../job_board/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../job_board/build", "index.html"));
});

app.listen(port, () => {
  console.log(`your backend server is being listened at the port = ${port}`);
});
