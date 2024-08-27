const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const User = require("../models/userModel");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Sign Up
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