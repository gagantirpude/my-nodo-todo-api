//* import
import ErrorHandler from "../middlewares/error.js";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { sendCookie } from "../utils/sendCookie.js";

//* Register
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    let users = await userModel.findOne({ email });

    //Condition
    if (users) {
      return next(new ErrorHandler("User Already Exist", 404));
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      users = await userModel({
        username,
        email,
        password: hashedPassword,
      });

      users.save();

      //Send Cookie and JsonWeb token
      sendCookie(users, res, "User Register Successfully", 201);
    }
  } catch (error) {
    // return next(new ErrorHandler("Invalid Email & Password", 404));
    next(error);
  }
};

//* Login User
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let users = await userModel.findOne({ email }).select("+password");

    if (!users) {
      return next(new ErrorHandler("User Not Found", 400));
    } else {
      //Compare Password and Database Password
      const isMatch = await bcrypt.compare(password, users.password);

      //Condition for Password
      if (!isMatch) {
        return next(new ErrorHandler("Invalid Email & Password", 404));
      } else {
        //Send Cookie and JsonWeb token as Parameter
        sendCookie(users, res, "User Login Successfully", 200);
      }
    }
  } catch (error) {
    // return next(new ErrorHandler("Invalid Email & Password", 404));
    next(error);
  }
};

//* Logout User
const logoutUser = async (req, res, next) => {
  try {
    return res
      .status(200)
      .cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        message: `User Logout`,
      });
  } catch (error) {
    next(error);
  }
};

//* All User
const allUser = async (req, res, next) => {
  try {
    const user = await userModel.find();

    return res.status(200).json({
      success: true,
      message: `User Found`,
      user,
    });
  } catch (error) {
    next(error);
  }
};

//* Get User By Profile(Cookies)
const getMyProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

//* Export
export { registerUser, logoutUser, allUser, getMyProfile };
