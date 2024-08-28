const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

/**
 * Get all users
 */
exports.getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ success: true, users });
});

/**
 * Block user
 */
exports.blockUser = expressAsyncHandler(async (req, res) => {
  let { id } = req.params;
  const user = await User.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  // Email
  const message = `
      <h2>Hello, ${user.name}</h2>
      <p>Please your account has been suspended</p>  
      <p>If you think this is wrong, please file \n a report to the system administrators via the website</p>

      <a href="https://artikon-alx-2qcy.onrender.com" clicktracking=off>Click here to place a report</a>

      <p>Regards...</p>
      <p>Artikon Team</p>
    `;
  const subject = "Suspention Of Account";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

/**
 * Unblock user
 */
exports.unblockUser = expressAsyncHandler(async (req, res) => {
  let { id } = req.params;
  const user = await User.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true }
  );
  // Email
  const message = `
      <h2>Hello, ${user.name}</h2>
      <p>Please your account has been reactivated</p>  
      <p>Visit the official website for more info.</p>

      <a href="https://artikon-alx-2qcy.onrender.com" clicktracking=off>Click here to place a report</a>

      <p>Regards...</p>
      <p>Artikon Team</p>
    `;
  const subject = "Suspention Of Account";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

/**
 * Delete user
 * This func find user by id and remove/delete it in the database
 */
exports.deltUser = expressAsyncHandler(async (req, res) => {
  let { id } = req.params;
  const result = await User.findByIdAndDelete(id);
  if (result) {
    res.status(200).json({ success: true, result });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
