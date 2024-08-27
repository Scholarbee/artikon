const router = require("express").Router();
const { deltUser, getUsers, unblockUser, blockUser } = require("../controllers/adminController");
const userAuth = require("../middleWare/authMiddleware");

router.get("/", userAuth, getUsers);
router.delete("/delete-user", deltUser);
router.put("/block-user/:id", blockUser);
router.put("/unblock-user/:id", unblockUser);

module.exports = router;
