import express from "express";
import UserController from "./users/users-controller.js";
import PostsController from "./posts/posts-controller.js";
import cors from "cors";
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import "dotenv/config";
import mongoose from "mongoose";

// const CONNECTION_STRING =
//   process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/tuiter-su2-23";
// mongoose.connect(CONNECTION_STRING);
// mongoose.connect("mongodb://localhost:27017/tuiter-su2-23");
mongoose.connect(process.env.DB_CONNECTION_STRING);

const app = express();
app.use(express.json());
console.log("NODE ENV: ", process.env.NODE_ENV);
console.log("FRONTEND ENV: ", process.env.FRONTEND_URL);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

PostsController(app);
AuthController(app);
UserController(app);

app.listen(process.env.PORT || 4000);
