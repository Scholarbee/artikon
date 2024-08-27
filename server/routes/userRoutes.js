const router = require("express").Router();
const userAuth = require("../middleWare/authMiddleware");
const { addtUser, getUser, getUsers, deltUser } = require("../controllers/userController");
const Multer = require("multer");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.get("/", userAuth, getUsers);
router.post("/add-user", upload.single("my_file"), addtUser);
router.get("/user", userAuth, getUser);
router.delete("/delete-user/:id", deltUser);

module.exports = router;
