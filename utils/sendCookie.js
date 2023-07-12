import jwt from "jsonwebtoken";

//Cookie Received as Argument
export const sendCookie = (user, res, message, statusCode = 200) => {
  //Token
  const token = jwt.sign({ _id: user._id }, process.env.JSONWEBTOKEN);
  // console.log(process.env.NODE_ENV);
  // console.log(process.env.NODE_ENV === "Development");
  // Response
  res

    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, //15 min
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
      // user,
    });
};
