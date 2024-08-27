const router = require("express").Router();
const userAuth = require("../middleWare/authMiddleware");
const { addtUser, getUser } = require("../controllers/userController");
const Multer = require("multer");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.post("/add-user", upload.single("my_file"), addtUser);
router.get("/user", userAuth, getUser);

module.exports = router;
