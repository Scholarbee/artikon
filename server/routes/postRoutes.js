const router = require("express").Router();
const {
  createPost,
  myPosts,
  allPosts,
  editPost,
  addLike,
  removeLike,
  addComment,
  deletePost,
  getPost,
  getPostInfo,
  bookAppointment,
  placeOrder,
  getUserReceivedAppointments,
  getUserReceivedOrders,
  getPosts,
  blockPost,
  unblockPost,
  getUserPlacedOrders,
  getUserBookedAppointments,
} = require("../controllers/postController");
const Multer = require("multer");
const userAuth = require("../middleWare/authMiddleware");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.get("/", userAuth, getPosts);
router.get("/all-posts", allPosts);
router.get("/post/:id", getPost);
router.get("/post-info/:id", getPostInfo);
router.get("/my-posts", userAuth, myPosts);
router.post("/create-post", upload.single("my_file"), userAuth, createPost);
router.put("/edit-post/:id", userAuth, editPost);
router.put("/add-like/:id", userAuth, addLike);
router.put("/remove-like/:id", userAuth, removeLike);
router.put("/add-comment/:id", userAuth, addComment);
router.delete("/delete-post/:id", userAuth, deletePost);
router.put("/block-post/:id", blockPost);
router.put("/unblock-post/:id", unblockPost);

router.put("/post/book-appointment/:id", userAuth, bookAppointment);
router.put("/post/place-order/:id", userAuth, placeOrder);
router.get("/received-appointments", userAuth, getUserReceivedAppointments);
router.get("/received-orders", userAuth, getUserReceivedOrders);
router.get("/placed-orders", userAuth, getUserPlacedOrders);
router.get("/booked-appointments", userAuth, getUserBookedAppointments);

module.exports = router;
