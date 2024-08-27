const router = require("express").Router();
const { addtUser } = require("../controllers/userController");
const Multer = require("multer");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.post("/add-user", upload.single("my_file"), addtUser);

module.exports = router;
