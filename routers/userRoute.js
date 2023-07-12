//import
import express from "express";
import {
  loginUser,
  registerUser,
  allUser,
  getMyProfile,
  logoutUser,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/auth.js";
import ErrorHandler from "../middlewares/error.js";

//Router
const router = express.Router();

//Register Route
router.post("/register", registerUser);

//Login User
router.post("/login", loginUser);

//LogOut User
router.get("/logout", logoutUser);

//User Read
router.get("/all", allUser);

// Get User Profile
router.get("/me", isAuthenticated, getMyProfile);

//export
export default router;
