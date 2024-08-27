const router = require("express").Router();
const userAuth = require("../middleWare/authMiddleware");
const { addtUser, getUser, getUsers, deltUser, login, logout } = require("../controllers/userController");
const Multer = require("multer");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.post("/register", upload.single("my_file"), addtUser);
router.get("/user", userAuth, getUser);

// Authentication
router.post("/login", login);
router.get("/logout", logout);
router.get("/login-status", loginStatus);

module.exports = router;
