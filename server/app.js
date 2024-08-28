const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleWare/errorMiddleware");
require("dotenv").config();
const port = process.env.PORT || 2002;

// Initiating app...
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

// Setting up routes
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoute");
const postRouter = require("./routes/postRoutes");
const contactRouter = require("./routes/contactRoute");
const categoryRouter = require("./routes/categoryRoute");
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/posts", postRouter);
app.use("/api/contact", contactRouter);
app.use("/api/categories", categoryRouter);

// Setting up routes
app.get("/", (req, res) => {
  res.send("Server started successfully...");
});

// Error display format
app.use(errorHandler);
// Setting up databse and starting the API server
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to mongoDB");
  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
  });
});