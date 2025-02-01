const express = require("express");
const router = express.Router();
const path = require("path");
const {
  login,
  signup,
  refreshTokenController,
} = require("../controllers/authController");
const verifyAccessToken = require("../middlewares/auth");
const dashboardController = require("../controllers/dashboardController");

router.post("/login", login);
router.post("/signup", signup);
router.get("/dashboard", verifyAccessToken, dashboardController);
router.post("/refreshToken", refreshTokenController);
router.get("/", () => {
  res.sendFile(path.join(__dirname, "../job_board/build", "index.html"));
});

module.exports = router;
