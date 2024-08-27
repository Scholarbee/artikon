const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const User = require("../models/userModel");

/**
 * This function generate and return a token that expires in 24hrs for authentication
 * @param {*} id id of the user
 * @returns token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

/**
 * addtUser function contain the logics to add new user to the database
 *
 * It logs the user in after a successfully registration
 *
 * It also return user info as response to the client which can be use
 * for authentication and authorization processes.
 */
exports.addtUser = asyncHandler(async (req, res) => {
  const { name, email, city, phone, password } = req.body;

  if (!name || !email || !password || !city || !phone) {
    res.status(400);
    throw new Error("Please all fields are required.");
  }

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("Please email has been used. Choose another.");
  }

  // upload image in cloudinary
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const result = await cloudinary.handleUpload(dataURI);

  if (!result) {
    res.status(400);
    throw new Error("Unable to save image to cloudinary");
  }

  const user = await User.create({
    name,
    email,
    city,
    // brand,
    phone,
    password,
    photo: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  //   Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("artikonToken", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, brand, city, phone, photo, role } = user;
    res.status(201).json({
      _id,
      name,
      email,
      city,
      brand,
      phone,
      role,
      photo: photo.url,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * getUser func handle the logic to find a given user by an id
 */
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { _id, name, email, brand, city, phone, photo, role } = user;
    res.status(200).json({
      _id,
      name,
      email,
      city,
      brand,
      phone,
      role,
      photo: photo.url,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * update user
 * This func find user by id and update it in the database
 */
// exports.edittUser = asyncHandler(async (req, res) => {
//   const user = await User.findByIdAndUpdate(req.user._id);
// });

/**
 * Login user
 * This function login users by generating token after email and password authenticaton
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required.");
  }

  // Email authentication
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Password authentication
  const verified = await bcrypt.compare(password, user.password);
  if (!verified) {
    res.status(400);
    throw new Error("Wrong Email or Password.");
  }

  //   Generate Token
  const token = generateToken(user._id);

  if (verified) {
    // Send HTTP-only cookie
    res.cookie("artikonToken", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
  }
  if (user && verified) {
    const { _id, name, email, brand, photo, city, phone, role } = user;
    res.status(200).json({
      _id,
      name,
      email,
      city,
      brand,
      phone,
      role,
      photo: photo.url,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

/**
 * Logout User
 * This function logout users by expiring the user token
 */
exports.logout = asyncHandler(async (req, res) => {
  res.cookie("artikonToken", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ success: true });
});

/**
 * Check login status
 * This function checks authenticate users by token
 */
exports.loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.artikonToken;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});