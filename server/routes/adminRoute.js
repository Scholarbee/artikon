const router = require("express").Router();
const { deltUser, getUsers } = require("../controllers/adminController");
const userAuth = require("../middleWare/authMiddleware");

router.get("/", userAuth, getUsers);
router.delete("/delete-user", deltUser);
// router.put("/edit-category", editCategory);
// router.delete("/delete-category", editCategory);

module.exports = router;
