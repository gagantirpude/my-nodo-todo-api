//import
import mongoose from "mongoose";

//Function
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

//Model
const userModel = mongoose.model("Users", userSchema);

//export
export default userModel;
