//Import
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRoute.js";
import taskRouter from "./routers/taskRoute.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

//server
const app = express();

config({
  path: "./data/config.env",
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//Router
app.use("/api/v1/users", userRouter); //Router Precept
app.use("/api/v1/task", taskRouter); //Router Precept

//Using Error Handler Middleware
app.use(errorMiddleware);

//Route
app.get("/", (req, res) => {
  res.send("Nice Working");
});

//Export
export default app;
