const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

/**
 * Get all users
 */
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ success: true, users });
});

/**
 * Delete user
 * This func find user by id and remove/delete it in the database
 */
exports.deltUser = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const result = await User.findByIdAndDelete(id);
  if (result) {
    res.status(200).json({ success: true, result });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
