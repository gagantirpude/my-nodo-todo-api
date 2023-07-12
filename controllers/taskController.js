import ErrorHandler from "../middlewares/error.js";
import taskModel from "../models/taskModel.js";

//Create Task
const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await taskModel.create({
      title,
      description,
      user: req.user,
    });

    //
    return res.status(201).json({
      success: true,
      message: `Task Create Successfully`,
    });
  } catch (error) {
    next(error);
  }
};

//Get User Task
const getMyTask = async (req, res, next) => {
  try {
    // const task
    const userId = req.user._id;
    const tasks = await taskModel.find({ user: userId });

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

//Update task
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findById(id);
    //condition
    if (!task) {
      return next(new ErrorHandler("Invalid Task", 404));
    }
    //condition
    task.isCompleted = !task.isCompleted;

    await task.save();

    return res.status(200).json({
      success: true,
      message: `Task Updated`,
      task,
    });
  } catch (error) {
    next(error);
  }
};

//Delete Task
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findById(id);
    //condition
    if (!task) {
      return next(new ErrorHandler("Invalid Task", 404));
    }

    await task.deleteOne();
    return res.status(200).json({
      success: true,
      message: `Task Deleted`,
    });
  } catch (error) {
    next(error);
  }
};

//
export { createTask, getMyTask, deleteTask, updateTask };
