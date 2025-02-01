const JWT = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token:", req.headers);  // Log token to see if it's being passed correctly
  if (!token) {
    return res.status(401).json({ message: "Access Token expired!" });
  }

  try {
    const decoded = JWT.verify(token, process.env.ACCESS_TOKEN_KEY);
    req.user = decoded; // attach the user's info to the req object
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyAccessToken;
