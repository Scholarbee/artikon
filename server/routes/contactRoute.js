const express = require("express");
const router = express.Router();
const { contactUs } = require("../controllers/contactController");
const userAuth = require("../middleWare/authMiddleware");

router.post("/report", userAuth, contactUs);

module.exports = router;
