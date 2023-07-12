import express from "express";
import {
  createTask,
  deleteTask,
  getMyTask,
  updateTask,
} from "../controllers/taskController.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

//
router.post("/create", isAuthenticated, createTask);

//Get All Task
router.get("/my", isAuthenticated, getMyTask);

//
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

//
export default router;
