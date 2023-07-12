//import
import mongoose from "mongoose";

//Function
const mySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, //that user who create the task
      ref: "Users",
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  }
  // { timestamps: true }
);

//Model
const taskModel = mongoose.model("Tasks", mySchema);

//export
export default taskModel;
