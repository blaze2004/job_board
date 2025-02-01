const User = require("../models/User");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");

const login = async (req, res) => {
  const { Username, Password } = req.body;
  const foundUser = await User.findOne({ username: Username.toLowerCase() });
  if (!foundUser) {
    return res.status(404).json({ message: "User not found!" });
  }
  const isMatch = await bcrypt.compare(Password, foundUser.password);
  if (!isMatch) {
    return res.status(500).json({ message: "Wrong credentials!" });
  }

  //generate ACCESS AND REFRESH tokens
  const payLoad = { userId: foundUser._id, userName: foundUser.username };
  const accessToken = generateAccessToken(payLoad);
  const refreshToken = generateRefreshToken(payLoad);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });
  res.status(200).json({ message: "Login Successful!", accessToken });
};

const signup = async (req, res) => {
  const { Name, Password, Role, Email, ConfirmPassword, Username } = req.body;
  const existingUser = await User.findOne({
    $or: [{ username: Username }, { email: Email }],
  });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }
  const isPasswordSame = await confirmPassword(Password, ConfirmPassword);
  if (!isPasswordSame) {
    return res.status(400).json({ message: "Password not matched!" });
  }
  const hashedPassword = await bcrypt.hash(Password, 10);
  const newUser = new User({
    username: Username.toLowerCase(),
    email: Email,
    password: hashedPassword,
    role: Role,
    name: Name,
  });
  await newUser.save();
  res.status(200).json({ message: "User registered successfully!" });
};

let refreshTokens = [];
const generateAccessToken = (User) => {
  return JWT.sign(User, process.env.ACCESS_TOKEN_KEY, { expiresIn: "2m" });
};

const generateRefreshToken = (User) => {
  const refreshToken = JWT.sign(User, process.env.REFRESH_TOKEN_KEY);
  refreshTokens.push(refreshToken);
  return refreshToken;
};
function confirmPassword(first, second) {
  if (first === second) {
    return true;
  } else {
    false;
  }
}

const refreshTokenController = (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(400).json({ message: "Referesh token is invalid!" });
  }

  JWT.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    const payLoad = { userId: user._id, userName: user.username };
    const accessToken = generateAccessToken(payLoad);
    res.status(200).json({ accessToken });
  });
};
module.exports = { login, signup, refreshTokenController };
